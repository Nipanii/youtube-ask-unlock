// ==UserScript==
// @name         YouTube Ask unlock
// @namespace    kurkkupomo
// @version      0.6
// @description  Restores the Ask button on YouTube watch pages where YouTube leaves it out. Only the page is region-gated; the backend behind the button is not.
// @match        https://www.youtube.com/*
// @run-at       document-start
// @homepageURL  https://github.com/Nipanii/youtube-ask-unlock
// @supportURL   https://github.com/Nipanii/youtube-ask-unlock/issues
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // Captured from a watch page where the Ask button was present, at:
  //   ytInitialData.contents.twoColumnWatchNextResults.results.results
  //     .contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer
  //     .flexibleItems[0]
  const TEMPLATE_VIDEO_ID = '95WyqmBiEyA';
  const TEMPLATE = `{"menuFlexibleItemRenderer":{"menuItem":{"menuServiceItemRenderer":{"text":{"simpleText":"Ask"},"icon":{"iconType":"SPARK"},"serviceEndpoint":{"clickTrackingParams":"CLsDEMyrARgAIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","showEngagementPanelEndpoint":{"panelIdentifier":"PAyouchat","engagementPanel":{"engagementPanelSectionListRenderer":{"panelIdentifier":"PAyouchat","header":{"engagementPanelTitleHeaderRenderer":{"title":{"runs":[{"text":"Ask about this video"}]},"visibilityButton":{"buttonRenderer":{"icon":{"iconType":"CLOSE"},"accessibility":{"label":"Close"},"trackingParams":"CNIDEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDA","accessibilityData":{"accessibilityData":{"label":"Close"}},"command":{"clickTrackingParams":"CNIDEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","changeEngagementPanelVisibilityAction":{"targetId":"PAyouchat","visibility":"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN"}}}},"trackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA=="}},"content":{"sectionListRenderer":{"contents":[{"itemSectionRenderer":{"contents":[{"youChatItemViewModel":{"text":{"content":"Hello! Curious about what you're watching? I'm here to help."},"hideIcon":false,"transparentBackground":true,"removeIcon":false,"icon":{"sources":[{"clientResource":{"imageName":"SPARK"}}]}}},{"youChatItemViewModel":{"text":{"content":"Not sure what to ask? Choose something:"},"hideIcon":true,"transparentBackground":true,"removeIcon":false,"icon":{"sources":[{"clientResource":{"imageName":"SPARK"}}]}}},{"youChatItemViewModel":{"chipsData":{"chipData":[{"id":"0-1099004270","text":{"content":"Summarize the video"},"showIcon":false,"onClick":{"clickTrackingParams":"CNEDEPjTEBgEIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatUserTurnViewModel":{"text":"Summarize the video","backgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO"}},{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}},"continuation":"kta-nguqARIJUEF5b3VjaGF0GpwBa2dwdENBRVNDemsxVjNseGJVSnBSWGxCR2hOVGRXMXRZWEpwZW1VZ2RHaGxJSFpwWkdWdklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FTb1BDSktOLXZQN19fX19fd0VRQVNnQlFocERUVXhpT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FRJTNEJTNE","transparentWhenLoading":true,"rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CNEDEPjTEBgEIhMI4uu18YGAlgMVH4vUAh2SNwDA","visibility":{"types":"12"}}}}},{"id":"1-1099004270","text":{"content":"Recommend related content"},"showIcon":false,"onClick":{"clickTrackingParams":"CNADEPjTEBgFIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatUserTurnViewModel":{"text":"Recommend related content","backgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO"}},{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}},"continuation":"kta-nguyARIJUEF5b3VjaGF0GqQBa2dwekNBRVNDemsxVjNseGJVSnBSWGxCR2hsU1pXTnZiVzFsYm1RZ2NtVnNZWFJsWkNCamIyNTBaVzUwSWhwRFRIWmlPWFpIUW1kS1dVUkdVaTFNTVVGSlpHdHFZMEYzUVNvUENKT04tdlA3X19fX193RVFBeWdCUWhwRFRXNWlPWFpIUW1kS1dVUkdVaTFNTVVGSlpHdHFZMEYzUVElM0QlM0Q%3D","transparentWhenLoading":true,"rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CNADEPjTEBgFIhMI4uu18YGAlgMVH4vUAh2SNwDA","visibility":{"types":"12"}}}}}],"isHorizontal":false,"onShowAnimationMs":400,"onShowDelayMs":400,"pendingStateEntityKey":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","lastMessageIdEntityKey":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB"}}},{"youChatItemViewModel":{"targetId":"dynamic_welcome_chips_placeholder_chat_id"}}],"trackingParams":"CM8DELsvGAAiEwji67XxgYCWAxUfi9QCHZI3AMA=","targetId":"youchat_messages_section"}}],"trackingParams":"CM4DELovIhMI4uu18YGAlgMVH4vUAh2SNwDA","targetId":"youchat_section_list","disablePullToRefresh":true,"webComponentHint":{"componentVersion":"WEB_COMPONENT_VERSION_SHARED"}}},"veType":194796,"disablePullRefresh":true,"footer":{"chatInputViewModel":{"inputComposerViewModel":{"inputComposerViewModel":{"inputFormField":{"textFieldViewModel":{"displayProperties":{"hideBorder":true},"contentProperties":{"placeholderText":"Ask a question...","maxCharacterCount":500}}},"youchatPendingResponseEntityKey":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","onSubmitCommand":{"innertubeCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}}},"sectionTargetId":"youchat_messages_section","setPendingResponseOnWelcome":false,"loadingConfig":{"loadingAnimationA11yLabel":"Load in progress."},"chatUserTurnBackgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO","rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA==","visibility":{"types":"12"},"clientVeSpec":{"uiType":247342,"veCounter":761842158}}}}}},"sendButton":{"buttonViewModel":{"iconName":"send","accessibilityText":"Send","style":"BUTTON_VIEW_MODEL_STYLE_MONO","trackingParams":"CM0DEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDA","type":"BUTTON_VIEW_MODEL_TYPE_TEXT","buttonSize":"BUTTON_VIEW_MODEL_SIZE_COMPACT","iconImageFlipForRtl":true}},"environment":"CHAT_ENVIRONMENT_ENUM_YOUCHAT","onWelcomeCommand":{"innertubeCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","continuationCommand":{"token":"kta-ngtTEglQQXlvdWNoYXQaRmtnb3ZDQUVTQ3prMVYzbHhiVUpwUlhsQklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FTb0NJQUUlM0Q%3D","request":"CONTINUATION_REQUEST_TYPE_GET_PANEL"}}},"sendUserQueryCommand":{"innertubeCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","continuationCommand":{"token":"kta-ngtREglQQXlvdWNoYXQaRGtnb3JDQUVTQ3prMVYzbHhiVUpwUlhsQklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FRJTNEJTNE","request":"CONTINUATION_REQUEST_TYPE_GET_PANEL"}}},"loadingAnimationA11yLabel":"Load in progress.","disclaimerText":{"content":"AI can make mistakes, so double-check it. Learn more","commandRuns":[{"startIndex":42,"length":10,"onTap":{"innertubeCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","commandMetadata":{"webCommandMetadata":{"url":"https://support.google.com/youtube/answer/14110396","webPageType":"WEB_PAGE_TYPE_UNKNOWN","rootVe":83769}},"urlEndpoint":{"url":"https://support.google.com/youtube/answer/14110396","target":"TARGET_NEW_WINDOW"}}}}],"styleRuns":[{"startIndex":42,"length":10,"fontColor":4289374890,"underline":"LINE_STYLE_SINGLE","weightLabel":"FONT_WEIGHT_NORMAL"}]},"promoButton":{"buttonViewModel":{"onTap":{"innertubeCommand":{"clickTrackingParams":"CMwDEPOBECITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","commandMetadata":{"webCommandMetadata":{"url":"https://gemini.google.com/","webPageType":"WEB_PAGE_TYPE_UNKNOWN","rootVe":83769}},"urlEndpoint":{"url":"https://gemini.google.com","target":"TARGET_NEW_WINDOW"}}},"style":"BUTTON_VIEW_MODEL_STYLE_MONO","trackingParams":"CMwDEPOBECITCOLrtfGBgJYDFR-L1AIdkjcAwA==","type":"BUTTON_VIEW_MODEL_TYPE_OUTLINE","buttonSize":"BUTTON_VIEW_MODEL_SIZE_XSMALL","titleFormatted":{"content":"Ask Gemini","styleRuns":[{"startIndex":0,"length":10},{"startIndex":0,"length":10,"weightLabel":"FONT_WEIGHT_UNKNOWN"}],"attachmentRuns":[{"startIndex":4,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{"url":"https://www.gstatic.com/images/branding/productlogos/gemini_2025/v1/web-16dp/logo_gemini_2025_color_2x_web_16dp.png"}]}}},"properties":{"layoutProperties":{"height":{"value":11,"unit":"DIMENSION_UNIT_POINT"},"width":{"value":11,"unit":"DIMENSION_UNIT_POINT"},"margin":{"end":{"value":2.75,"unit":"DIMENSION_UNIT_POINT"}}}}},"alignment":"ALIGNMENT_VERTICAL_CENTER"},{"startIndex":0,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{}]}}},"properties":{"layoutProperties":{"width":{"value":8,"unit":"DIMENSION_UNIT_POINT"}}}}},{"startIndex":10,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{}]}}},"properties":{"layoutProperties":{"width":{"value":8,"unit":"DIMENSION_UNIT_POINT"}}}}}]}}},"lastMessageIdEntityKey":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB"}},"onShowCommands":[{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","scrollToEngagementPanelCommand":{"targetId":"PAyouchat"}}],"onCloseCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","elementsCommand":{"setEntityCommand":{"identifier":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","entity":"CAA="}}},"onDestroyCommand":{"clickTrackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","elementsCommand":{"setEntityCommand":{"identifier":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB","entity":"CkBFaWw1YjNWamFHRjBYMnhoYzNSZlkyeHBaVzUwWDIxbGMzTmhaMlZmYVdSZlpXNTBhWFI1WDJ0bGVTRC1BaWdC"}}},"loggingDirectives":{"trackingParams":"CMsDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA==","visibility":{"types":"12"}}}},"sourcePanelIdentifier":"video-description-ep-identifier","blockIfPanelOpen":true}},"trackingParams":"CLsDEMyrARgAIhMI4uu18YGAlgMVH4vUAh2SNwDA"}},"topLevelButton":{"buttonViewModel":{"iconName":"SPARK","title":"Ask","onTap":{"innertubeCommand":{"clickTrackingParams":"CMIDEOvxCyITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","showEngagementPanelEndpoint":{"panelIdentifier":"PAyouchat","engagementPanel":{"engagementPanelSectionListRenderer":{"panelIdentifier":"PAyouchat","header":{"engagementPanelTitleHeaderRenderer":{"title":{"runs":[{"text":"Ask about this video"}]},"visibilityButton":{"buttonRenderer":{"icon":{"iconType":"CLOSE"},"accessibility":{"label":"Close"},"trackingParams":"CMoDEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDA","accessibilityData":{"accessibilityData":{"label":"Close"}},"command":{"clickTrackingParams":"CMoDEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","changeEngagementPanelVisibilityAction":{"targetId":"PAyouchat","visibility":"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN"}}}},"trackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA=="}},"content":{"sectionListRenderer":{"contents":[{"itemSectionRenderer":{"contents":[{"youChatItemViewModel":{"text":{"content":"Hello! Curious about what you're watching? I'm here to help."},"hideIcon":false,"transparentBackground":true,"removeIcon":false,"icon":{"sources":[{"clientResource":{"imageName":"SPARK"}}]}}},{"youChatItemViewModel":{"text":{"content":"Not sure what to ask? Choose something:"},"hideIcon":true,"transparentBackground":true,"removeIcon":false,"icon":{"sources":[{"clientResource":{"imageName":"SPARK"}}]}}},{"youChatItemViewModel":{"chipsData":{"chipData":[{"id":"0-1099004270","text":{"content":"Summarize the video"},"showIcon":false,"onClick":{"clickTrackingParams":"CMkDEPjTEBgEIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatUserTurnViewModel":{"text":"Summarize the video","backgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO"}},{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}},"continuation":"kta-nguqARIJUEF5b3VjaGF0GpwBa2dwdENBRVNDemsxVjNseGJVSnBSWGxCR2hOVGRXMXRZWEpwZW1VZ2RHaGxJSFpwWkdWdklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FTb1BDSktOLXZQN19fX19fd0VRQVNnQlFocERUVXhpT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FRJTNEJTNE","transparentWhenLoading":true,"rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CMkDEPjTEBgEIhMI4uu18YGAlgMVH4vUAh2SNwDA","visibility":{"types":"12"}}}}},{"id":"1-1099004270","text":{"content":"Recommend related content"},"showIcon":false,"onClick":{"clickTrackingParams":"CMgDEPjTEBgFIhMI4uu18YGAlgMVH4vUAh2SNwDAygEELWO79Q==","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatUserTurnViewModel":{"text":"Recommend related content","backgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO"}},{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}},"continuation":"kta-nguyARIJUEF5b3VjaGF0GqQBa2dwekNBRVNDemsxVjNseGJVSnBSWGxCR2hsU1pXTnZiVzFsYm1RZ2NtVnNZWFJsWkNCamIyNTBaVzUwSWhwRFRIWmlPWFpIUW1kS1dVUkdVaTFNTVVGSlpHdHFZMEYzUVNvUENKT04tdlA3X19fX193RVFBeWdCUWhwRFRXNWlPWFpIUW1kS1dVUkdVaTFNTVVGSlpHdHFZMEYzUVElM0QlM0Q%3D","transparentWhenLoading":true,"rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CMgDEPjTEBgFIhMI4uu18YGAlgMVH4vUAh2SNwDA","visibility":{"types":"12"}}}}}],"isHorizontal":false,"onShowAnimationMs":400,"onShowDelayMs":400,"pendingStateEntityKey":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","lastMessageIdEntityKey":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB"}}},{"youChatItemViewModel":{"targetId":"dynamic_welcome_chips_placeholder_chat_id"}}],"trackingParams":"CMcDELsvGAAiEwji67XxgYCWAxUfi9QCHZI3AMA=","targetId":"youchat_messages_section"}}],"trackingParams":"CMYDELovIhMI4uu18YGAlgMVH4vUAh2SNwDA","targetId":"youchat_section_list","disablePullToRefresh":true,"webComponentHint":{"componentVersion":"WEB_COMPONENT_VERSION_SHARED"}}},"veType":194796,"disablePullRefresh":true,"footer":{"chatInputViewModel":{"inputComposerViewModel":{"inputComposerViewModel":{"inputFormField":{"textFieldViewModel":{"displayProperties":{"hideBorder":true},"contentProperties":{"placeholderText":"Ask a question...","maxCharacterCount":500}}},"youchatPendingResponseEntityKey":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","onSubmitCommand":{"innertubeCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","listMutationCommand":{"operations":{"operations":[{"insertItemSectionContent":{"contents":[{"chatLoadingViewModel":{"targetId":"loading_response_message_id","animation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_light_v3.json"},"loop":true}},"loadingAnimationA11yLabel":"Load in progress.","darkThemeAnimation":{"lottieAnimationViewModel":{"trustedAnimationUrl":{"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue":"https://www.gstatic.com/youtube/img/lottie/youchat_animations/progress_indicator_comp_mono_dark_v3.json"},"loop":true}}}}],"insertByPositionInSection":{"sectionTargetId":"youchat_messages_section","position":"INSERTION_POSITION_LAST"}}}],"scrollConfig":{"scrollToItem":{"item":{"itemTargetId":"loading_response_message_id","sectionTargetId":"youchat_section_list"},"scrollPosition":"SCROLL_POSITION_END"}}}}}},"sectionTargetId":"youchat_messages_section","setPendingResponseOnWelcome":false,"loadingConfig":{"loadingAnimationA11yLabel":"Load in progress."},"chatUserTurnBackgroundStyle":"CHAT_USER_TURN_BACKGROUND_STYLE_MONO","rendererContext":{"loggingContext":{"loggingDirectives":{"trackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA==","visibility":{"types":"12"},"clientVeSpec":{"uiType":247342,"veCounter":761842157}}}}}},"sendButton":{"buttonViewModel":{"iconName":"send","accessibilityText":"Send","style":"BUTTON_VIEW_MODEL_STYLE_MONO","trackingParams":"CMUDEPBbIhMI4uu18YGAlgMVH4vUAh2SNwDA","type":"BUTTON_VIEW_MODEL_TYPE_TEXT","buttonSize":"BUTTON_VIEW_MODEL_SIZE_COMPACT","iconImageFlipForRtl":true}},"environment":"CHAT_ENVIRONMENT_ENUM_YOUCHAT","onWelcomeCommand":{"innertubeCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","continuationCommand":{"token":"kta-ngtTEglQQXlvdWNoYXQaRmtnb3ZDQUVTQ3prMVYzbHhiVUpwUlhsQklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FTb0NJQUUlM0Q%3D","request":"CONTINUATION_REQUEST_TYPE_GET_PANEL"}}},"sendUserQueryCommand":{"innertubeCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","continuationCommand":{"token":"kta-ngtREglQQXlvdWNoYXQaRGtnb3JDQUVTQ3prMVYzbHhiVUpwUlhsQklocERUSFppT1haSFFtZEtXVVJHVWkxTU1VRkpaR3RxWTBGM1FRJTNEJTNE","request":"CONTINUATION_REQUEST_TYPE_GET_PANEL"}}},"loadingAnimationA11yLabel":"Load in progress.","disclaimerText":{"content":"AI can make mistakes, so double-check it. Learn more","commandRuns":[{"startIndex":42,"length":10,"onTap":{"innertubeCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","commandMetadata":{"webCommandMetadata":{"url":"https://support.google.com/youtube/answer/14110396","webPageType":"WEB_PAGE_TYPE_UNKNOWN","rootVe":83769}},"urlEndpoint":{"url":"https://support.google.com/youtube/answer/14110396","target":"TARGET_NEW_WINDOW"}}}}],"styleRuns":[{"startIndex":42,"length":10,"fontColor":4289374890,"underline":"LINE_STYLE_SINGLE","weightLabel":"FONT_WEIGHT_NORMAL"}]},"promoButton":{"buttonViewModel":{"onTap":{"innertubeCommand":{"clickTrackingParams":"CMQDEPOBECITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","commandMetadata":{"webCommandMetadata":{"url":"https://gemini.google.com/","webPageType":"WEB_PAGE_TYPE_UNKNOWN","rootVe":83769}},"urlEndpoint":{"url":"https://gemini.google.com","target":"TARGET_NEW_WINDOW"}}},"style":"BUTTON_VIEW_MODEL_STYLE_MONO","trackingParams":"CMQDEPOBECITCOLrtfGBgJYDFR-L1AIdkjcAwA==","type":"BUTTON_VIEW_MODEL_TYPE_OUTLINE","buttonSize":"BUTTON_VIEW_MODEL_SIZE_XSMALL","titleFormatted":{"content":"Ask Gemini","styleRuns":[{"startIndex":0,"length":10},{"startIndex":0,"length":10,"weightLabel":"FONT_WEIGHT_UNKNOWN"}],"attachmentRuns":[{"startIndex":4,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{"url":"https://www.gstatic.com/images/branding/productlogos/gemini_2025/v1/web-16dp/logo_gemini_2025_color_2x_web_16dp.png"}]}}},"properties":{"layoutProperties":{"height":{"value":11,"unit":"DIMENSION_UNIT_POINT"},"width":{"value":11,"unit":"DIMENSION_UNIT_POINT"},"margin":{"end":{"value":2.75,"unit":"DIMENSION_UNIT_POINT"}}}}},"alignment":"ALIGNMENT_VERTICAL_CENTER"},{"startIndex":0,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{}]}}},"properties":{"layoutProperties":{"width":{"value":8,"unit":"DIMENSION_UNIT_POINT"}}}}},{"startIndex":10,"length":0,"element":{"type":{"imageType":{"image":{"sources":[{}]}}},"properties":{"layoutProperties":{"width":{"value":8,"unit":"DIMENSION_UNIT_POINT"}}}}}]}}},"lastMessageIdEntityKey":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB"}},"onShowCommands":[{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","scrollToEngagementPanelCommand":{"targetId":"PAyouchat"}}],"onCloseCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","elementsCommand":{"setEntityCommand":{"identifier":"EiN5b3VjaGF0X3BlbmRpbmdfcmVzcG9uc2VfZW50aXR5X2tleSCpBCgB","entity":"CAA="}}},"onDestroyCommand":{"clickTrackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwMoBBC1ju_U=","elementsCommand":{"setEntityCommand":{"identifier":"Eil5b3VjaGF0X2xhc3RfY2xpZW50X21lc3NhZ2VfaWRfZW50aXR5X2tleSD-AigB","entity":"CkBFaWw1YjNWamFHRjBYMnhoYzNSZlkyeHBaVzUwWDIxbGMzTmhaMlZmYVdSZlpXNTBhWFI1WDJ0bGVTRC1BaWdC"}}},"loggingDirectives":{"trackingParams":"CMMDENONBCITCOLrtfGBgJYDFR-L1AIdkjcAwA==","visibility":{"types":"12"}}}},"sourcePanelIdentifier":"video-description-ep-identifier","blockIfPanelOpen":true}}},"accessibilityText":"Ask","style":"BUTTON_VIEW_MODEL_STYLE_MONO","trackingParams":"CMIDEOvxCyITCOLrtfGBgJYDFR-L1AIdkjcAwA==","type":"BUTTON_VIEW_MODEL_TYPE_TONAL","buttonSize":"BUTTON_VIEW_MODEL_SIZE_DEFAULT","targetId":"you-chat-entrypoint-button","tooltip":"Ask"}}}}`;

  const DEBUG = true;
  const log = (...a) => DEBUG && console.log('[youchat]', ...a);

  if (!TEMPLATE || TEMPLATE === 'PASTE_JSON_HERE') {
    console.warn('[youchat] TEMPLATE is empty, nothing will be injected.');
    return;
  }

  // ---------------------------------------------------------------------
  // base64 helpers. Tokens are url-safe base64, sometimes with the padding
  // percent-encoded. Lengths are preserved because video IDs are always 11
  // characters, so no length prefix inside the protobuf needs rewriting.
  // ---------------------------------------------------------------------
  function d64(s) {
    let t = decodeURIComponent(s).replace(/-/g, '+').replace(/_/g, '/');
    while (t.length % 4) t += '=';
    return atob(t);
  }

  function e64(s) {
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  // The video ID sits two base64 layers deep inside continuation tokens.
  //
  // Alignment matters here. A base64 run inside a decoded protobuf is often
  // preceded by a length byte that happens to fall in the base64 alphabet
  // (0x46 is 'F'), so a greedy match swallows it, shifts every subsequent
  // byte by one, and the decode yields noise. Base64 aligns every 4
  // characters, so trying offsets 0 through 3 covers every case.
  function deepSwap(str, oldId, newId, depth) {
    if (depth > 4) return str;
    if (str.indexOf(oldId) !== -1) return str.split(oldId).join(newId);

    return str.replace(/[A-Za-z0-9\-_+/]{16,}(?:%3D|=)*/g, function (run) {
      const m = run.match(/^([A-Za-z0-9\-_+/]+)((?:%3D|=)*)$/);
      if (!m) return run;
      const body = m[1], pad = m[2];

      for (let off = 0; off < 4; off++) {
        const head = body.slice(0, off);
        const tail = body.slice(off);
        if (tail.length < 16) break;

        let dec;
        try { dec = d64(tail); } catch (e) { continue; }

        const swapped = deepSwap(dec, oldId, newId, depth + 1);
        if (swapped === dec) continue;

        let reenc;
        try { reenc = e64(swapped); } catch (e) { continue; }

        // A length change would corrupt the enclosing protobuf. Every video
        // ID is 11 characters, so this should never fire, but a silent
        // corruption is worse than a skipped swap.
        if (reenc.length !== tail.length) {
          console.warn('[youchat] length drift, skipping run');
          continue;
        }
        return head + reenc + pad;
      }
      return run;
    });
  }

  function buildItem(videoId) {
    return JSON.parse(deepSwap(TEMPLATE, TEMPLATE_VIDEO_ID, videoId, 0));
  }

  // ---------------------------------------------------------------------
  // The action row lives under videoPrimaryInfoRenderer, but the wrapper
  // around it differs between get_watch and next, so walk the tree.
  // ---------------------------------------------------------------------
  function getMenu(node, depth) {
    depth = depth || 0;
    if (!node || typeof node !== 'object' || depth > 12) return null;

    if (node.videoPrimaryInfoRenderer) {
      const r = node.videoPrimaryInfoRenderer;
      if (r.videoActions && r.videoActions.menuRenderer) return r.videoActions.menuRenderer;
    }

    if (Array.isArray(node)) {
      for (const child of node) {
        const hit = getMenu(child, depth + 1);
        if (hit) return hit;
      }
      return null;
    }

    for (const k in node) {
      const hit = getMenu(node[k], depth + 1);
      if (hit) return hit;
    }
    return null;
  }

  // Returns true only if it actually inserted something.
  function patch(data, videoId, where) {
    if (!data || typeof data !== 'object') return false;
    if (!videoId || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
      log(where, 'no usable video id, skipped');
      return false;
    }

    const menu = getMenu(data);
    if (!menu) return false;

    if (!Array.isArray(menu.flexibleItems)) menu.flexibleItems = [];

    if (JSON.stringify(menu.flexibleItems).indexOf('you-chat-entrypoint-button') !== -1) {
      log(where, 'already present, left alone');
      return false;
    }

    let item;
    try {
      item = buildItem(videoId);
    } catch (e) {
      console.warn('[youchat] template build failed:', e);
      return false;
    }

    menu.flexibleItems.unshift(item);
    log(where, 'injected for', videoId);
    return true;
  }

  // ---------------------------------------------------------------------
  // Initial page load. The URL is authoritative here because nothing has
  // navigated yet.
  // ---------------------------------------------------------------------
  let _ytInitialData;
  try {
    Object.defineProperty(window, 'ytInitialData', {
      configurable: true,
      enumerable: true,
      get() { return _ytInitialData; },
      set(v) {
        try {
          const id = new URLSearchParams(location.search).get('v');
          if (id) patch(v, id, 'initial');
        } catch (e) {
          console.warn('[youchat] initial patch failed:', e);
        }
        _ytInitialData = v;
      }
    });
  } catch (e) {
    console.warn('[youchat] could not hook ytInitialData:', e);
  }

  // ---------------------------------------------------------------------
  // SPA navigation. The target video ID must come from the request body:
  // at fetch time location.href is still the previous video, which is what
  // produced stale panel context in 0.2.
  // ---------------------------------------------------------------------
  // The request body is not usable: YouTube gzips it, so init.body is
  // binary rather than JSON text. Take the ID from the response instead,
  // but only from fields that describe the current video. A generic search
  // for the first videoId picks up a sidebar recommendation and produces
  // the stale-context bug from 0.2.
  function deepFind(node, key, depth) {
    depth = depth || 0;
    if (!node || typeof node !== 'object' || depth > 10) return null;
    if (Object.prototype.hasOwnProperty.call(node, key)) return node[key];
    if (Array.isArray(node)) {
      for (const c of node) {
        const hit = deepFind(c, key, depth + 1);
        if (hit) return hit;
      }
      return null;
    }
    for (const k in node) {
      const hit = deepFind(node[k], key, depth + 1);
      if (hit) return hit;
    }
    return null;
  }

  function idFromResponse(data) {
    try {
      const vd = deepFind(data, 'videoDetails');
      if (vd && typeof vd.videoId === 'string') return vd.videoId;
    } catch (e) {}
    try {
      const cve = deepFind(data, 'currentVideoEndpoint');
      if (cve && cve.watchEndpoint && typeof cve.watchEndpoint.videoId === 'string') {
        return cve.watchEndpoint.videoId;
      }
    } catch (e) {}
    return null;
  }

  const origFetch = window.fetch.bind(window);

  window.fetch = function (input, init) {
    const url = (typeof input === 'string') ? input
              : (input && input.url) ? input.url
              : String(input || '');

    const isWatchData = url.indexOf('/youtubei/v1/get_watch') !== -1 ||
                        url.indexOf('/youtubei/v1/next') !== -1;

    if (!isWatchData) return origFetch(input, init);

    return origFetch(input, init).then(function (res) {
      if (!res || !res.ok) return res;

      return res.clone().text().then(function (text) {
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          return res;
        }

        const videoId = idFromResponse(data);
        const where = url.indexOf('get_watch') !== -1 ? 'get_watch' : 'next';
        const changed = patch(data, videoId, where);
        if (!changed) return res;

        // Rebuild with clean headers. Copying content-encoding and
        // content-length from the original leaves them describing a body
        // that no longer exists, which is what broke sign-in in 0.2.
        const headers = new Headers();
        try {
          res.headers.forEach(function (v, k) {
            const lk = k.toLowerCase();
            if (lk === 'content-encoding' || lk === 'content-length') return;
            headers.set(k, v);
          });
        } catch (e) {
          headers.set('content-type', 'application/json');
        }

        return new Response(JSON.stringify(data), {
          status: res.status,
          statusText: res.statusText,
          headers: headers
        });
      }).catch(function (e) {
        log('response patch failed, passing through:', e);
        return res;
      });
    });
  };

  log('installed');
})();
