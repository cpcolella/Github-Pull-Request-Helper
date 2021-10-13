const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var util = {
    expandAll: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.Expand });
        });
    },
    hideResolved: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.HideResolved });
        });
    },
    showResolved: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.ShowResolved });
        });
    },
    hideCommits: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.HideCommits });
        });
    },
    showCommits: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.ShowCommits });
        });
    },
    hideStatuses: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.HideStatuses });
        });
    },
    showStatuses: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.ShowStatuses });
        });
    },
    hideComments: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.HideComments });
        });
    },
    showComments: function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.scripting.executeScript({ target: {tabId: tabs[0].id}, func: NewUtil.ShowComments });
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


var NewUtil = (function () {
    'use strict';

    async function Expand()
    {
        let elements = document.querySelectorAll("button.ajax-pagination-btn[type='submit'][data-disable-with]");
        let counter = 1;
    
        while (elements.length > 0)
        {
            console.log("Expansion round " + counter++);
    
            for (let i = 0; i < elements.length; i++)
            {
                elements[i].click();
            }
            
            let loadingItems = document.querySelectorAll('button.ajax-pagination-btn[type="submit"][data-disable-with][disabled]');
            while (loadingItems.length > 0) {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                loadingItems = document.querySelectorAll('button.ajax-pagination-btn[type="submit"][data-disable-with][disabled]');
            }
            
            console.log("Refreshing elements...");
            elements = document.querySelectorAll('button.ajax-pagination-btn[type="submit"][data-disable-with]');
        }
    
        console.log("Complete!");
    }
    
    async function HideResolved()
    {
        const elements = document.querySelectorAll("details[data-resolved='true']");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });
    }
    
    async function ShowResolved()
    {
        const elements = document.querySelectorAll("details[data-resolved='true']");
        elements.forEach(function(element) { element.removeAttribute("style"); });
    }
    
    async function HideCommits()
    {
        const elements = document.querySelectorAll("div.js-commit-group");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });
    }
    
    async function ShowCommits()
    {
        const elements = document.querySelectorAll("div.js-commit-group");
        elements.forEach(function(element) { element.removeAttribute("style"); });
    }
    
    async function HideStatuses() {
        const elements = document.querySelectorAll(".js-timeline-item  .TimelineItem[data-team-hovercards-enabled]:not([data-url]), .js-timeline-item > div > div[id|=pullrequestreview] > .TimelineItem:not([data-url]), .js-timeline-item > .TimelineItem:not([data-url]) > span.TimelineItem-badge.bg-blue.text-white");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });
    }
    
    async function ShowStatuses() {
        const elements = document.querySelectorAll(".js-timeline-item  .TimelineItem[data-team-hovercards-enabled]:not([data-url]), .js-timeline-item > div > div[id|=pullrequestreview] > .TimelineItem:not([data-url]), .js-timeline-item > .TimelineItem:not([data-url]) > span.TimelineItem-badge.bg-blue.text-white");
        elements.forEach(function(element) { element.removeAttribute("style"); });
    }
    
    async function HideComments() {
        const elements = document.querySelectorAll(".TimelineItem.js-comment-container, .TimelineItem > .timeline-comment-group");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });
    }
    
    async function ShowComments() {
        const elements = document.querySelectorAll(".TimelineItem.js-comment-container, .TimelineItem > .timeline-comment-group")
        elements.forEach(function(element) { element.removeAttribute("style"); });
    }

    return {
        Expand: Expand,
        HideResolved: HideResolved,
        ShowResolved: ShowResolved,
        HideCommits: HideCommits,
        ShowCommits: ShowCommits,
        HideStatuses: HideStatuses,
        ShowStatuses: ShowStatuses,
        HideComments: HideComments,
        ShowComments: ShowComments,
        
    };
})();