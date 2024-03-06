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


const NewUtil = (function () {
    'use strict';

    async function Expand()
    {
        let button = document.querySelector('button[data-disable-with^="Loading"]:not([disabled])');

        while (button !== null)
        {
            console.log("Expanding...");
            button.click();
            
            while (document.querySelector('button[data-disable-with^="Loading"][disabled]') !== null)
            {
                await Sleep(1000);
            }
            
            console.log("Refreshing element...");
            button = document.querySelector('button[data-disable-with^="Loading"]:not([disabled])');
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

    function Sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
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
