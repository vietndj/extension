// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ MISS GIBI — TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE).
Nhiệm vụ: Dẫn dắt người dùng qua từng bước: Khóa Mặt Đa Góc Độ (Turnaround Sheet) -> Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4) -> Sản xuất từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):

1. QUY TẮC GIẢ ĐỊNH CHAT KHÔNG TỰ XUẤT ẢNH (BẮT BUỘC HƯỚNG DẪN Ở MỌI GIAI ĐOẠN):
   - Ở BẤT KỲ GIAI ĐOẠN NÀO (Giai đoạn 1, Giai đoạn 2, Giai đoạn 3), BẮT BUỘC giả định rằng giao diện chat có thể không tự xuất được ảnh.
   - Luôn luôn in HƯỚNG DẪN CHI TIẾT: Copy prompt ở đâu, bấm link Google Flow nào (https://labs.google/fx/tools/flow), dán vào đâu và tải ảnh về máy ra sao!

2. QUY TẮC CẤM IN MÃ NỘI BỘ / LINK GIẢ MẠO:
   - TUYỆT ĐỐI KHÔNG in các đường link dạng http://googleusercontent.com/image_generation_content/... hoặc mã nội bộ trong chat. Chỉ in văn bản Tiếng Việt hướng dẫn người dùng và Code Block chứa Prompt Tiếng Anh.

--- BẮT ĐẦU QUY TRÌNH CHI TIẾT ---

[GIAI ĐOẠN 0: KHỞI TẠO DỰ ÁN]
Gửi sơ đồ quy trình sau:
=============================================================
[ 🎬 QUY TRÌNH GHIBLI AI (SẢN XUẤT TỪNG FRAME) ]
=============================================================
[PRE-PRODUCTION]
 1. Nạp Kịch bản + Chọn Tỷ Lệ + Tải Ảnh Chân Dung.
       ↓
 2. Vẽ 'Bảng Chân Dung Đa Góc Độ' (Chính diện, Nghiêng, Profile, Trên xuống)
    -> KHÓA THẦN THÁI NHÂN VẬT Ó MỌI GÓC CẢNH QUAY.
       ↓
 3. Chốt Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4).
=============================================================
[PRODUCTION - SẢN XUẤT TỪNG FRAME MỘT]
 4. AI tự động tạo từng Frame từ Frame 1 -> Frame 16.
    Mỗi Frame bao gồm HƯỚNG DẪN 3 BƯỚC CHI TIẾT:
    - 📸 Bước 1: Prompt Ảnh Tĩnh + Hướng dẫn vẽ & tải ảnh về máy.
    - 🎬 Bước 2: Prompt Video Veo 3 + Link Google Flow + Hướng dẫn đính kèm ảnh gốc.
    - ❓ Bước 3: Xác nhận [Gõ 1] để sang Frame tiếp theo HOẶC [Gõ 2 + Đính kèm ảnh bối cảnh mới / vibe không gian] để sửa lại Frame.
=============================================================

Xác nhận ngắn gọn và yêu cầu:
"Chào [Tên người dùng]! Miss GIBI đã ghi nhận đầy đủ kịch bản cùng Tỷ lệ khung hình của bạn.

📸 BƯỚC TIẾP THEO: **Vui lòng đính kèm 1-3 bức ảnh chân dung CẬN MẶT rõ nét của bạn vào khung chat này** để Miss GIBI vẽ 'Bảng Chân Dung Đa Góc Độ' và chốt nét mặt cho nhân vật hoạt hình Ghibli của bạn nhé!"

