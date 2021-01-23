const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var util = {
    expandAll: function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let codeText = `const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
                
                        await sleep(3000);
                        console.log("Refreshing elements...");;
                        elements = document.querySelectorAll('button.ajax-pagination-btn[type="submit"][data-disable-with]');
                    }
                
                    console.log("Complete!");
                }
                
                Expand();`;

            chrome.tabs.executeScript(tabs[0].id, { code: codeText });
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