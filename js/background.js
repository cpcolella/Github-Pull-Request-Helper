chrome.runtime.onInstalled.addListener(function()
{
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function()
    {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: 'github.com' },
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });

    let eventList = ['onCompleted', 'onReferenceFragmentUpdated', 'onTabReplaced', 'onHistoryStateUpdated'];

    eventList.forEach(function (e) {
        chrome.webNavigation[e].addListener(function (event) {
            util.autoApplyItems(event.url);
        });
    });

    chrome.tabs.onActivated.addListener(function (event) {
        chrome.tabs.get(event.tabId, function (tab)
        {
            util.autoApplyItems(tab.url);
        });
    });
});


