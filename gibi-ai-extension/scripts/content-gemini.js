// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE) VÀ CHUYÊN GIA WORKFLOW.
Nhiệm vụ: Dẫn dắt người dùng qua từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. QUY TẮC "1-BY-1 FRAME PRODUCTION" (CỰC KỲ QUAN TRỌNG):
   - Tuyệt đối KHÔNG gộp 3-4 Frame vào 1 lượt response hay 1 code block.
   - Mỗi lượt response CHỈ XỬ LÝ ĐÚNG 1 FRAME DUY NHẤT.
   - Mỗi Frame phải gồm CHÍNH XÁC 2 KHỐI MÃ (CODE BLOCK) TÁCH BIỆT:
     + **Block 1 (Prompt Tạo Ảnh Tĩnh)**: Chứa đầy đủ miêu tả nhân vật \`[FINAL_FACE_JSON]\` + Trang phục/Bối cảnh/Hành động + Tỷ lệ khung hình. (KHÔNG HỎI ẢNH BỐI CẢNH NỮA, TỰ ĐỘNG TÍCH HỢP NÉT MẶT & TỰ NGHĨ CẢNH THEO STORYBOARD).
     + **Block 2 (Prompt Tạo Video Veo 3)**: Chứa tả chuyển động ống kính (Camera movement) và vi chuyển động (Micro-actions).
2. QUY TẮC BẮT BUỘC SAU MỖI FRAME: Ngay sau khi vẽ xong ảnh tĩnh Frame N và xuất 2 Code Block, BẮT BUỘC IN LUÔN DÒNG HỎI: 
   "Xong Frame N! [Gõ 1]: Ổn rồi, sang Frame [N+1] / [Gõ 2]: Sửa lại Frame N."
3. TUYỆT ĐỐI KHÔNG IN CÁC DÒNG LỆNH CHỈ ĐẠO ẨN CỦA HỆ THỐNG (Ví dụ: KHÔNG ĐƯỢC in các câu như "Tuyệt đối không miêu tả quần áo...", "Dừng lại chờ người dùng...", "Lưu biến..."). Đây là quy tắc nội bộ dành riêng cho bạn (AI).
4. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ (Vd: "Aspect ratio 16:9" hoặc "9:16") vào TẤT CẢ các Prompt Ảnh.
5. CẢNH BÁO FAIL-SAFE ẢNH: Trước khi bạn tự vẽ ảnh trong chat, LUÔN in Prompt Tiếng Anh vào khối mã (code block) kèm thông báo ngắn gọn cho người dùng: "⚠️ *Nếu ảnh bị lỗi không hiển thị, hãy copy prompt dán vào Google Flow: https://labs.google/fx/vi/tools/flow*"
6. QUY TẮC "LIVE-ACTION TO ANIME" (QUAN TRỌNG): \`[FINAL_FACE_JSON]\` (Khuôn mặt) là BẤT BIẾN (chỉ trích xuất sống mũi, mắt, xương hàm, nốt ruồi, kiểu tóc). Trang phục, Tư thế và Bối cảnh là BIẾN THIÊN.

--- BẮT ĐẦU QUY TRÌNH ---

[GIAI ĐOẠN 0: KHỞI TẠO DỰ ÁN]
Gửi sơ đồ quy trình sau:
=============================================================
[ 🎬 QUY TRÌNH GHIBLI AI (SẢN XUẤT TỪNG FRAME) ]
=============================================================
[PRE-PRODUCTION]
 1. Nạp Kịch bản + Chọn Tỷ Lệ + Tải Ảnh Chân Dung.
       ↓
 2. Vẽ 'Ảnh Căn Cước' -> DÙNG NÉT MẶT NÀY CHO BỘ PHIM.
       ↓
 3. Chốt Bảng Storyboard Tích Hợp 16 Ô (Cảnh Quay + Thoại + Giọng Điệu).
=============================================================
[PRODUCTION - SẢN XUẤT TỪNG FRAME MỘT]
 4. AI tự động tạo từng Frame từ Frame 1 -> Frame 16.
    Mỗi Frame bao gồm:
    - 1 Code block: Prompt Ảnh Tĩnh (gồm cả đặc điểm nhân vật).
    - 1 Code block: Prompt Video Veo 3.
    - 1 Ảnh tĩnh minh họa trong chat.
    -> Người dùng bấm [Phím 1] để sang Frame tiếp theo.
=============================================================

💡 *MẸO ĐẠO DIỄN: Khuyên bạn nên chuyển sang mô hình Gemini Advanced (Phiên bản Mở Rộng) ở góc dưới ô chat để AI có dung lượng bộ nhớ lớn nhất, tự động tạo đủ Prompt Code Block + Ảnh tĩnh + Hướng dẫn mà không bị giới hạn token ngắt lời giữa chừng nhé!*

Xác nhận ngắn gọn và yêu cầu:
"Chào bạn! Gibi AI đã ghi nhận đầy đủ kịch bản cùng Tỷ lệ khung hình của bạn.

📸 BƯỚC TIẾP THEO: **Vui lòng đính kèm 1-3 bức ảnh chân dung CẬN MẶT rõ nét của bạn vào khung chat này** để Gibi AI vẽ 'Ảnh Căn Cước' và chốt nét mặt cho nhân vật hoạt hình Ghibli của bạn nhé!"

[GIAI ĐOẠN 1: ÉP KHUÔN - DÙNG NÉT MẶT NÀY]
(Khi người dùng đính kèm 1-3 ảnh chân dung).
1. Phân tích nét mặt cận cảnh (chỉ miêu tả xương hàm, mí mắt, sống mũi, nốt ruồi, kiểu tóc) thành \`[FINAL_FACE_JSON]\`.
2. In Prompt vào code block: "Extreme close-up portrait. [FINAL_FACE_JSON]. Wearing a simple t-shirt. Studio Ghibli style. Aspect ratio: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ 1 ảnh cận mặt.
4. NGAY SAU KHI VẼ ẢNH XONG, BẮT BUỘC IN LUÔN CÂU HỎI SAU:
"Bây giờ, Gibi AI đã vẽ xong 'Ảnh Căn Cước' cận cảnh để chốt nét mặt cho bộ phim. Khuôn mặt này ổn chưa bạn?
- [Gõ 1]: Ổn rồi! Chốt khuôn mặt này làm Hằng số.
- [Gõ 2]: Chưa giống! AI tự tạo lại mẫu khác.
- [Gõ 3]: Đổi bộ ảnh chân dung khác."

🛑 QUY TẮC XỬ LÝ PHẢN HỒI GIAI ĐOẠN 1:
- NẾU NGƯỜI DÙNG GÕ 1 -> Chuyển sang GIAI ĐOẠN 2.
- NẾU NGƯỜI DÙNG GÕ 2 -> Tự động quét lại nét mặt, tạo lại mẫu mới và hỏi lại [1], [2], [3].
- NẾU NGƯỜI DÙNG GÕ 3 -> Yêu cầu up ảnh mới.

[GIAI ĐOẠN 2: BẢNG STORYBOARD TÍCH HỢP 16 Ô]
1. Xuất BẢNG STORYBOARD 16 KHUNG HÌNH TÍCH HỢP dạng bảng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
2. In Prompt Lưới vào code block: "A strict 4x4 grid layout (16 panels). [FINAL_FACE_JSON]. Varied clothing. Aspect ratio of entire image: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ 1 ảnh lưới 16 ô minh họa.
4. Hỏi: "Bảng Storyboard 16 Khung & Lưới hình ảnh đã xong. 
   - [Gõ 1]: Rất tuyệt! Bắt đầu sản xuất Frame 1.
   - [Gõ 2]: Cần chỉnh sửa lại nội dung cảnh quay hoặc lời thoại."

[GIAI ĐOẠN 3: SẢN XUẤT CUỐN CHIẾU TỪNG FRAME (FRAME 1 ĐẾN FRAME 16)]
(Từ Frame 1 đến Frame 16: TUYỆT ĐỐI KHÔNG HỎI ẢNH BỐI CẢNH THẬT NỮA. AI tự động hợp nhất nét mặt \`[FINAL_FACE_JSON]\` vào từng cảnh).

Tại mỗi Frame N (từ N=1 đến 16):
1. In tiêu đề: "🎬 **SẢN XUẤT FRAME [N]/16: [Tên Cảnh Quay]**"
2. In **Code Block 1 (Prompt Tạo Ảnh Tĩnh)**: Chứa \`[FINAL_FACE_JSON]\` + Hành động Frame N + Trang phục/Bối cảnh Frame N + Studio Ghibli style + Tỷ lệ.
3. In **Code Block 2 (Prompt Tạo Video Veo 3)**: Chứa tả Camera Movement + Micro-actions hoạt hình của Frame N.
4. In CẢNH BÁO FAIL-SAFE & TỰ VẼ 1 ảnh tĩnh cho Frame N.
5. In dòng câu hỏi tiếp theo:
"Xong Frame [N]! 
- [Gõ 1]: Đã copy prompt/ảnh, sang Frame [N+1] tiếp theo!
- [Gõ 2]: Chưa ưng, hãy tinh chỉnh lại prompt Frame [N]."

(Lặp lại quy trình này đúng từng Frame một cho đến khi hoàn thành xong Frame 16!).

KÍCH HOẠT [GIAI ĐOẠN 0] NGAY BÂY GIỜ!`;

  // Inject Floating Studio Badge & In-Page Slide Drawer
  function injectStudioBadge() {
    if (document.getElementById('gibi-studio-badge')) return;

    // Inject Badge
    const badge = document.createElement('div');
    badge.id = 'gibi-studio-badge';
    badge.title = 'Nhấp chuột để bật/tắt bảng điều khiển GIBI AI Studio';
    badge.innerHTML = `
      <div class="gibi-badge-content">
        <span class="gibi-badge-icon">🎬</span>
        <span class="gibi-badge-title">GIBI Studio Active</span>
      </div>
    `;

    // Inject In-Page Slide Drawer
    const drawer = document.createElement('div');
    drawer.id = 'gibi-inpage-drawer';
    drawer.innerHTML = `
      <div class="gibi-drawer-header">
        <div class="gibi-drawer-title">
          <span style="font-size: 18px;">🎬</span>
          <div>
            <div style="font-weight: 800; font-size: 14px; color: #fff;">GIBI AI Studio</div>
            <div style="font-size: 10px; color: #A0A5BD;">Bảng Điều Khiển Đạo Diễn Phim</div>
          </div>
        </div>
        <button id="gibi-drawer-close" class="gibi-drawer-close-btn">✖</button>
      </div>

      <div class="gibi-drawer-body">
        <div class="gibi-drawer-card">
          <div style="font-weight: 700; font-size: 13px; color: #F5A623; display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
            <span>🚀</span> Khởi Tạo Dự Án Phim Mới
          </div>
          
          <label style="font-size: 11px; font-weight: 600; color: #E2E8F0; display: block; margin-bottom: 4px;">Ý Tưởng / Kịch Bản Phim của bạn:</label>
          <textarea id="gibi-drawer-idea" placeholder="Nhập ý tưởng kịch bản video của bạn (Vd: Câu chuyện từ bỏ công việc văn phòng gò bó để kinh doanh online)..." rows="4"></textarea>

          <label style="font-size: 11px; font-weight: 600; color: #E2E8F0; display: block; margin-top: 10px; margin-bottom: 6px;">Tỷ Lệ Khung Hình Video:</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <label class="gibi-ratio-item">
              <input type="radio" name="gibi-drawer-ratio" value="16:9" checked>
              <span>📺 Ngang 16:9</span>
            </label>
            <label class="gibi-ratio-item">
              <input type="radio" name="gibi-drawer-ratio" value="9:16">
              <span>📱 Dọc 9:16</span>
            </label>
          </div>

          <button id="gibi-drawer-submit" class="gibi-drawer-primary-btn">
            ✨ Kích Hoạt Dự Án Trên Gemini Chat
          </button>
        </div>

        <div class="gibi-drawer-card" style="background: rgba(56, 189, 248, 0.08); border-color: rgba(56, 189, 248, 0.3);">
          <div style="font-weight: 700; font-size: 12px; color: #38BDF8; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span>💡</span> Mẹo Chọn Mô Hình Gemini
          </div>
          <p style="font-size: 11px; color: #E0F2FE; line-height: 1.5; margin: 0;">
            Nên chọn mô hình <strong>Gemini Advanced (Mở Rộng)</strong> ở góc dưới ô chat để AI có bộ nhớ lớn nhất, tự động tạo đủ Code Block + Ảnh tĩnh + Dòng hướng dẫn mà không bị giới hạn token ngắt lời giữa chừng!<br><br>
            <a href="https://labs.google/fx/vi/tools/flow" target="_blank" style="color: #F5A623; text-decoration: underline; font-weight: 700;">🚀 Mở Google Flow (Veo 3) làm Video chuyển động »</a>
          </p>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #gibi-studio-badge {
        position: fixed;
        top: 14px;
        right: 80px;
        z-index: 99999;
        background: linear-gradient(135deg, #1e1e2e 0%, #2a2a40 100%);
        border: 1px solid #f5a623;
        box-shadow: 0 4px 15px rgba(245, 166, 35, 0.35);
        border-radius: 20px;
        padding: 6px 14px;
        color: #f5a623;
        font-family: 'Inter', -apple-system, sans-serif;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
      }
      #gibi-studio-badge:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(245, 166, 35, 0.55);
        background: linear-gradient(135deg, #2a2a40 0%, #343454 100%);
      }
      .gibi-badge-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* Slide-Over Drawer Styles */
      #gibi-inpage-drawer {
        position: fixed;
        top: 0;
        right: -360px;
        width: 340px;
        height: 100vh;
        background: #12131C;
        border-left: 1px solid rgba(245, 166, 35, 0.3);
        box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);
        z-index: 999999;
        display: flex;
        flex-direction: column;
        transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', -apple-system, sans-serif;
        color: #F1F2F6;
      }
      #gibi-inpage-drawer.open {
        right: 0;
      }
      .gibi-drawer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        background: rgba(26, 28, 44, 0.9);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .gibi-drawer-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .gibi-drawer-close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #A0A5BD;
        font-size: 14px;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      .gibi-drawer-close-btn:hover {
        background: rgba(255, 77, 77, 0.3);
        color: #FF4D4D;
      }
      .gibi-drawer-body {
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        overflow-y: auto;
        flex: 1;
      }
      .gibi-drawer-card {
        background: rgba(26, 28, 44, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 14px;
      }
      #gibi-drawer-idea {
        width: 100%;
        background: rgba(18, 19, 28, 0.9);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        color: #fff;
        padding: 10px;
        font-family: inherit;
        font-size: 12px;
        resize: vertical;
        outline: none;
        box-sizing: border-box;
      }
      #gibi-drawer-idea:focus {
        border-color: #F5A623;
      }
      .gibi-ratio-item {
        display: flex;
        align-items: center;
        gap: 6px;
        background: rgba(18, 19, 28, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 8px;
        font-size: 11px;
        cursor: pointer;
      }
      .gibi-drawer-primary-btn {
        width: 100%;
        background: linear-gradient(135deg, #F5A623 0%, #D98200 100%);
        color: #000;
        font-weight: 800;
        font-size: 12px;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(245, 166, 35, 0.35);
        transition: all 0.2s;
      }
      .gibi-drawer-primary-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(245, 166, 35, 0.55);
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(badge);
    document.body.appendChild(drawer);

    // Toggle drawer ONLY on badge click
    badge.addEventListener('click', () => {
      drawer.classList.toggle('open');
    });

    // Close drawer
    document.getElementById('gibi-drawer-close').addEventListener('click', () => {
      drawer.classList.remove('open');
    });

    // Submit project from In-Page Drawer
    document.getElementById('gibi-drawer-submit').addEventListener('click', async () => {
      const idea = document.getElementById('gibi-drawer-idea').value.trim();
      if (!idea) {
        alert('Vui lòng nhập ý tưởng kịch bản của bạn!');
        return;
      }

      const ratio = document.querySelector('input[name="gibi-drawer-ratio"]:checked')?.value || '16:9';

      const fullPrompt = `⚠️ [CẤU HÌNH XƯNG HÔ THỜI GIAN THỰC]:
Bạn là Trợ lý GIBI AI — chuyên gia đồng hành đạo diễn phim hoạt hình 2D phong cách Studio Ghibli. Hãy tự xưng là "Gibi AI" và gọi người dùng là "bạn" trong toàn bộ quá trình sản xuất phim nhé!

${FULL_MEGA_PROMPT}

THÔNG TIN KỊCH BẢN ĐÃ CUNG CẤP TỪ BẢNG ĐIỀU KHIỂN (TUYỆT ĐỐI KHÔNG HỎI LẠI ĐIỀU NÀY):
1. Ý tưởng/Kịch bản: "${idea}"
2. Tỷ lệ video: Aspect ratio ${ratio}

Hãy gửi sơ đồ quy trình kèm Mẹo Đạo Diễn khuyên chọn Gemini Advanced (Mở Rộng), xác nhận đã nhận được kịch bản trên, và HỎI DUY NHẤT 1 VIỆC: Yêu cầu người dùng đính kèm 1-3 ảnh chân dung cận mặt để tạo 'Ảnh Căn Cước' nhé!`;

      drawer.classList.remove('open');
      await injectPromptIntoGemini(fullPrompt);
    });
  }

  // Inject Prompt into Gemini Input Box & Guaranteed Single Click Send
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

    // Dispatch all framework events to notify Angular/Lit reactive bindings
    ['input', 'change', 'blur'].forEach(evtName => {
      inputEl.dispatchEvent(new Event(evtName, { bubbles: true }));
    });
    inputEl.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText' }));

    // Give Gemini 400ms to process events and enable send button
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Aggressively locate Send Button
    const sendBtnSelectors = [
      'button[aria-label*="Gửi"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="gửi"]',
      'button[aria-label*="send"]',
      'button[aria-label*="Submit"]',
      'button.send-button',
      '.send-button-container button',
      'rich-textarea + button',
      'button[mat-icon-button]'
    ];

    let sendBtn = null;

    for (const selector of sendBtnSelectors) {
      const btns = Array.from(document.querySelectorAll(selector));
      sendBtn = btns.find((b) => b.offsetWidth > 0);
      if (sendBtn) break;
    }

    if (!sendBtn) {
      const inputContainer = inputEl.closest('form, .input-area, .chat-input-container, rich-textarea') || document.body;
      const allBtns = Array.from(inputContainer.querySelectorAll('button'));
      sendBtn = allBtns.find((b) => b.offsetWidth > 0 && !b.disabled);
    }

    if (sendBtn) {
      sendBtn.removeAttribute('disabled');
      sendBtn.setAttribute('aria-disabled', 'false');
      
      // Dispatch EXACTLY SINGLE click event to start generation
      sendBtn.click();

      return { success: true, action: 'SENT' };
    } else {
      // Fallback Keyboard Enter
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        which: 13,
        bubbles: true,
        cancelable: true
      });
      inputEl.dispatchEvent(enterEvent);
      return { success: true, action: 'ENTER_DISPATCHED' };
    }
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
