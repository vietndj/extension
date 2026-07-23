// GIBI AI Content Script for Google Flow (labs.google/fx/tools/flow)

(function () {
  console.log('[GIBI AI] Content Script Loaded on Google Flow (Veo 3)');

  // Auto-fill video prompt from storage if present
  async function checkAndAutoFillPrompt() {
    const { pendingVideoPrompt } = await chrome.storage.local.get('pendingVideoPrompt');
    if (!pendingVideoPrompt) return;

    // Search for Google Flow / Veo 3 prompt input textarea
    const promptSelectors = [
      'textarea[placeholder*="prompt"]',
      'textarea[aria-label*="prompt"]',
      'textarea',
      'div[contenteditable="true"]'
    ];

    let promptInput = null;
    for (const selector of promptSelectors) {
      promptInput = document.querySelector(selector);
      if (promptInput) break;
    }

    if (promptInput) {
      promptInput.focus();
      if (promptInput.tagName === 'TEXTAREA') {
        promptInput.value = pendingVideoPrompt;
      } else {
        promptInput.innerText = pendingVideoPrompt;
      }
      promptInput.dispatchEvent(new Event('input', { bubbles: true }));
      promptInput.dispatchEvent(new Event('change', { bubbles: true }));

      // Clear pending prompt so it doesn't auto-fill again repeatedly
      await chrome.storage.local.remove('pendingVideoPrompt');

      // Toast notification
      showToast('🚀 GIBI AI: Đã tự động dán Prompt Video Veo 3!');
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: #f5a623;
      color: #1e1e2e;
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 13px;
      padding: 10px 18px;
      border-radius: 8px;
      box-shadow: 0 8px 24px rgba(245, 166, 35, 0.4);
      transition: opacity 0.4s ease;
    `;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  // Check on page load and interval for SPA navigation
  if (document.readyState === 'complete') {
    checkAndAutoFillPrompt();
  } else {
    window.addEventListener('load', checkAndAutoFillPrompt);
  }

  setInterval(checkAndAutoFillPrompt, 2000);
})();
