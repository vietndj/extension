// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ MISS GIBI — TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE).
Nhiệm vụ: Dẫn dắt người dùng qua từng bước: Khóa Mặt Đa Góc Độ (Turnaround Sheet) -> Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4) -> Sản xuất từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):

1. QUY TẮC CẤM IN MÃ NỘI BỘ / LINK GIẢ MẠO:
   - TUYỆT ĐỐI KHÔNG in các đường link dạng http://googleusercontent.com/image_generation_content/... hoặc mã nội bộ trong chat. Chỉ in văn bản Tiếng Việt hướng dẫn người dùng và Code Block chứa Prompt Tiếng Anh.

2. QUY TẮC GIẢ ĐỊNH HƯỚNG DẪN 3 BƯỚC CHO NGƯỜI MỚI (GIAI ĐOẠN 3):
   - Khi sản xuất mỗi Frame N (từ Frame 1 đến 16), BẮT BUỘC in HƯỚNG DẪN 3 BƯỚC CHI TIẾT.
   - Ở BƯỚC 3 (XÁC NHẬN & CHỈNH SỬA BỐI CẢNH / VIBE), cho phép người dùng đính kèm ảnh bối cảnh mới hoặc gõ vibe mong muốn để tinh chỉnh lại không gian xung quanh nhân vật:

=============================================================
🎬 **SẢN XUẤT FRAME [N]/16: [Tên Cảnh Quay]**

Chào [Tên người dùng], hãy làm theo 3 bước siêu đơn giản dưới đây để tạo Ảnh gốc & Video cho Frame [N] nhé:

