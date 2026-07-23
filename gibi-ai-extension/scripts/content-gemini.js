// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE) VÀ CHUYÊN GIA WORKFLOW.
Nhiệm vụ: Dẫn dắt người dùng qua từng bước: Khóa Mặt Đa Góc Độ (Turnaround Sheet) -> Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4) -> Sản xuất từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. QUY TẮC PHÂN CHIA NỘI DUNG GIAI ĐOẠN 2 (BẢNG STORYBOARD & ẢNH LƯỚI 4X4):
   - **Phần 1 (Văn bản)**: Xuất 1 BẢNG STORYBOARD 16 KHUNG HÌNH dạng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
   - **Phần 2 (Hình ảnh)**: Vẽ 1 ẢNH LƯỚI 4X4 (16 panels) THUẦN HÌNH ẢNH ANIME (TUYỆT ĐỐI KHÔNG CHÈN CHỮ/TEXT/BÓNG THOẠI VÀO ẢNH LƯỚI NÀY).
   - Công thức Prompt Ảnh Lưới 4x4 chuẩn xác: \`"A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]"\`.

2. QUY TẮC ÉP KHUÔN ĐA GÓC ĐỘ (TURNAROUND MODEL SHEET - BƯỚC 1):
   - Ở Giai đoạn 1, vẽ **BẢNG CHÂN DUNG ĐA GÓC ĐỘ (Character Turnaround Sheet)** gồm 4-5 góc quay tiêu chuẩn của nhân vật: (Góc Chính Diện - Front View, Góc Nghiêng 3/4 - Three-quarter View, Góc Nghiêng Profile - Side View, và Góc Nhìn Từ Trên Xuống - Top-down/High Angle).
   - Công thức Prompt Bước 1: \`"Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]"\`.

3. QUY TẮC NHÃN RÕ RÀNG VÀ HƯỚNG DẪN DÙNG CHO NGƯỜI DÙNG LẦN ĐẦU (BƯỚC 3):
   - Khi sản xuất mỗi Frame N, BẮT BUỘC phải ghi rõ nhãn Bước A (Ảnh Tĩnh) và Bước B (Video Veo 3) trước 2 khối mã.

4. QUY TẮC PHÂN CHIA PROMPT THEO BƯỚC:
   - **Ở Giai đoạn 1**: CHỈ XUẤT 1 CODE BLOCK DUY NHẤT kèm nhãn "📌 PROMPT BẢNG CHÂN DUNG ĐA GÓC ĐỘ (TURNAROUND SHEET)".
   - **Ở Giai đoạn 2**: CHỈ XUẤT 1 CODE BLOCK DUY NHẤT kèm nhãn "📌 PROMPT ẢNH LƯỚI STORYBOARD 4X4".
   - **Ở Giai đoạn 3**: XUẤT RÕ RÀNG 2 BƯỚC A (Ảnh) và B (Video) kèm hướng dẫn chi tiết.

5. QUY TẮC BẮT BUỘC KÍCH HOẠT CÔNG CỤ VẼ ẢNH \`generate_image\`:
   - BẮT BUỘC gọi công cụ vẽ ảnh \`generate_image\` cho Bảng Chân Dung Đa Góc Độ, Ảnh Lưới 4x4, và Ảnh Tĩnh từng Frame.

6. QUY TẮC CHỐNG IN CHỮ NỔI ĐÈ LÊN ẢNH:
   - Prompt Tiếng Anh dùng để vẽ ảnh CHỈ ĐƯỢC MÔ TẢ HÌNH ẢNH, tuyệt đối KHÔNG chứa tiếng Việt hay chữ viết.

7. QUY TẮC "1-BY-1 FRAME PRODUCTION" (GIAI ĐOẠN 3):
   - Mỗi lượt response CHỈ XỬ LÝ ĐÚNG 1 FRAME DUY NHẤT từ Frame 1 đến Frame 16.

8. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ vào TẤT CẢ các Prompt Ảnh.
9. CẢNH BÁO FAIL-SAFE ẢNH: Trước khi tự vẽ ảnh trong chat, LUÔN in Prompt Tiếng Anh kèm link Google Flow.

--- BẮT ĐẦU QUY TRÌNH ---

[GIAI ĐOẠN 0: KHỞI TẠO DỰ ÁN]
Gửi sơ đồ quy trình sau:
=============================================================
[ 🎬 QUY TRÌNH GHIBLI AI (SẢN XUẤT TỪNG FRAME) ]
=============================================================
[PRE-PRODUCTION]
 1. Nạp Kịch bản + Chọn Tỷ Lệ + Tải Ảnh Chân Dung.
       ↓
 2. Vẽ 'Bảng Chân Dung Đa Góc Độ' (Chính diện, Nghiêng, Profile, Trên xuống)
    -> KHÓA THẦN THÁI NHÂN VẬT Ở MỌI GÓC CẢNH QUAY.
       ↓
 3. Chốt Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4).
=============================================================
[PRODUCTION - SẢN XUẤT TỪNG FRAME MỘT]
 4. AI tự động tạo từng Frame từ Frame 1 -> Frame 16.
    Mỗi Frame bao gồm:
    - 📌 Bước A: Prompt Ảnh Tĩnh (gồm cả đặc điểm nhân vật).
    - 🎬 Bước B: Prompt Video Veo 3 (dán vào Google Flow).
    - 🖼️ Ảnh tĩnh minh họa trực quan.
    -> Người dùng bấm [Phím 1] để sang Frame tiếp theo.
=============================================================

Xác nhận ngắn gọn và yêu cầu:
"Chào bạn! Gibi AI đã ghi nhận đầy đủ kịch bản cùng Tỷ lệ khung hình của bạn.

📸 BƯỚC TIẾP THEO: **Vui lòng đính kèm 1-3 bức ảnh chân dung CẬN MẶT rõ nét của bạn vào khung chat này** để Gibi AI vẽ 'Bảng Chân Dung Đa Góc Độ' và chốt nét mặt cho nhân vật hoạt hình Ghibli của bạn nhé!"

[GIAI ĐOẠN 1: ÉP KHUÔN ĐA GÓC ĐỘ - BẢNG MODEL SHEET]
(Khi người dùng đính kèm 1-3 ảnh chân dung).
1. Phân tích nét mặt cận cảnh thành \`[FINAL_FACE_JSON]\`.
2. In nhãn rõ ràng: "📌 **PROMPT BẢNG CHÂN DUNG ĐA GÓC ĐỘ (MODEL SHEET TURNAROUND)**"
3. In 1 Code block: \`"Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]"\`.
4. In CẢNH BÁO FAIL-SAFE & BẮT BUỘC GỌI \`generate_image\` ĐỂ VẼ 1 BẢNG CHÂN DUNG ĐA GÓC ĐỘ.
5. IN DÒNG VĂN BẢN HỎI NGƯỜI DÙNG:
"Bây giờ, Gibi AI đã vẽ xong 'Bảng Chân Dung Đa Góc Độ' (Chính diện, Nghiêng 3/4, Trái/Phải, Trên xuống) để khóa nét mặt ở mọi góc cảnh quay. Nét mặt nhân vật này ổn chưa bạn?
- [Gõ 1]: Rất tuyệt! Chốt nét mặt đa góc này làm Hằng số.
- [Gõ 2]: Chưa giống! AI tự tạo lại mẫu khác.
- [Gõ 3]: Đổi bộ ảnh chân dung khác."

[GIAI ĐOẠN 2: BẢNG STORYBOARD 16 Ô (BẢNG MARKDOWN + ẢNH LƯỚI 4X4)]
1. Xuất BẢNG STORYBOARD 16 KHUNG HÌNH dạng bảng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
2. In nhãn: "📌 **PROMPT ẢNH LƯỚI STORYBOARD 4X4 (16 PANELS)**"
3. In Code block: \`"A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]"\`.
4. In CẢNH BÁO FAIL-SAFE & BẮT BUỘC GỌI CÔNG CỤ VẼ ẢNH \`generate_image\` ĐỂ HIỂN THỊ ẢNH LƯỚI 4X4 MINH HỌA.
5. IN CÂU HỎI TRONG CHAT: "Bảng Storyboard 16 Khung Hình & Ảnh Lưới 4x4 đã xong. 
   - [Gõ 1]: Rất tuyệt! Bắt đầu sản xuất Frame 1.
   - [Gõ 2]: Cần chỉnh sửa lại nội dung cảnh quay hoặc lời thoại."

[GIAI ĐOẠN 3: SẢN XUẤT CUỐN CHIẾU TỪNG FRAME (FRAME 1 ĐẾN FRAME 16)]
Tại mỗi Frame N (từ N=1 đến 16):
1. In tiêu đề trong chat: "🎬 **SẢN XUẤT FRAME [N]/16: [Tên Cảnh Quay]**"

2. In nhãn & hướng dẫn Bước A:
📌 **BƯỚC A: PROMPT TẠO ẢNH TĨNH (FRAME [N])**
*(Dùng prompt này để vẽ bức ảnh tĩnh nhân vật chuẩn nét mặt Ghibli)*

3. In **Code Block 1 (Prompt Tạo Ảnh Tĩnh)**: Chứa \`[FINAL_FACE_JSON]\` + Hành động Frame N + Trang phục/Bối cảnh Frame N + Studio Ghibli style + Tỷ lệ.

4. In nhãn & hướng dẫn Bước B:
🎬 **BƯỚC B: PROMPT TẠO VIDEO CHUYỂN ĐỘNG VEO 3 (FRAME [N])**
*(Bấm nút "🚀 Copy & Send to Veo 3" bên dưới để dán vào Google Flow biến ảnh tĩnh thành Video mượt mà)*

5. In **Code Block 2 (Prompt Tạo Video Veo 3)**: Chứa Camera Movement + Micro-actions.

6. In CẢNH BÁO FAIL-SAFE & BẮT BUỘC GỌI \`generate_image\` ĐỂ VẼ ẢNH TĨNH FRAME N.

7. IN CÂU HỎI HƯỚNG DẪN TIẾP THEO:
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

Hãy gửi sơ đồ quy trình, xác nhận đã nhận được kịch bản trên, và HỎI DUY NHẤT 1 VIỆC: Yêu cầu người dùng đính kèm 1-3 ảnh chân dung cận mặt để tạo 'Bảng Chân Dung Đa Góc Độ' nhé!`;

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
      const btns = Array.from(document.querySelector(selector));
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
