chrome.runtime.onMessage.addListener(function(request) {
    if (request.scheme == "dark" )
        chrome.browserAction.setIcon({
            path: {
                "16": "icons/icon-16-dark.png",
                "32": "icons/icon-32-dark.png",
                "48": "icons/icon-48-dark.png",
                "96": "icons/icon-96-dark.png",
                "128": "icons/icon-128-dark.png",
                "256": "icons/icon-256-dark.png"
            }
        });
    });