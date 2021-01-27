let expandButton = document.getElementById('expandButton');
let hideResolvedButton = document.getElementById('hideResolvedButton');
let showResolvedButton = document.getElementById('showResolvedButton');
let hideCommitsButton = document.getElementById('hideCommitsButton');
let showCommitsButton = document.getElementById('showCommitsButton');
let refreshButton = document.getElementById('refreshButton');

expandButton.onclick = function(element)
{
    util.expandAll();
};

hideResolvedButton.onclick = function(element)
{
    util.hideResolved();
};

showResolvedButton.onclick = function (event)
{
    util.showResolved();
};

hideCommitsButton.onclick = function (event)
{
    util.hideCommits();
};

showCommitsButton.onclick = function (event)
{
    util.showCommits();
};

refreshButton.onclick = function (event)
{
    refresh(event);
};

async function refresh(event)
{
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        let url = tabs[0].url;
        util.autoApplyItems(url);
    });
    
    event.target.className += " spin";
    await sleep(500);
    chrome.extension.getBackgroundPage().window.location.reload();
    window.location.reload();
}

 document.onload