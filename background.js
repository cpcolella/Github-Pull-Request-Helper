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
            autoApplyItems(event.url);
        });
    });

    chrome.tabs.onActivated.addListener(function (event) {
        chrome.tabs.get(event.tabId, function (tab)
        {
            autoApplyItems(tab.url);
        });
    });
});


function autoApplyItems(currentUrl) {
    var pattern = "^https?:\\/\\/github.com\\/[^\\/]+\\/[^\\/]+\\/pull\\/(\\d+)$";
    var regex = new RegExp(pattern);
    var result = regex.test(currentUrl);

    if (result === true) {
        //alert("On Pull Request Page!");
        util.setDefaults();
    }
}