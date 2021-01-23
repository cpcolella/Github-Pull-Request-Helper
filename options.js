let page = document.getElementById('buttonDiv');

let sliderMap = [];
sliderMap.push({ key: "autoExpand", value: "Auto Expand" });
//sliderMap.push({ key: "autoHideResolved", value: "Auto Hide Resolved" });
//sliderMap.push({ key: "autoHideCommits", value: "Auto Hide Commits" });

function constructSliders()
{
    let body = document.querySelector("body > div.allContainer");
    for (let item of sliderMap)
    {
        let container = document.createElement("div");
        container.className = "container";
        let label = document.createElement("label");
        label.setAttribute("for", item.key);
        label.innerText = item.value;

        let slider = document.createElement("label");
        slider.id = item.key;
        slider.className = "switch";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        let span = document.createElement("span");
        span.className = "slider round";

        slider.appendChild(checkbox);
        slider.appendChild(span);
        slider.addEventListener("click", save);

        container.appendChild(label);
        container.appendChild(slider);
        body.appendChild(container);
        getAndAssignValue(item.key);
    }
}

function save()
{
    let saveObject = getSaveObject();

    chrome.storage.sync.set(saveObject, function () {
        console.log("Saved.");
    });
}

function getSaveObject()
{
    let autoExpandCheckbox = document.querySelector("#autoExpand > input[type='checkbox']");
    let autoHideResolvedCheckbox = document.querySelector("#autoHideResolved > input[type='checkbox']");
    let autoHideCommitsCheckbox = document.querySelector("#autoHideCommits > input[type='checkbox']");

    let retValue = {
        autoExpand: autoExpandCheckbox.checked,
        autoHideResolved: autoHideResolvedCheckbox.checked,
        autoHideCommits: autoHideCommitsCheckbox.checked
    };

    return retValue;
}

function getAndAssignValue(key)
{
    console.log("Getting: " + key);
    chrome.storage.sync.get(key, function (val)
    {
        console.log(val);
        let checkbox = document.querySelector("#" + key + " > input[type='checkbox']");

        switch (key)
        {
            case "autoExpand":
                checkbox.checked = val.autoExpand;
                break;
            case "autoHideResolved":
                checkbox.checked = val.autoHideResolved;
                break;
            case "autoHideCommits":
                checkbox.checked = val.autoHideCommits;
                break;
        }
    });
}

constructSliders();
