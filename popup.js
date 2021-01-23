let expandButton = document.getElementById('expandButton');
let hideResolvedButton = document.getElementById('hideResolvedButton');
let showResolvedButton = document.getElementById('showResolvedButton');
let hideCommitsButton = document.getElementById('hideCommitsButton');
let showCommitsButton = document.getElementById('showCommitsButton');

expandButton.onclick = function(element)
{
    util.expandAll();
};

hideResolvedButton.onclick = function(element)
{
    util.hideResolved();
};

showResolvedButton.onclick = function(element)
{
    util.showResolved();
};

hideCommitsButton.onclick = function(element)
{
    util.hideCommits();
};

showCommitsButton.onclick = function(element)
{
    util.showCommits();
};