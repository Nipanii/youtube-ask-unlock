# YouTube Ask unlock

**No VPN. No proxy. No account switching.**

YouTube has an **Ask** button on watch pages, next to Share, that opens a Gemini
panel about the video you are watching. It is rolled out by region, so in most of
the world it is simply not there.

Only the *page* is gated. The service behind the button answers requests from
anywhere, on an ordinary signed-in session, from a non-US IP address, with your
country sent along as-is. A US VPN does not unlock a feature. All it changes is
whether YouTube bothers to draw the button.

So this userscript draws it, and hands the clicks to the same endpoint YouTube
would have. That is the whole trick.

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) or
   [Violentmonkey](https://violentmonkey.github.io/).
2. Open [`youtube-ask-unlock.user.js`](youtube-ask-unlock.user.js) and install it.
3. Open any YouTube video while signed in.

You need to be signed in. The panel authenticates with your normal YouTube
cookies, so signed out it will not work.

**On Chrome**, three things have to be on: Tampermonkey enabled, Developer mode
enabled in `chrome://extensions`, and **Allow user scripts** enabled for the
extension. Tampermonkey does warn you about the last one, but it is easy to click
past.

## How it works

YouTube's server decides, per request, whether to include the button in the watch
page payload. The button is one element in `ytInitialData`, and the entire panel
definition travels inside it, tokens and all.

The script intercepts the watch response before YouTube parses it, splices that
element back in with the video ID substituted, and lets YouTube's own components
render it. Nothing about the panel is reimplemented: the chips, the answers and
the input box are all YouTube's.

Both entry points are covered, the initial page load and in-app navigation, which
go through different endpoints.

Every request still goes to YouTube from your own connection, with your own
country in it. Nothing is tunnelled or spoofed, because nothing needs to be.

There is a longer writeup of how the gating actually works in
[FINDINGS.md](FINDINGS.md), including the parts I got wrong on the way.

## Known limits

**It ships with a captured template.** The button element was captured from one
video on YouTube web client `2.20260731.00.00`. If YouTube changes the structure
of its continuation tokens, the video ID substitution will stop matching and the
script will quietly do nothing.

**Endpoints move.** In-app navigation currently goes through
`/youtubei/v1/get_watch`. It used to be `/youtubei/v1/next`, which is what most
existing material still references. If it moves again, this needs updating.

Open an issue if something breaks. Console output is prefixed `[youchat]`, and
including it makes diagnosis much faster.

## What it does not do

It does not send your data anywhere, does not use an API key, and does not talk
to any server except YouTube's own. It is not one of those extensions that reads
the subtitles and forwards them to a third party model. Everything here is
YouTube's own feature, running on YouTube's own backend.

## Credits

Made by Nipanii.

- GitHub: [Nipanii](https://github.com/Nipanii)
- Reddit: [u/kurkkupomo](https://www.reddit.com/user/kurkkupomo)
- Telegram: [@Nipanii](https://t.me/Nipanii)

Free, and staying that way. If it saved you some time you can
[buy me a coffee](https://ko-fi.com/nipanii), but there is nothing behind a
paywall and nothing to unlock.

Using a feature that has not been released in your region is very likely contrary
to YouTube's terms of service. The realistic consequence is that it stops
working.
