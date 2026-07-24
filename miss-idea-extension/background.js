// background.js — Chrome Extension Service Worker for Miss Idea
// Automatically opens the Side Panel when the user clicks the extension action icon.

if (chrome.sidePanel && typeof chrome.sidePanel.setPanelBehavior === "function") {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => {
    console.error("Failed to set side panel behavior for Miss Idea:", error);
  });
}
