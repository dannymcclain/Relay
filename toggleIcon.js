if(window.matchMedia('(prefers-color-scheme: dark)')) {
    chrome.runtime.sendMessage({scheme: "dark"});
}