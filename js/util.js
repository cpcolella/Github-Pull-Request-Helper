const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

let expandAllCounter = 0;

var util = {
    expandAll: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `const sleep` + (expandAllCounter) + ` = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

                async function Expand() {
                    var elements = document.querySelectorAll("button.ajax-pagination-btn[type='submit'][data-disable-with]");
                    var counter = 1;
                
                    while (elements.length > 0)
                    {
                        console.log("Expansion round " + counter++);
                
                        for (var i = 0; i < elements.length; i++)
                        {
                            elements[i].click();
                        }
                
                        await sleep` + (expandAllCounter) + `(3000);
                        console.log("Refreshing elements...");;
                        elements = document.querySelectorAll('button.ajax-pagination-btn[type="submit"][data-disable-with]');
                    }
                
                    console.log("Complete!");
                }
                
                Expand();`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
            expandAllCounter++;
        });
    },
    hideResolved: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll("details[data-resolved='true']");
                elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    showResolved: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll("details[data-resolved='true']");
                elements.forEach(function(element) { element.removeAttribute("style"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    hideCommits: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll("div.js-commit-group");
                elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    showCommits: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll("div.js-commit-group");
                elements.forEach(function(element) { element.removeAttribute("style"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    hideStatuses: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll(".js-timeline-item  .TimelineItem[data-team-hovercards-enabled]:not([data-url]), .js-timeline-item > div > div[id|=pullrequestreview] > .TimelineItem:not([data-url]), .js-timeline-item > .TimelineItem:not([data-url]) > span.TimelineItem-badge.bg-blue.text-white")
                elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    showStatuses: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll(".js-timeline-item  .TimelineItem[data-team-hovercards-enabled]:not([data-url]), .js-timeline-item > div > div[id|=pullrequestreview] > .TimelineItem:not([data-url]), .js-timeline-item > .TimelineItem:not([data-url]) > span.TimelineItem-badge.bg-blue.text-white")
                elements.forEach(function(element) { element.removeAttribute("style"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    hideComments: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll(".TimelineItem.js-comment-container, .TimelineItem > .timeline-comment-group")
                elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    showComments: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `var elements = document.querySelectorAll(".TimelineItem.js-comment-container, .TimelineItem > .timeline-comment-group")
                elements.forEach(function(element) { element.removeAttribute("style"); });`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
        });
    },
    checkUrl: function(url) {
        var pattern = "^https?:\\/\\/github.com\\/[^\\/]+\\/[^\\/]+\\/pull\\/(\\d+)";
        var regex = new RegExp(pattern);
        var result = regex.test(url);
        return result;
    },
    autoApplyItems: function(currentUrl) {
        let result = util.checkUrl(currentUrl);

        if (result === true) {
            util.setDefaults();
        }
    },
    setDefaults: function() {
        chrome.storage.sync.get("autoExpand", function (val) {
            if (val.autoExpand === true){
                util.expandAll();
            }

            //setTimeout(function() { util.setHideCommits() }, 15000);
            //setTimeout(function () { util.setHideResolved() }, 15000);
        });
    },
    setHideCommits: function() {
        chrome.storage.sync.get("hideCommits", function (val2) {
            if (val2.hideCommits === true) {
                util.hideCommits();
            }
        });
    },
    setHideResolved: function() {
        chrome.storage.sync.get("hideResolved", function (val3) {
            if (val3.hideResolved === true) {
                util.hideResolved();
            }
        });
    }
};