chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'executeCode') {
    const script = document.createElement('script');
    script.textContent = message.code;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
    sendResponse({status: 'success'});
  }
});