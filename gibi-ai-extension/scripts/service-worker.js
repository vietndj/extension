// GIBI AI Service Worker (Background Script)

chrome.runtime.onInstalled.addListener(() => {
  console.log('[GIBI AI] Service Worker Installed');
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((err) => console.error(err));
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'OPEN_SIDE_PANEL') {
    if (sender.tab && sender.tab.windowId) {
      chrome.sidePanel.open({ windowId: sender.tab.windowId })
        .then(() => sendResponse({ success: true }))
        .catch((err) => {
          console.error('[GIBI AI] Failed to open side panel:', err);
          sendResponse({ success: false, error: err.message });
        });
      return true;
    }
  }

  if (message.action === 'OPEN_FLOW_TAB') {
    chrome.tabs.create({ url: 'https://labs.google/fx/vi/tools/flow' });
    sendResponse({ success: true });
    return true;
  }
});
