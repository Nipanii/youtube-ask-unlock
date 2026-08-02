# YouTube's Ask button is geo-gated in the page, not in the backend

YouTube's per-video Ask button, the one that opens a Gemini panel next to the
player, is not available in Finland. Connect through a US VPN and it appears
between Share and Download. Disconnect and it is gone.

The interesting part is what the VPN is actually doing. It is not unlocking a
feature. It is changing whether the button gets drawn on the page. The backend
behind it answers a Finnish IP perfectly happily, returns the full panel, and
does not appear to look at where the request came from at all.

I found this while trying to get the button working without a VPN, so most of
this is a record of narrowing down where the gate lives. Three of my hypotheses
were wrong before the right one, and I have kept those in because the negatives
are the part that took the time.

Everything below was measured on Chrome 151.0.7922.71, Windows 10 22H2, YouTube
web client 2.20260731.00.00, signed in to a personal Google account, from
Finland, with a US VPN toggled on and off between otherwise identical runs.

## The button is YouTube's own markup

Right click the button, Inspect, and it is Polymer:

```
yt-button-view-model
  button-view-model.ytSpecButtonViewModelHost.you-chat-entrypoint-button
    button ... aria-label="Ask"
```

That rules out the browser immediately. No Chrome flag or switch reaches
something YouTube renders from its own data. In particular
`--variations-override-country=us`, which does unlock Chrome's own Gemini side
panel, has no effect here and cannot have one.

## Where the gate is not

**Not a client-side experiment flag.** `ytcfg.data_.EXPERIMENT_FLAGS` holds
around a thousand named booleans and is the obvious place for a UI toggle.
Diffing it between VPN states on the same video gives 27 flags present only with
the VPN and 1 only without, and every one of the 27 is about the search box:
`enable_ai_search_ui`, `ask_youtube_search_icon_searchbox_button`,
`enable_ai_mode_searchbox_entrypoint`, and so on. Nothing about the watch page.

The only youchat-named flag in the build, `enable_youchat_latex_rendering`, is
identical in both states, as are `talk_to_recs_question_response_ui` and
`web_ai_search_rollout_version`.

Worth recording separately: `FEXP_EXPERIMENTS` gains exactly three IDs with the
VPN and loses none, **24499532, 51372681, 52042457**. Those look like the source
of the 27 search flags. That is a different feature and I did not chase it.

**Not the country in the client config.** `ytcfg.data_` carries the country in
five readable places: `GL`, `INNERTUBE_CONTEXT_GL`,
`INNERTUBE_CONTEXT.client.gl`, `SBOX_SETTINGS.REQUEST_DOMAIN` and
`WEB_PLAYER_CONTEXT_CONFIGS...contentRegion`. Setting all five to US with the
VPN off, then navigating in-app so the app re-renders, produces no button.

That negative needed one extra check to mean anything. A page reload resets the
values to FI, so if navigation also reset them the test would prove nothing. It
does not: after in-app navigation the values were still US. So the client's idea
of its own country is not what the button is keyed on.

**Not Chrome's cached AI eligibility.** Chrome caches a server-issued eligibility
manifest in the profile's `Preferences` file under
`aim_eligibility_service.aim_eligibility_response`. It is a base64 protobuf and
it does change with the VPN, from 279 bytes to 782, with one varint flipping 0 to
1 and a feature list growing from `Add images / Add files / Add from Drive` to
include `Create images`, `Canvas`, `Fast`, `Pro`, `Tools` and `Gemini 3 models`.

That is a genuine IP-driven, locally-cached gate, and it is the AI Mode gate. It
is not this one. Writing the VPN value into the pref with the VPN off produced no
button, and the first attempt at that test was invalid because Chrome refetched
and overwrote the patch mid-session. Redone with the file locked read-only, the
patched value verifiably held for the whole session, and there was still no
button.

## Where the gate is

In the watch page payload. Same video, same account, minutes apart:

| | buttons in `ytInitialData` | contains `"Ask"` | contains `youchat` |
| - | - | - | - |
| VPN off | 25 | no | no |
| VPN on | 27 | yes | yes |

So: YouTube's server decides, per request, whether to put the button in the page.
That is the whole gate.

There is an inconsistency in my own data here that I have not resolved. An
earlier search of `ytInitialData`, run with the VPN on and the button visible on
screen, found nothing: `youChat` false, `entrypoint` false, `askButton` false,
and a regex for any key containing `ask` or `Ask` returned an empty array. That
negative is what sent me looking for a client-side gate in the first place, and
it is what produced every wrong hypothesis in the section above.

The later run, on the same nominal state, found `Ask` and `youchat` present. Both
searches would have matched regardless of capitalisation, so case does not
explain it. Candidates I did not test: the panel had been opened before the
earlier run, and YouTube may write back into `ytInitialData` as it goes; or the
two runs differed in some way I did not record. The clean test, load with the VPN
on and search before touching the button, was never run.

The 25 versus 27 comparison above is the measurement the conclusion rests on, and
that one was taken on the same video with nothing else touched. But I would not
want anyone reproducing this to trust the earlier negative, or to assume a single
absent-key search means much on a page that mutates its own initial data.

## The backend does not care where you are

Clicking Ask fires one request:

```
POST https://www.youtube.com/youtubei/v1/get_panel?prettyPrint=false
```

