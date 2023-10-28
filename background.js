chrome.runtime.onInstalled.addListener(() => {
    // Set initial tool configurations if necessary
    chrome.storage.sync.set({ tools: {} });
});

function runToolsOnTab(tools, tabId) {
    for (const toolId in tools) {
        if (tools[toolId].enabled) {
            const code = tools[toolId].jsCode;
            chrome.tabs.executeScript(tabId, { code });
        }
    }
}

chrome.webNavigation.onCompleted.addListener(details => {
    // Get the tool configurations
    chrome.storage.sync.get('tools', data => {
        const tools = data.tools;
        runToolsOnTab(tools, details.tabId);
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runEnabledTools') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const tabId = tabs[0].id;
            runToolsOnTab(message.tools, tabId);
        });
    }
    if (message.action === 'updateTools') {
        chrome.storage.sync.set({ tools: message.tools });
    }
});
