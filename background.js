chrome.runtime.onInstalled.addListener(() => {
    // Set initial tool configurations if necessary
    chrome.storage.sync.set({ tools: {} });
});

chrome.webNavigation.onCompleted.addListener(details => {
    // Get the tool configurations
    chrome.storage.sync.get('tools', data => {
        const tools = data.tools;
        // Iterate through the tools and apply the enabled ones
        for (const toolId in tools) {
            if (tools[toolId].enabled) {
                const code = tools[toolId].jsCode;
                chrome.tabs.executeScript(details.tabId, { code });
            }
        }
    });
});

// Listen for messages from the popup to update the tool configurations
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'runEnabledTools') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            const tabId = tabs[0].id;
            for (const toolId in message.tools) {
                const code = message.tools[toolId].jsCode;
                chrome.tabs.executeScript(tabId, { code });
            }
        });
    }
    if (message.action === 'updateTools') {
        chrome.storage.sync.set({ tools: message.tools });
    }
});
