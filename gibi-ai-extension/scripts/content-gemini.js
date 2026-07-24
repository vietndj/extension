// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ MISS GIBI — TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE).
Nhiệm vụ: Dẫn dắt người dùng qua từng bước: Khóa Mặt Đa Góc Độ (Turnaround Sheet) -> Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4) -> Sản xuất từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. QUY TẮC NHÃN RÕ RÀNG VÀ DỄ HIỂU CHO NGƯỜI DÙNG LẦN ĐẦU (GIAI ĐOẠN 3):
   - Khi sản xuất mỗi Frame N (từ Frame 1 đến 16), BẮT BUỘC ghi rõ hướng dẫn cực kỳ dễ hiểu kèm LINK TRỰC TIẾP TỚI GOOGLE FLOW như sau:

     📌 **BƯỚC A: PROMPT TẠO ẢNH TĨNH ANIME (FRAME [N])**
     *(Dùng prompt bên dưới để vẽ ảnh tĩnh nhân vật, hoặc bấm nút Copy Prompt)*
     \`\`\`text
     [Prompt Ảnh Tĩnh chứa nét mặt + bối cảnh]
     \`\`\`

     🎬 **BƯỚC B: PROMPT TẠO VIDEO CHUYỂN ĐỘNG VEO 3 (FRAME [N])**
     *(Bấm nút "🚀 Copy & Mở Google Flow" bên dưới, hoặc bấm link 👉 https://labs.google/fx/tools/flow để sang Google Flow tự tạo Video 5s)*
     \`\`\`text
     Camera zoom/pan: ... Micro-action: ...
     \`\`\`
     👉 **Link Tới Google Flow Tạo Video Veo 3:** https://labs.google/fx/tools/flow

2. QUY TẮC PHÂN CHIA NỘI DUNG GIAI ĐOẠN 2 (BẢNG STORYBOARD & ẢNH LƯỚI 4X4):
   - **Phần 1 (Văn bản)**: Xuất 1 BẢNG STORYBOARD 16 KHUNG HÌNH dạng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
   - **Phần 2 (Hình ảnh)**: Vẽ 1 ẢNH LƯỚI 4X4 (16 panels) THUẦN HÌNH ẢNH ANIME (TUYỆT ĐỐI KHÔNG CHÈN CHỮ/TEXT/BÓNG THOẠI VÀO ẢNH LƯỚI NÀY).
   - Công thức Prompt Ảnh Lưới 4x4 chuẩn xác: "A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]".

3. QUY TẮC ÉP KHUÔN ĐA GÓC ĐỘ (TURNAROUND MODEL SHEET - BƯỚC 1):
   - Ở Giai đoạn 1, vẽ **BẢNG CHÂN DUNG ĐA GÓC ĐỘ (Character Turnaround Sheet)** gồm 4-5 góc quay tiêu chuẩn của nhân vật: (Góc Chính Diện - Front View, Góc Nghiêng 3/4 - Three-quarter View, Góc Nghiêng Profile - Side View, và Góc Nhìn Từ Trên Xuống - Top-down/High Angle).
   - Công thức Prompt Bước 1: "Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]".

4. QUY TẮC BẮT BUỘC KÍCH HOẠT CÔNG CỤ VẼ ẢNH \`generate_image\`:
   - BẮT BUỘC gọi công cụ vẽ ảnh \`generate_image\` cho Bảng Chân Dung Đa Góc Độ, Ảnh Lưới 4x4, và Ảnh Tĩnh từng Frame. TUYỆT ĐỐI KHÔNG in các câu lệnh nội bộ hay đường link text giả mạo trong chat.

5. QUY TẮC CHỐNG IN CHỮ NỔI ĐÈ LÊN ẢNH:
   - Prompt Tiếng Anh dùng để vẽ ảnh CHỈ ĐƯỢC MÔ TẢ HÌNH ẢNH, tuyệt đối KHÔNG chứa tiếng Việt hay chữ viết.

6. QUY TẮC "1-BY-1 FRAME PRODUCTION" (GIAI ĐOẠN 3):
   - Mỗi lượt response CHỈ XỬ LÝ ĐÚNG 1 FRAME DUY NHẤT từ Frame 1 đến Frame 16.

7. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ vào TẤT CẢ các Prompt Ảnh.

--- BẮT ĐẦU QUY TRÌNH ---`;

  // Inject Prompt into Gemini Input Box with Native execCommand
  async function injectPromptIntoGemini(promptText) {
    console.log('[GIBI AI] Attempting prompt injection into Gemini...');

    const inputSelectors = [
      'div[contenteditable="true"]',
      'rich-textarea p',
      'rich-textarea [contenteditable="true"]',
      'rich-textarea .ql-editor',
      'textarea[aria-label*="Prompt"]',
      'textarea[aria-label*="nhập"]',
      'textarea'
    ];

    let inputEl = null;

    for (let i = 0; i < 10; i++) {
      for (const selector of inputSelectors) {
        inputEl = document.querySelector(selector);
        if (inputEl && inputEl.offsetWidth > 0) break;
      }
      if (inputEl) break;
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    if (!inputEl) {
      console.error('[GIBI AI] Gemini input element not found.');
      return { success: false, error: 'Không tìm thấy ô nhập liệu của Gemini.' };
    }

    inputEl.focus();

    let insertedSuccess = false;
    try {
      document.execCommand('selectAll', false, null);
      insertedSuccess = document.execCommand('insertText', false, promptText);
    } catch (e) {
      console.warn('[GIBI AI] execCommand failed, falling back to innerText/value', e);
    }

    if (!insertedSuccess) {
      if (inputEl.tagName === 'P' || inputEl.isContentEditable) {
        inputEl.innerText = promptText;
      } else {
        inputEl.value = promptText;
      }
    }

    ['input', 'change', 'blur'].forEach((evtName) => {
      inputEl.dispatchEvent(new Event(evtName, { bubbles: true }));
    });
    inputEl.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));

    await new Promise((resolve) => setTimeout(resolve, 300));

    const sendSelectors = [
      'button[aria-label*="Gửi"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="gửi"]',
      'button[aria-label*="send"]',
      'button[aria-label*="Submit"]',
      'button.send-button',
      '.send-button-container button',
      'rich-textarea + button'
    ];

    let sendBtn = null;
    for (const selector of sendSelectors) {
      const btns = Array.from(document.querySelectorAll(selector));
      sendBtn = btns.find((b) => b.offsetWidth > 0);
      if (sendBtn) break;
    }

    if (!sendBtn) {
      const inputContainer = inputEl.closest('form, .input-area, .chat-input-container, rich-textarea') || document.body;
      const allBtns = Array.from(inputContainer.querySelectorAll('button'));
      sendBtn = allBtns.find((b) => {
        const aria = (b.getAttribute('aria-label') || '').toLowerCase();
        const title = (b.getAttribute('title') || '').toLowerCase();
        return (aria.includes('gửi') || aria.includes('send') || title.includes('gửi') || title.includes('send')) && b.offsetWidth > 0;
      });
    }

    if (sendBtn) {
      sendBtn.removeAttribute('disabled');
      sendBtn.setAttribute('aria-disabled', 'false');
      sendBtn.click();
      console.log('[GIBI AI] Prompt injected and Send button clicked successfully!');
      return { success: true, action: 'SENT' };
    } else {
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
      });
      inputEl.dispatchEvent(enterEvent);
      console.log('[GIBI AI] Prompt injected, fallback Enter event dispatched.');
      return { success: true, action: 'ENTER_DISPATCHED' };
    }
  }

  // Enhanced Codeblock Filter: 100% Robust Video Prompt detection + Direct Flow Button
  function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code, pre, .code-block-decoration');
    codeBlocks.forEach((block) => {
      if (block.dataset.gibiEnhanced) return;

      const text = (block.innerText || block.textContent || '').trim();

      if (!text || text.includes('[ 🎬 QUY TRÌNH') || text.includes('=================') || text.includes('[PRE-PRODUCTION]')) {
        block.dataset.gibiEnhanced = 'true';
        return;
      }

      const isPrompt = /aspect ratio|ghibli|close-up|camera|frame|veo|cinematic|portrait|grid|zoom|pan|motion/i.test(text);
      if (!isPrompt) return;

      block.dataset.gibiEnhanced = 'true';

      const parentPre = block.closest('pre') || block.parentElement;
      if (!parentPre) return;

      if (parentPre.querySelector('.gibi-btn-copy-prompt')) return;

      const precedingText = (parentPre.previousElementSibling?.innerText || parentPre.parentElement?.innerText || '').toLowerCase();
      
      // Robust detection: matches keywords in block OR in surrounding section title (Bước B / Video / Veo 3)
      const isVideoPrompt = /camera|zoom|pan|tilt|movement|micro-action|veo|video|motion|first frame|slow/i.test(text) ||
                            precedingText.includes('bước b') || precedingText.includes('veo 3') || precedingText.includes('video prompt');

      const btn = document.createElement('button');
      btn.className = 'gibi-btn-copy-prompt';

      if (isVideoPrompt) {
        btn.innerText = '🚀 Copy & Mở Google Flow';
      } else {
        btn.innerText = '📋 Copy Prompt Ảnh';
      }

      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(text);
        if (isVideoPrompt) {
          btn.innerText = '✅ Đã Copy Prompt! Đang mở Flow...';
          await chrome.storage.local.set({ pendingVideoPrompt: text });
          chrome.runtime.sendMessage({
            target: 'background',
            action: 'OPEN_FLOW_TAB'
          });
          setTimeout(() => {
            btn.innerText = '🚀 Copy & Mở Google Flow';
          }, 3000);
        } else {
          btn.innerText = '✅ Đã Copy!';
          setTimeout(() => {
            btn.innerText = '📋 Copy Prompt Ảnh';
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
  });

  // Init
  if (document.readyState === 'complete') {
    enhanceCodeBlocks();
  } else {
    window.addEventListener('load', () => {
      enhanceCodeBlocks();
    });
  }

  observer.observe(document.body, { childList: true, subtree: true });
})();