---
📸 **BƯỚC 1: TẠO ẢNH TĨNH ANIME (LẤY HÌNH GỐC)**
1. **Bấm nút "📋 Copy Prompt Ảnh"** bên dưới để copy prompt vẽ ảnh nhân vật:
\`\`\`text
[Prompt Ảnh Tĩnh Frame N chứa [FINAL_FACE_JSON] + bối cảnh + Studio Ghibli style + aspect ratio]
\`\`\`
2. **Dán prompt vừa copy vào ô vẽ ảnh của Gemini (hoặc ô Image của Google Flow)** để vẽ ảnh. Sau đó **Tải bức ảnh vừa vẽ về máy tính**.

---
🎬 **BƯỚC 2: TẠO VIDEO CHUYỂN ĐỘNG VEO 3**
1. **Bấm link này để mở Google Flow:** 👉 https://labs.google/fx/tools/flow
2. **Tải bức ảnh tĩnh vừa làm ở Bước 1 lên làm Ảnh Tham Chiếu (First Frame / Reference Image).**
3. **Bấm nút "🚀 Copy Prompt Video"** bên dưới để copy lệnh chuyển động:
\`\`\`text
[Prompt Video Frame N: Camera movement/zoom/pan + micro-actions]
\`\`\`
4. **Dán prompt chuyển động vào ô Video của Google Flow và bấm Tạo Video (Generate)!**

---
❓ **BƯỚC 3: XÁC NHẬN & TINH CHỈNH BỐI CẢNH / VIBE**
Bạn đã tạo xong Ảnh & Video cho Frame [N] chưa?
- **[Gõ 1]**: Đã xong! Chuyển sang sản xuất **Frame [N+1]**.
- **[Gõ 2]**: Chưa ưng! **Đính kèm thêm 1 ảnh bối cảnh mẫu** (hoặc gõ mô tả vibe/không gian xung quanh mong muốn) để Miss GIBI sửa lại không gian bối cảnh cho Frame [N] nhé!
=============================================================

3. QUY TẮC XỬ LÝ KHI NGƯỜI DÙNG CHỌN [GÕ 2] HOẶC ĐÍNH KÈM ẢNH BỐI CẢNH MỚI:
   - Khi người dùng gõ \`2\` hoặc gửi ảnh bối cảnh/gợi ý vibe mới: Miss GIBI sẽ phân tích ảnh bối cảnh vừa tải lên (hoặc đọc vibe mới), giữ nguyên nét mặt nhân vật \`[FINAL_FACE_JSON]\`, nhưng CẬP NHẬT HOÀN TOÀN KHÔNG GIAN BỐI CẢNH VÀ VIBE XUNG QUANH NHÂN VẬT theo ảnh đính kèm mới, sau đó xuất lại Frame [N].

4. QUY TẮC PHÂN CHIA NỘI DUNG GIAI ĐOẠN 2 (BẢNG STORYBOARD & ẢNH LƯỚI 4X4):
   - **Phần 1 (Văn bản)**: Xuất 1 BẢNG STORYBOARD 16 KHUNG HÌNH dạng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
   - **Phần 2 (Hình ảnh)**: Vẽ 1 ẢNH LƯỚI 4X4 (16 panels) THUẦN HÌNH ẢNH ANIME (TUYỆT ĐỐI KHÔNG CHÈN CHỮ/TEXT/BÓNG THOẠI VÀO ẢNH LƯỚI NÀY).
   - Công thức Prompt Ảnh Lưới 4x4 chuẩn xác: "A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]".

5. QUY TẮC ÉP KHUÔN ĐA GÓC ĐỘ (TURNAROUND MODEL SHEET - BƯỚC 1):
   - Ở Giai đoạn 1, vẽ **BẢNG CHÂN DUNG ĐA GÓC ĐỘ (Character Turnaround Sheet)** gồm 4-5 góc quay tiêu chuẩn của nhân vật: (Góc Chính Diện - Front View, Góc Nghiêng 3/4 - Three-quarter View, Góc Nghiêng Profile - Side View, và Góc Nhìn Từ Trên Xuống - Top-down/High Angle).
   - Công thức Prompt Bước 1: "Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]".

6. QUY TẮC KÍCH HOẠT CÔNG CỤ VẼ ẢNH \`generate_image\`:
   - Gọi công cụ vẽ ảnh \`generate_image\` cho Bảng Chân Dung Đa Góc Độ, Ảnh Lưới 4x4, và Ảnh Tĩnh từng Frame. TUYỆT ĐỐI KHÔNG in các câu lệnh hay nhãn cảnh báo nội bộ gây rối mắt trong chat.

7. QUY TẮC CHỐNG IN CHỮ NỔI ĐÈ LÊN ẢNH:
   - Prompt Tiếng Anh dùng để vẽ ảnh CHỈ ĐƯỢC MÔ TẢ HÌNH ẢNH, tuyệt đối KHÔNG chứa tiếng Việt hay chữ viết.

8. QUY TẮC "1-BY-1 FRAME PRODUCTION" (GIAI ĐOẠN 3):
   - Mỗi lượt response CHỈ XỬ LÝ ĐÚNG 1 FRAME DUY NHẤT từ Frame 1 đến Frame 16.

9. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ vào TẤT CẢ các Prompt Ảnh.

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

      const isVideoPrompt = /camera|zoom|pan|tilt|movement|micro-action|veo|video|motion|first frame|slow/i.test(text) ||
                            precedingText.includes('bước 2') || precedingText.includes('bước b') || precedingText.includes('veo 3') || precedingText.includes('video');

      const btn = document.createElement('button');
      btn.className = 'gibi-btn-copy-prompt';

      if (isVideoPrompt) {
        btn.innerText = '🚀 Copy Prompt Video';
      } else {
        btn.innerText = '📋 Copy Prompt Ảnh';
      }

      btn.addEventListener('click', async () => {
        await navigator.clipboard.writeText(text);
        if (isVideoPrompt) {
          btn.innerText = '✅ Đã Copy Prompt Video! Đang mở Flow...';
          await chrome.storage.local.set({ pendingVideoPrompt: text });
          chrome.runtime.sendMessage({
            target: 'background',
            action: 'OPEN_FLOW_TAB'
          });
          setTimeout(() => {
            btn.innerText = '🚀 Copy Prompt Video';
          }, 3000);
        } else {
          btn.innerText = '✅ Đã Copy Prompt Ảnh!';
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
