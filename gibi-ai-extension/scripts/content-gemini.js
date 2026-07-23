// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  // Inject Floating Studio Badge on Gemini Header
  function injectStudioBadge() {
    if (document.getElementById('gibi-studio-badge')) return;

    const badge = document.createElement('div');
    badge.id = 'gibi-studio-badge';
    badge.innerHTML = `
      <div class="gibi-badge-content">
        <span class="gibi-badge-icon">🎬</span>
        <span class="gibi-badge-title">GIBI Studio Active</span>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #gibi-studio-badge {
        position: fixed;
        top: 14px;
        right: 80px;
        z-index: 9999;
        background: linear-gradient(135deg, #1e1e2e 0%, #2a2a40 100%);
        border: 1px solid #f5a623;
        box-shadow: 0 4px 15px rgba(245, 166, 35, 0.25);
        border-radius: 20px;
        padding: 6px 14px;
        color: #f5a623;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
      }
      #gibi-studio-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(245, 166, 35, 0.4);
      }
      .gibi-badge-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .gibi-btn-copy-prompt {
        background: rgba(245, 166, 35, 0.15) !important;
        border: 1px solid #f5a623 !important;
        color: #f5a623 !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        padding: 4px 10px !important;
        border-radius: 6px !important;
        cursor: pointer !important;
        margin-top: 6px !important;
        margin-left: 8px !important;
        transition: all 0.2s !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 4px !important;
      }
      .gibi-btn-copy-prompt:hover {
        background: rgba(245, 166, 35, 0.3) !important;
        transform: translateY(-1px) !important;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(badge);

    badge.addEventListener('click', () => {
      alert('GIBI AI Studio đang hoạt động trên trang Gemini Chat!');
    });
  }

  // Inject Prompt into Gemini Input Box & Click Send
  async function injectPromptIntoGemini(promptText) {
    const inputSelectors = [
      'rich-textarea p',
      'rich-textarea [contenteditable="true"]',
      'rich-textarea .ql-editor',
      'div[contenteditable="true"]',
      'textarea[aria-label*="Prompt"]',
      'textarea[aria-label*="nhập"]',
      'textarea'
    ];

    let inputEl = null;
    for (const selector of inputSelectors) {
      inputEl = document.querySelector(selector);
      if (inputEl && inputEl.offsetWidth > 0) break;
    }

    if (!inputEl) {
      return { success: false, error: 'Không tìm thấy ô nhập liệu của Gemini.' };
    }

    inputEl.focus();

    if (inputEl.tagName === 'P' || inputEl.isContentEditable) {
      inputEl.innerHTML = promptText.replace(/\n/g, '<br>');
    } else {
      inputEl.value = promptText;
    }

    inputEl.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));
    inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    inputEl.dispatchEvent(new Event('change', { bubbles: true }));

    await new Promise((resolve) => setTimeout(resolve, 350));

    const sendBtnSelectors = [
      'button[aria-label*="Send"]',
      'button[aria-label*="Gửi"]',
      'button.send-button',
      '.send-button-container button',
      'button[mat-icon-button]',
      'button.send-button-icon'
    ];

    let sendBtn = null;
    for (const selector of sendBtnSelectors) {
      const btns = Array.from(document.querySelectorAll(selector));
      sendBtn = btns.find((b) => !b.disabled && b.offsetWidth > 0);
      if (sendBtn) break;
    }

    if (sendBtn) {
      sendBtn.click();
      return { success: true, action: 'SENT' };
    } else {
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true
      });
      inputEl.dispatchEvent(enterEvent);
      return { success: true, action: 'ENTER_DISPATCHED' };
    }
  }

  // Extract Voiceover Script from Gemini Output
  function extractVoiceoverLines() {
    const textNodes = Array.from(document.querySelectorAll('message-content, .model-response-text, .markdown'));
    const voiceoverLines = [];

    textNodes.forEach((node) => {
      const text = node.innerText || node.textContent || '';
      const regex = /(?:🗣️\s*\*?\*?Thoại:\*?\*?\s*["“]?([^"”\n]+)["”]?)/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match[1] && match[1].trim()) {
          voiceoverLines.push(match[1].trim());
        }
      }
    });

    return voiceoverLines;
  }

  // Smart Codeblock Filter: Exclude diagrams, distinguish Image vs Video Prompt
  function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code, pre, .code-block-decoration');
    codeBlocks.forEach((block) => {
      if (block.dataset.gibiEnhanced) return;

      const text = (block.innerText || block.textContent || '').trim();

      if (!text || text.includes('[ 🎬 QUY TRÌNH') || text.includes('=================') || text.includes('[PRE-PRODUCTION]')) {
        block.dataset.gibiEnhanced = 'true';
        return;
      }

      const isPrompt = /aspect ratio|ghibli|close-up|camera|frame|veo|cinematic|portrait|grid/i.test(text);
      if (!isPrompt) return;

      block.dataset.gibiEnhanced = 'true';

      const parentPre = block.closest('pre') || block.parentElement;
      if (!parentPre) return;

      if (parentPre.querySelector('.gibi-btn-copy-prompt')) return;

      const btn = document.createElement('button');
      btn.className = 'gibi-btn-copy-prompt';

      const isVideoPrompt = /camera movement|micro-action|video prompt|veo 3|first frame/i.test(text);

      if (isVideoPrompt) {
        btn.innerText = '🚀 Copy & Send to Veo 3';
      } else {
        btn.innerText = '📋 Copy Prompt';
      }

      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(text);
        if (isVideoPrompt) {
          await chrome.storage.local.set({ pendingVideoPrompt: text });
          chrome.runtime.sendMessage({
            target: 'background',
            action: 'OPEN_FLOW_TAB'
          });
        } else {
          btn.innerText = '✅ Đã Copy!';
          setTimeout(() => {
            btn.innerText = '📋 Copy Prompt';
          }, 2000);
        }
      });

      parentPre.appendChild(btn);
    });
  }

  const observer = new MutationObserver(() => {
    enhanceCodeBlocks();
  });

  // Listen for messages from Side Panel
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'INJECT_PROMPT') {
      injectPromptIntoGemini(message.promptText).then((res) => sendResponse(res));
      return true;
    }

    if (message.action === 'EXTRACT_VOICEOVER') {
      const lines = extractVoiceoverLines();
      sendResponse({ success: true, lines });
      return false;
    }
  });

  // Init
  if (document.readyState === 'complete') {
    injectStudioBadge();
    enhanceCodeBlocks();
  } else {
    window.addEventListener('load', () => {
      injectStudioBadge();
      enhanceCodeBlocks();
    });
  }

  observer.observe(document.body, { childList: true, subtree: true });
})();
