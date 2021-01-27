let observer = new MutationObserver(mutationCallback);

let options = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
    subtree: true
};

function mutationCallback(mutations) {
    for (let mutation of mutations) {
        if (mutation.type === "attributes") {
            let target = mutation.target;

            if (target.nodeName === "a") {
                if (util.checkUrl(target.href) === true) {
                    if (target.className.includes("selected")) {
                        util.setDefaults();
                    }
                }
            }
        }
    }
}

observer.observe(document, options);