The body carries `context.client.gl`, a `continuation` token, and `formData`.
Authentication is the ordinary `SAPISIDHASH` derived from your cookies.

Note that `gl` is supplied by the client. It is not the server telling you where
you are, it is the page telling the server where it thinks it is. So the obvious
question is whether the server trusts it. With the VPN off, from a Finnish IP, on
video `-Vh17XBWYHY`:

```
page's own gl: FI
gl=FI   status 200   length 7053   youChat=true
gl=US   status 200   length 7053   youChat=true
```

Both return a full youChat panel with suggested questions. Identical response
lengths, so `gl` does not even influence the content. The endpoint is not
geo-gated, and it does not appear to read the country at all.

## The continuation token is forgeable

The token is url-safe base64 wrapping another layer of url-safe base64. The inner
blob begins at `CAESC` and the video ID sits in it as plaintext:

```
<binary>-Vh17XBWYHY"CIyU-_Pv_5UDFbNTnQYdb2opMA*
```

Substituting the ID and re-encoding both layers produces a working token for any
video. Swapping `-Vh17XBWYHY` for `gek1QBZfuv8` with the VPN off returned status
200, a fresh `GetYouChatPanel_rid`, and suggested questions about the substituted
video rather than the original.

The trailing field `CIyU-_Pv_5UDFbNTnQYdb2opMA` looked like it might be a
signature or a session binding, which would have made any of this expire. It is
neither. It survives video substitution unchanged, and it is not validated:

```
original:         status 200   length 7037
26 A characters:  status 200   length 7037
one character changed: status 200   length 7037
```

Identical responses all three times. **There is no session-bound secret anywhere
in this chain.**

## Putting the button back

Because the gate is one missing element in a JSON payload, the fix is to put the
element back before YouTube renders it. The button and the entire panel travel
together: the panel definition is nested inside the button's `onTap` at
`showEngagementPanelEndpoint.engagementPanel.engagementPanelSectionListRenderer`,
so one array element carries everything.

Capture it from a session where the button is present, at

```
ytInitialData.contents.twoColumnWatchNextResults.results.results
  .contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer
  .flexibleItems[0]
```

About 23 500 characters, containing eight continuation tokens: two suggestion
chips plus `onWelcomeCommand` and `sendUserQueryCommand`, duplicated because the
panel appears once under `menuItem` and once under `topLevelButton`.

Then a userscript hooks the watch data, swaps the video ID through all eight
tokens, splices the element in, and lets YouTube's own components do the
rendering. That works, on page load and on in-app navigation, with no VPN.

## Four things that will waste your time if you build this

Every one of these failed silently. Nothing threw, nothing logged an error, and
each produced a plausible-looking wrong result. That is the through-line of the
whole exercise.

**In-app navigation uses a different endpoint.** I hooked `/youtubei/v1/next`,
which is what a search will tell you to hook. SPA navigation actually goes
through `/youtubei/v1/get_watch` first. Both are `fetch`, not `XMLHttpRequest`.

**The URL lags behind the request.** Taking the video ID from `location.search`
gives you the previous video during navigation, because the fetch fires before
the address bar updates. Symptom: a correct summary of the new video with
suggestion chips left over from the old one.

**The request body is gzipped.** So reading the target video ID out of
`init.body` gets you binary, and both `JSON.parse` and a regex quietly find
nothing. Take it from the response instead, but specifically from
`videoDetails.videoId` or `currentVideoEndpoint.watchEndpoint.videoId`. A generic
search for the first `videoId` in the response finds a sidebar recommendation and
reintroduces the stale-context bug above.

**Base64 alignment, which is the nastiest one.** A base64 run nested inside a
decoded protobuf is usually preceded by a length byte, and that byte often falls
in the base64 alphabet: 0x46 is `F`. A greedy regex for base64 runs swallows it,
every subsequent byte shifts by one, and the decode returns noise. No exception,
no warning, the substitution just does not happen.

In my case exactly four of the eight tokens were affected, and they happened to
be `onWelcomeCommand` and `sendUserQueryCommand`, which is why the panel opened
with the previous video's suggestions and typed questions came back "something
went wrong" while the chips worked fine. Base64 aligns every four characters, so
the fix is to try offsets 0 through 3 and take whichever decode contains what you
are looking for.

Worth verifying by round trip: substitute forward, then substitute back, and
check you get the original template byte for byte. That catches alignment damage
that a "does it still parse as JSON" check will not.

## What I have not established

Whether the captured template survives a YouTube client update. It encodes
structure from build 2.20260731.00.00, and if token layout changes the
substitution will fail the same silent way everything else did.

Whether `get_watch` stays the entry point. It replaced `next` at some point
before I started, and `next` is still what most existing material references.

Whether any of this works signed out. It should not: `get_panel` needs
`SAPISIDHASH` from the cookies. I did not test properly.

Whether the country check is IP alone or IP combined with something on the
account. Everything here was one machine and one account.

## The point

The Ask feature is documented as a staged rollout by country, and from the
outside that reads as the feature not being available. What is actually
restricted is one element in the page payload. The service behind it is running,
answers a Finnish IP with a Finnish `gl`, and requires nothing more than an
ordinary signed-in session.

Using a feature that has not been released in your region is very likely contrary
to Google's terms of service. The realistic consequence is that it stops working.
