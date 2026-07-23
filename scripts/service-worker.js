// GIBI AI Service Worker (Manifest V3)

// Enable opening side panel when user clicks action icon
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((err) => {
    console.error('Failed to set side panel behavior:', err);
  });
});

// Fallback listener for action click if setPanelBehavior is unavailable
chrome.action.onClicked.addListener(async (tab) => {
  if (tab.windowId) {
    try {
      await chrome.sidePanel.open({ windowId: tab.windowId });
    } catch (err) {
      console.error('Failed to open side panel:', err);
    }
  }
});

// Message relay bridge between SidePanel and Content Scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PING') {
    sendResponse({ status: 'PONG', source: 'service-worker' });
    return false;
  }
  
  if (message.target === 'background') {
    (async () => {
      try {
        if (message.action === 'OPEN_FLOW_TAB') {
          const tab = await chrome.tabs.create({ url: 'https://labs.google/fx/tools/flow', active: true });
          sendResponse({ success: true, tabId: tab.id });
        } else {
          sendResponse({ success: false, error: 'Unknown background action' });
        }
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true; // Keep message channel open for async response
  }
});
