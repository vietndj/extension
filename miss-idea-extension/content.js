// content.js — Content Script programmatically injected into https://gemini.google.com/* and https://chatgpt.com/*

if (!window.missIdeaListenerRegistered) {
  window.missIdeaListenerRegistered = true;

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "INJECT_PROMPT") {
      injectPrompt(message.prompt)
        .then((detail) => {
          sendResponse({ success: true, detail });
        })
        .catch((err) => {
          console.error("[Miss Idea Coach] Injection failed:", err);
          sendResponse({ success: false, error: err.message });
        });
      return true; // Keep message channel open for async response
    }
  });

  // Start observing the page immediately to report status back to side panel
  startPageObserver();

  console.log("[Miss Idea Coach] Content script successfully loaded & registered.");
}

// ── STATUS MONITORING ──
function startPageObserver() {
  const detectAndReport = () => {
    const text = document.body.innerText || "";
    let step = null;
    
    // Check from the end of the text/newest blocks to match the active step correctly
    if (text.includes("BƯỚC 4") || text.includes("Vòng lặp vô cực") || text.includes("kỷ luật quan trọng hơn động lực")) {
      step = "Vòng lặp vô cực (Bước 4/4) 🔄";
    } else if (text.includes("BƯỚC 3") || text.includes("THANH LỌC NGÔN NGỮ AI") || text.includes("chỉ ra và phân tích cụ thể 7 điểm") || text.includes("hướng tiếp cận mới tự nhiên")) {
      step = "Thanh lọc ngôn từ AI (Bước 3/4) 🧼";
    } else if (text.includes("BƯỚC 2") || text.includes("XUẤT BẢN KỊCH BẢN TALKING HEAD") || text.includes("muốn thanh lọc ngôn ngữ AI")) {
      step = "Kịch bản Talking Head (Bước 2/4) 🎬";
    } else if (text.includes("BƯỚC 1") || text.includes("Đề xuất 5 hướng đi") || text.includes("gõ số phương án")) {
      step = "Phân tích 5 chiến lược (Bước 1/4) 💡";
    }
    
    if (step) {
      chrome.runtime.sendMessage({ action: "UPDATE_STATUS", statusText: step }, () => {
        // Suppress unchecked runtime.lastError warning by reading it
        const err = chrome.runtime.lastError;
      });
    }
  };

  // Run immediately
  setTimeout(detectAndReport, 1000);

  // Monitor DOM changes to catch updates as the chat progresses
  const observer = new MutationObserver(() => {
    detectAndReport();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// ── PROMPT INJECTION LOGIC ──
async function injectPrompt(promptText) {
  const isChatGPT = window.location.hostname.includes("chatgpt.com");

  if (isChatGPT) {
    return await injectChatGPT(promptText);
  } else {
    return await injectGemini(promptText);
  }
}

// ── GEMINI INJECTION ──
async function injectGemini(promptText) {
  const inputEl = document.querySelector('div[contenteditable="true"]');
  if (!inputEl) {
    throw new Error("Không tìm thấy ô nhập liệu Gemini. Đảm bảo bạn đang ở trang chat của Gemini và trang đã tải xong.");
  }

  inputEl.focus();
  inputEl.innerText = promptText;

  inputEl.dispatchEvent(new Event('input', { bubbles: true }));
  inputEl.dispatchEvent(new Event('change', { bubbles: true }));

  await new Promise((resolve) => setTimeout(resolve, 150));

  const sendSelectors = [
    'button[aria-label*="Send"]',
    'button[aria-label*="Gửi"]',
    'button[aria-label*="message"]',
    'button[aria-label*="tin nhắn"]',
    'button.send-button'
  ];

  let sendBtn = null;
  for (const selector of sendSelectors) {
    sendBtn = document.querySelector(selector);
    if (sendBtn) break;
  }

  if (!sendBtn) {
    const buttons = Array.from(document.querySelectorAll('button'));
    sendBtn = buttons.find((btn) => {
      const label = (btn.getAttribute('aria-label') || '').toLowerCase();
      const title = (btn.getAttribute('title') || '').toLowerCase();
      return (
        label.includes('send') ||
        label.includes('gửi') ||
        title.includes('send') ||
        title.includes('gửi')
      );
    });
  }

  if (!sendBtn) {
    const wrapper = inputEl.closest('rich-textarea') || inputEl.parentElement;
    if (wrapper) {
      sendBtn = wrapper.querySelector('button');
    }
  }

  if (!sendBtn) {
    return "Đã điền prompt vào ô nhập liệu thành công! Vui lòng bấm nút Gửi trên giao diện Gemini để bắt đầu.";
  }

  sendBtn.click();
  return "Đã điền và gửi prompt thành công!";
}

// ── CHATGPT INJECTION ──
async function injectChatGPT(promptText) {
  const inputEl = document.querySelector('#prompt-textarea') || 
                  document.querySelector('div[contenteditable="true"]') ||
                  document.querySelector('div[role="textbox"]');

  if (!inputEl) {
    throw new Error("Không tìm thấy ô nhập liệu ChatGPT. Đảm bảo bạn đang ở trang chat và trang đã tải xong.");
  }

  inputEl.focus();
  
  try {
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, promptText);
  } catch (e) {
    inputEl.innerText = promptText;
  }

  inputEl.dispatchEvent(new Event('input', { bubbles: true }));
  inputEl.dispatchEvent(new Event('change', { bubbles: true }));

  await new Promise((resolve) => setTimeout(resolve, 200));

  const sendSelectors = [
    'button[data-testid="send-button"]',
    'button[aria-label*="Send"]',
    'button[aria-label*="Gửi"]',
    'button[class*="send"]',
    'button.mb-1.5'
  ];

  let sendBtn = null;
  for (const selector of sendSelectors) {
    sendBtn = document.querySelector(selector);
    if (sendBtn) break;
  }

  if (!sendBtn) {
    const buttons = Array.from(document.querySelectorAll('button'));
    sendBtn = buttons.find((btn) => {
      const aria = (btn.getAttribute('aria-label') || '').toLowerCase();
      const testid = (btn.getAttribute('data-testid') || '').toLowerCase();
      return aria.includes('send') || aria.includes('gửi') || testid.includes('send');
    });
  }

  if (!sendBtn) {
    return "Đã điền prompt vào ô nhập liệu ChatGPT! Vui lòng bấm nút gửi thủ công.";
  }

  sendBtn.click();
  return "Đã điền và gửi prompt sang ChatGPT thành công!";
}