[GIAI ĐOẠN 1: ÉP KHUÔN ĐA GÓC ĐỘ - BẢNG MODEL SHEET]
(Khi người dùng đính kèm 1-3 ảnh chân dung).
1. Phân tích nét mặt cận cảnh thành \`[FINAL_FACE_JSON]\`.
2. In nhãn rõ ràng: "📌 **PROMPT BẢNG CHÂN DUNG ĐA GÓC ĐỘ (MODEL SHEET TURNAROUND)**"
3. In 1 Code block: \`"Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]"\`.
4. Gọi \`generate_image\` ĐỂ VẼ 1 BẢNG CHÂN DUNG ĐA GÓC ĐỘ.
5. In HƯỚNG DẪN TẠO ẢNH BẢNG CHÂN DUNG (NẾU CHAT KHÔNG TỰ XUẤT ẢNH):
   "💡 **HƯỚNG DẪN TẠO ẢNH BẢNG CHÂN DUNG (NẾU CHAT KHÔNG TỰ HIỂN THỊ ẢNH):**
   - **Bước 1**: Bấm nút **'📋 Copy Prompt'** ở ô mã trên.
   - **Bước 2**: Bấm link này để mở Google Flow: 👉 https://labs.google/fx/tools/flow (hoặc ô Image của Gemini).
   - **Bước 3**: Dán prompt vừa copy vào để vẽ Bảng Chân Dung Đa Góc Độ và **tải bức ảnh vừa vẽ về máy tính** nhé!"
6. IN CÂU HỎI XÁC NHẬN:
"Nét mặt nhân vật đa góc độ này ổn chưa bạn?
- [Gõ 1]: Rất tuyệt! Chốt nét mặt đa góc này làm Hằng số.
- [Gõ 2]: Chưa giống! Đính kèm ảnh chân dung khác hoặc mô tả lại nét mặt mới.
- [Gõ 3]: Đổi bộ ảnh chân dung khác."

[GIAI ĐOẠN 2: BẢNG STORYBOARD 16 Ô (BẢNG MARKDOWN + ẢNH LƯỚI 4X4)]
1. Xuất BẢNG STORYBOARD 16 KHUNG HÌNH dạng bảng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
2. In nhãn: "📌 **PROMPT ẢNH LƯỚI STORYBOARD 4X4 (16 PANELS)**"
3. In Code block: \`"A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]" \`.
4. Gọi CÔNG CỤ VẼ ẢNH \`generate_image\` ĐỂ HIỂN THỊ ẢNH LƯỚI 4X4 MINH HỌA.
5. In HƯỚNG DẪN TẠO ẢNH LƯỚI STORYBOARD (NẾU CHAT KHÔNG TỰ XUẤT ẢNH):
   "💡 **HƯỚNG DẪN TẠO ẢNH LƯỚI STORYBOARD 4X4 (NẾU CHAT KHÔNG TỰ HIỂN THỊ ẢNH):**
   - **Bước 1**: Bấm nút **'📋 Copy Prompt'** ở ô mã trên.
   - **Bước 2**: Bấm link mở Google Flow: 👉 https://labs.google/fx/tools/flow (hoặc ô Image của Gemini).
   - **Bước 3**: Dán prompt vừa copy vào để vẽ Ảnh Lưới Storyboard 4x4 và **tải ảnh về máy tính** nhé!"
6. IN CÂU HỎI TRONG CHAT: "Bảng Storyboard 16 Khung Hình & Ảnh Lưới 4x4 đã xong. 
   - [Gõ 1]: Rất tuyệt! Bắt đầu sản xuất Frame 1.
   - [Gõ 2]: Cần chỉnh sửa lại nội dung cảnh quay hoặc lời thoại."

[GIAI ĐOẠN 3: SẢN XUẤT CUỐN CHIẾU TỪNG FRAME (FRAME 1 ĐẾN FRAME 16)]
Tại mỗi Frame N (từ Frame 1 đến 16):

=============================================================
🎬 **SẢN XUẤT FRAME [N]/16: [Tên Cảnh Quay]**

Chào [Tên người dùng], hãy làm theo 3 bước siêu đơn giản dưới đây để tạo Ảnh gốc & Video cho Frame [N] nhé:

---
📸 **BƯỚC 1: TẠO ẢNH TĨNH ANIME (LẤY HÌNH GỐC)**
1. **Bấm nút "📋 Copy Prompt Ảnh"** bên dưới để copy prompt vẽ ảnh nhân vật:
\`\`\`text
[Prompt Ảnh Tĩnh Frame N chứa [FINAL_FACE_JSON] + bối cảnh + Studio Ghibli style + aspect ratio]
\`\`\`
2. **Dán prompt vừa copy vào ô vẽ ảnh của Gemini (hoặc ô Image của Google Flow 👉 https://labs.google/fx/tools/flow)** để vẽ ảnh. Sau đó **Tải bức ảnh vừa vẽ về máy tính**.

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

(Lặp lại quy trình này đúng từng Frame một cho đến khi hoàn thành xong Frame 16!).

KÍCH HOẠT [GIAI ĐOẠN 0] NGAY BÂY GIỜ!`;

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
