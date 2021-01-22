let expandButton = document.getElementById('expandButton');
let hideResolvedButton = document.getElementById('hideResolvedButton');
let showResolvedButton = document.getElementById('showResolvedButton');
let hideCommitsButton = document.getElementById('hideCommitsButton');
let showCommitsButton = document.getElementById('showCommitsButton');

expandButton.onclick = function(element)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
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
};

hideResolvedButton.onclick = function(element)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        let codeText = `var elements = document.querySelectorAll("details[data-resolved='true']");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

        chrome.tabs.executeScript(tabs[0].id, { code: codeText });
    });
};

showResolvedButton.onclick = function(element)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        let codeText = `var elements = document.querySelectorAll("details[data-resolved='true']");
        elements.forEach(function(element) { element.removeAttribute("style"); });`;

        chrome.tabs.executeScript(tabs[0].id, { code: codeText });
    });
};

hideCommitsButton.onclick = function(element)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        let codeText = `var elements = document.querySelectorAll("div.js-commit-group");
        elements.forEach(function(element) { element.setAttribute("style", "display: none !important;"); });`;

        chrome.tabs.executeScript(tabs[0].id, { code: codeText });
    });
};

showCommitsButton.onclick = function(element)
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
    {
        let codeText = `var elements = document.querySelectorAll("div.js-commit-group");
        elements.forEach(function(element) { element.removeAttribute("style"); });`;

        chrome.tabs.executeScript(tabs[0].id, { code: codeText });
    });
};
