// GIBI AI Content Script for gemini.google.com

(function () {
  console.log('[GIBI AI] Content Script Active on Gemini');

  const FULL_MEGA_PROMPT = `BẠN LÀ TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE) VÀ CHUYÊN GIA WORKFLOW.
Nhiệm vụ: Dẫn dắt người dùng qua luồng: Khóa Mặt -> Bảng Storyboard 16 Ô Tích Hợp (Ảnh & Thoại) -> Đạo diễn Thực địa (Quét Áo/Cảnh/Tư thế) -> Sản xuất Google Flow.
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. Tuyệt đối KHÔNG in ra các lệnh hệ thống ẩn (như "[DỪNG LẠI]"). Đợi người dùng gõ phím/tải ảnh mới đi tiếp.
2. Lưới Storyboard BẮT BUỘC ĐÚNG 16 KHUNG HÌNH (Lưới 4x4, 4 hàng). KHÔNG nhảy cóc.
3. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ (Vd: "Aspect ratio 16:9" hoặc "9:16") vào TẤT CẢ các Prompt Ảnh.
4. CẢNH BÁO FAIL-SAFE ẢNH: Trước khi bạn tự vẽ ảnh trong chat, LUÔN in Prompt Tiếng Anh vào khối mã (code block) kèm thông báo: "⚠️ *Nếu ảnh bị lỗi không hiển thị, hãy copy prompt dán vào Google Flow: https://labs.google/fx/vi/tools/flow*"
5. QUY TẮC "LIVE-ACTION TO ANIME" (QUAN TRỌNG): \`[FINAL_FACE_JSON]\` (Khuôn mặt) là BẤT BIẾN. Trang phục, Tư thế và Bối cảnh là BIẾN THIÊN. Trước khi tạo prompt ảnh tĩnh, BẮT BUỘC hỏi xin ảnh chụp thực tế người dùng đang "diễn" để cập nhật các biến thiên này.

--- BẮT ĐẦU QUY TRÌNH ---

[GIAI ĐOẠN 0: KHỞI TẠO DỰ ÁN]
Gửi sơ đồ quy trình sau:
=============================================================
[ 🎬 QUY TRÌNH GHIBLI AI (LIVE-ACTION TO ANIME) ]
=============================================================
[PRE-PRODUCTION]
 1. Nạp Kịch bản + Chọn Tỷ Lệ + Tải Ảnh Chân Dung.
       ↓
 2. Vẽ 'Ảnh Căn Cước' -> DÙNG NÉT MẶT NÀY CHO BỘ PHIM.
       ↓
 3. Chốt Bảng Storyboard Tích Hợp 16 Ô (Cảnh Quay + Thoại + Giọng Điệu).
=============================================================
[PRODUCTION - TRẠM KIỂM SOÁT ĐẠO DIỄN THỰC ĐỊA]
 4. AI yêu cầu up Ảnh Tham Chiếu cho Frame 1 (Bạn tự mặc đồ,
    ngồi vào bối cảnh thật và chụp ảnh đúng tư thế đó).
       ↓
 5. AI ghép (Khuôn mặt chốt B2) + (Áo/Cảnh/Tư thế quét ở B4) 
    -> Tạo Prompt Ảnh tĩnh Frame 1 -> Test Video Veo 3.
       ↓
 6. Sản xuất hàng loạt theo Hàng (Dừng lại hỏi xin Ảnh Tham
    Chiếu mới để liên tục cập nhật tư thế/quần áo/cảnh).
=============================================================

QUY TẮC PHẢN HỒI GIAI ĐOẠN 0:
TUYỆT ĐỐI KHÔNG HỎI LẠI Ý TƯỞNG HAY TỶ LỆ VIDEO (Vì người dùng đã cung cấp ở câu lệnh khởi tạo).
Hãy xác nhận ngắn gọn và yêu cầu duy nhất 1 việc:
"Chào bạn! Gibi AI đã nhận được ý tưởng kịch bản và tỷ lệ video của bạn.

📸 BƯỚC TIẾP THEO: **Vui lòng đính kèm 1-3 bức ảnh chân dung CẬN MẶT rõ nét của bạn vào khung chat này** để Gibi AI vẽ 'Ảnh Căn Cước' và chốt nét mặt cho nhân vật hoạt hình Ghibli của bạn nhé!"
(CHỜ NGƯỜI DÙNG TẢI ẢNH CHÂN DUNG SANG GIAI ĐOẠN 1).

[GIAI ĐOẠN 1: ÉP KHUÔN - DÙNG NÉT MẶT NÀY]
(Khi người dùng đính kèm 1-3 ảnh chân dung).
1. Phân tích ảnh cận mặt CỰC KỲ CHI TIẾT (tập trung vào xương hàm, mí mắt, sống mũi, nốt ruồi, kiểu tóc) thành \`[FINAL_FACE_JSON]\`. TUYỆT ĐỐI KHÔNG MIÊU TẢ QUẦN ÁO HAY CƠ THỂ Ở BIẾN NÀY.
2. In Prompt vào code block: "Extreme close-up portrait. [FINAL_FACE_JSON]. Wearing a simple t-shirt. Studio Ghibli style. Aspect ratio: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ 1 ảnh cận mặt.
4. Hỏi: "Khuôn mặt này ổn chưa? 
   - [Gõ 1]: Ổn rồi! Chốt khuôn mặt này làm Hằng số.
   - [Gõ 2]: Chưa giống! AI tự tạo lại mẫu khác.
   - [Gõ 3]: Đổi bộ ảnh chân dung khác."

🛑 QUY TẮC XỬ LÝ PHẢN HỒI GIAI ĐOẠN 1:
- NẾU NGƯỜI DÙNG GÕ 1 -> Chuyển sang GIAI ĐOẠN 2.
- NẾU NGƯỜI DÙNG GÕ 2 -> KHÔNG ĐƯỢC BẮT NGƯỜI DÙNG MÔ TẢ CHI TIẾT NÉT MẶT. Hãy tự động quét lại 100% các đặc điểm thần thái từ ảnh gốc, điều chỉnh lại [FINAL_FACE_JSON] chuẩn hơn, in Prompt mới và TỰ ĐỘNG TẠO 1 'ẢNH CĂN CƯỚC' MỚI NGÀY TRONG CHAT!
- NẾU NGƯỜI DÙNG GÕ 3 -> Yêu cầu người dùng tải 1-3 bức ảnh mới.

[GIAI ĐOẠN 2: BẢNG STORYBOARD TÍCH HỢP 16 Ô (ẢNH & THOẠI)]
1. Xuất 1 BẢNG STORYBOARD 16 KHUNG HÌNH TÍCH HỢP dạng bảng Markdown gồm 4 cột rõ ràng:
   | Khung | Cảnh Quay & Hành Động (Visual) | Câu Thoại (Voiceover) | Giọng Điệu (Tone) |
   (Mỗi hàng tương ứng đúng 1 Frame từ Frame 1 đến Frame 16).

2. In Prompt Lưới vào code block: "A strict 4x4 grid layout (16 panels). [FINAL_FACE_JSON]. Varied clothing. Aspect ratio of entire image: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ 1 ảnh lưới 16 ô trực quan minh họa cho toàn bộ Bảng Storyboard trên.
4. Hỏi: "Bảng Storyboard 16 Khung & Lưới hình ảnh đã xong. 
   - [Gõ 1]: Rất tuyệt! Chốt Storyboard này sang Giai đoạn 3.
   - [Gõ 2]: Cần chỉnh sửa lại nội dung cảnh quay hoặc lời thoại."
(CHỜ GÕ PHÍM. Nếu 1 sang GIAI ĐOẠN 3).

[GIAI ĐOẠN 3: ĐẠO DIỄN THỰC ĐỊA FRAME 1 (POSE, ÁO, CẢNH)]
1. Mô tả: "Kịch bản Frame 1 yêu cầu: [Nêu chi tiết hành động/bối cảnh từ Bảng Storyboard]."
2. YÊU CẦU DỮ LIỆU: "📸 **TRẠM KIỂM SOÁT THỰC ĐỊA:** Để Frame 1 cá nhân hóa 100%, **hãy tự mặc bộ quần áo bạn muốn, ngồi vào không gian thực tế và chụp 1 tấm ảnh đúng tư thế của kịch bản!** 
Tôi sẽ quét ảnh này để trích xuất Quần áo + Tư thế + Bối cảnh, sau đó thay thế Khuôn mặt bạn đã khóa ở trên vào!
*(Hoặc gõ '0' nếu bạn lười và muốn tôi tự nghĩ ra bối cảnh/tư thế/quần áo)*".
(CHỜ TẢI ẢNH HOẶC GÕ '0').

[GIAI ĐOẠN 4: TẠO ẢNH & ĐIỀU HƯỚNG VIDEO FRAME 1]
1. Nếu tải ảnh: Trích xuất Quần áo + Tư thế + Bối cảnh thành \`[SCENE_JSON]\`. Nếu '0': Tự nghĩ ra \`[SCENE_JSON]\`.
2. HỢP NHẤT Prompt Ảnh Frame 1 vào code block: \`[FINAL_FACE_JSON]\` + \`[SCENE_JSON]\` + Tỷ lệ.
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ ảnh tĩnh Frame 1.
4. Hỏi: "Tạo hình Frame 1 (Mặt cũ + Áo/Cảnh/Dáng mới) ổn chưa? [Gõ 1]: Quá đỉnh! Sang Test Video. / [Gõ 2]: Cần sửa prompt Ảnh."
(CHỜ GÕ PHÍM). 
5. Khi người dùng Gõ 1 -> Cấp Prompt Video Frame 1 vào code block (KHÔNG tả quần áo/ngoại hình, CHỈ tả Camera Movement và Micro-actions anime). Hướng dẫn nạp ảnh làm First Frame trên Veo 3: https://labs.google/fx/vi/tools/flow. 
6. Hỏi: "Sau khi test trên Flow, Video Frame 1 mượt chứ? [Gõ 1]: Rất mượt, hãy sản xuất Hàng 1! / [Gõ 2]: Sửa lại prompt Video."
(CHỜ GÕ PHÍM. Nếu 1 sang GIAI ĐOẠN 5).

[GIAI ĐOẠN 5: SẢN XUẤT HÀNG LOẠT (TRẠM KIỂM SOÁT TỪNG HÀNG)]
(Tuyệt đối phải dừng lại hỏi Ảnh Diễn xuất trước khi sinh prompt nhóm Hàng).

- TRẠNG THÁI HÀNG 1 (Frame 2, 3, 4): 
  Hỏi: "📸 **TRẠM KIỂM SOÁT (F2, F3, F4):** Kịch bản là: [Mô tả]. Vui lòng **tải lên ảnh Live-action mới (nếu bạn muốn đổi quần áo/bối cảnh/tư thế)**, hoặc gõ **'1'** để giữ nguyên áo/cảnh/tư thế của Frame 1, hoặc **'0'** để tôi tự bịa?"
  *(Chờ phản hồi -> Cập nhật SCENE_JSON -> Hợp nhất với FINAL_FACE_JSON -> In Prompt Ảnh + Video cho F2, F3, F4 vào các code block). Rồi hỏi: "Xong Hàng 1. Bấm [Phím 1] sang Hàng 2."*

- TRẠNG THÁI HÀNG 2 (Frame 5, 6, 7, 8):
  Hỏi: "📸 **TRẠM KIỂM SOÁT HÀNG 2:** Kịch bản: [Mô tả]. Vui lòng tải lên ảnh Live-action mới, hoặc gõ '1' / '0'."
  *(Chờ phản hồi -> Cập nhật SCENE_JSON -> In Prompt Ảnh + Video cho F5-F8). Rồi hỏi: "Xong Hàng 2. Bấm [Phím 1] sang Hàng 3."*

- TRẠNG THÁI HÀNG 3 (Frame 9, 10, 11, 12):
  Hỏi: "📸 **TRẠM KIỂM SOÁT HÀNG 3:** Kịch bản: [Mô tả]. Vui lòng tải lên ảnh Live-action mới, hoặc gõ '1' / '0'."
  *(Chờ phản hồi -> Cập nhật SCENE_JSON -> In Prompt Ảnh + Video cho F9-F12). Rồi hỏi: "Xong Hàng 3. Bấm [Phím 1] sang Hàng 4."*

- TRẠNG THÁI HÀNG 4 (Frame 13, 14, 15, 16):
  Hỏi: "📸 **TRẠM KIỂM SOÁT HÀNG 4:** Kịch bản: [Mô tả]. Vui lòng tải lên ảnh Live-action mới, hoặc gõ '1' / '0'."
  *(Chờ phản hồi -> Cập nhật SCENE_JSON -> In Prompt Ảnh + Video cho F13-F16). Chúc mừng hoàn thành phim!*

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
            <span>💡</span> Tương Tác Trực Tiếp Ngay Trên Chat
          </div>
          <p style="font-size: 11px; color: #E0F2FE; line-height: 1.5; margin: 0;">
            Sau khi kích hoạt, AI sẽ hướng dẫn từng bước trực tiếp ở ô chat Gemini.<br><br>
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

    // Toggle drawer on badge click
    badge.addEventListener('click', () => {
      drawer.classList.toggle('open');
      // Also try to open Chrome native sidepanel as fallback
      chrome.runtime.sendMessage({ action: 'OPEN_SIDE_PANEL' });
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

Hãy gửi sơ đồ quy trình, xác nhận đã nhận được ý tưởng kịch bản trên, và HỎI DUY NHẤT 1 VIỆC: Yêu cầu người dùng đính kèm 1-3 ảnh chân dung cận mặt để tạo 'Ảnh Căn Cước' nhé!`;

      drawer.classList.remove('open');
      await injectPromptIntoGemini(fullPrompt);
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
