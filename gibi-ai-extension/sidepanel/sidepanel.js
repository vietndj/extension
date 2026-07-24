// GIBI AI Studio - Director Dashboard Sidepanel Controller

const buildMegaPrompt = (userName = 'bạn') => `BẠN LÀ MISS GIBI — TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE) CỦA ${userName.toUpperCase()}.
Nhiệm vụ: Dẫn dắt ${userName} qua từng bước: Khóa Mặt Đa Góc Độ (Turnaround Sheet) -> Bảng Storyboard 16 Ô (Bảng Markdown + Ảnh Lưới 4x4) -> Sản xuất từng Frame một (TỪ FRAME 1 ĐẾN FRAME 16).
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. QUY TẮC PHÂN CHIA NỘI DUNG GIAI ĐOẠN 2 (BẢNG STORYBOARD & ẢNH LƯỚI 4X4):
   - **Phần 1 (Văn bản)**: Xuất 1 BẢNG STORYBOARD 16 KHUNG HÌNH dạng Markdown gồm 4 cột (Khung | Cảnh Quay & Hành Động | Câu Thoại | Giọng Điệu).
   - **Phần 2 (Hình ảnh)**: Vẽ 1 ẢNH LƯỚI 4X4 (16 panels) THUẦN HÌNH ẢNH ANIME (TUYỆT ĐỐI KHÔNG CHÈN CHỮ/TEXT/BÓNG THOẠI VÀO ẢNH LƯỚI NÀY).
   - Công thức Prompt Ảnh Lưới 4x4 chuẩn xác: "A 4x4 grid layout storyboard featuring 16 anime panels, Studio Ghibli style, featuring [FINAL_FACE_JSON], sequential cinematic scenes, masterpiece. Aspect ratio: [Tỷ lệ]".

2. QUY TẮC ÉP KHUÔN ĐA GÓC ĐỘ (TURNAROUND MODEL SHEET - BƯỚC 1):
   - Ở Giai đoạn 1, vẽ **BẢNG CHÂN DUNG ĐA GÓC ĐỘ (Character Turnaround Sheet)** gồm 4-5 góc quay tiêu chuẩn của nhân vật: (Góc Chính Diện - Front View, Góc Nghiêng 3/4 - Three-quarter View, Góc Nghiêng Profile - Side View, và Góc Nhìn Từ Trên Xuống - Top-down/High Angle).
   - Công thức Prompt Bước 1: "Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]".

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
    -> KHÓA THẦN THÁI NHÂN VẬT Ó MỌI GÓC CẢNH QUAY.
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
"Chào ${userName}! Miss GIBI đã ghi nhận đầy đủ kịch bản cùng Tỷ lệ khung hình của ${userName}.

📸 BƯỚC TIẾP THEO: **Vui lòng đính kèm 1-3 bức ảnh chân dung CẬN MẶT rõ nét của ${userName} vào khung chat này** để Miss GIBI vẽ 'Bảng Chân Dung Đa Góc Độ' và chốt nét mặt cho nhân vật hoạt hình Ghibli của ${userName} nhé!"

[GIAI ĐOẠN 1: ÉP KHUÔN ĐA GÓC ĐỘ - BẢNG MODEL SHEET]
(Khi người dùng đính kèm 1-3 ảnh chân dung).
1. Phân tích nét mặt cận cảnh thành \`[FINAL_FACE_JSON]\`.
2. In nhãn rõ ràng: "📌 **PROMPT BẢNG CHÂN DUNG ĐA GÓC ĐỘ (MODEL SHEET TURNAROUND)**"
3. In 1 Code block: \`"Anime character model sheet turnaround, multiple camera angles of the same character in one frame (front view, 3/4 view, side profile view, high angle view), Studio Ghibli style, featuring [FINAL_FACE_JSON], wearing simple t-shirt, clean character reference design sheet. Aspect ratio: [Tỷ lệ]"\`.
4. In CẢNH BÁO FAIL-SAFE & BẮT BUỘC GỌI \`generate_image\` ĐỂ VẼ 1 BẢNG CHÂN DUNG ĐA GÓC ĐỘ.
5. IN DÒNG VĂN BẢN HỎI NGƯỜI DÙNG:
"Bây giờ, Miss GIBI đã vẽ xong 'Bảng Chân Dung Đa Góc Độ' (Chính diện, Nghiêng 3/4, Trái/Phải, Trên xuống) để khóa nét mặt ở mọi góc cảnh quay. Nét mặt nhân vật này ổn chưa ${userName}?
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

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[GIBI AI] Director Dashboard Controller Loaded');

  // DOM Elements
  const inputUserName = document.getElementById('input-user-name');
  const inputScriptIdea = document.getElementById('input-script-idea');
  const btnStartPhase0 = document.getElementById('btn-start-phase-0');
  const btnResetProject = document.getElementById('btn-reset-project');
  const statusText = document.getElementById('status-text');
  const titleText = document.getElementById('title-text');
  const editNameBtn = document.getElementById('edit-name-btn');

  // Step Elements
  const stepView1 = document.getElementById('step-view-1');
  const stepView2 = document.getElementById('step-view-2');
  const stepView3 = document.getElementById('step-view-3');

  const btnNextStep1 = document.getElementById('btn-next-step-1');
  const btnBackStep2 = document.getElementById('btn-back-step-2');
  const btnNextStep2 = document.getElementById('btn-next-step-2');
  const btnBackStep3 = document.getElementById('btn-back-step-3');

  const stepDot1 = document.getElementById('step-dot-1');
  const stepDot2 = document.getElementById('step-dot-2');
  const stepDot3 = document.getElementById('step-dot-3');
  const stepLine1 = document.getElementById('step-line-1');
  const stepLine2 = document.getElementById('step-line-2');

  // Helper to update brand header text
  function updateBrandHeader(name) {
    if (!name || !name.trim()) {
      if (titleText) titleText.textContent = 'Miss GIBI';
    } else {
      if (titleText) titleText.textContent = `Miss GIBI của ${name.trim()}`;
    }
  }

  // Stepper Controller
  function goToStep(stepNumber) {
    // Hide all views
    stepView1.classList.add('hidden');
    stepView2.classList.add('hidden');
    stepView3.classList.add('hidden');

    // Reset dots & lines
    stepDot1.classList.remove('active', 'completed');
    stepDot2.classList.remove('active', 'completed');
    stepDot3.classList.remove('active', 'completed');
    stepLine1.classList.remove('active');
    stepLine2.classList.remove('active');

    if (stepNumber === 1) {
      stepView1.classList.remove('hidden');
      stepDot1.classList.add('active');
      if (inputUserName) inputUserName.focus();
    } else if (stepNumber === 2) {
      stepView2.classList.remove('hidden');
      stepDot1.classList.add('completed');
      stepLine1.classList.add('active');
      stepDot2.classList.add('active');
    } else if (stepNumber === 3) {
      stepView3.classList.remove('hidden');
      stepDot1.classList.add('completed');
      stepLine1.classList.add('active');
      stepDot2.classList.add('completed');
      stepLine2.classList.add('active');
      stepDot3.classList.add('active');
      if (inputScriptIdea) inputScriptIdea.focus();
    }
  }

  // Restore saved state
  const stored = await chrome.storage.local.get(['userName', 'scriptIdea', 'aspectRatio']);
  if (stored.userName) {
    if (inputUserName) inputUserName.value = stored.userName;
    updateBrandHeader(stored.userName);
  } else {
    updateBrandHeader('');
  }

  if (stored.scriptIdea && inputScriptIdea) inputScriptIdea.value = stored.scriptIdea;
  if (stored.aspectRatio) {
    const radio = document.querySelector(`input[name="aspect-ratio"][value="${stored.aspectRatio}"]`);
    if (radio) {
      radio.checked = true;
      document.querySelectorAll('.radio-card').forEach((card) => card.classList.remove('active'));
      radio.closest('.radio-card')?.classList.add('active');
    }
  }

  // Radio cards toggle styling
  document.querySelectorAll('.radio-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.radio-card').forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Idea chips selection listener
  document.querySelectorAll('.idea-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const ideaText = chip.getAttribute('data-idea');
      if (ideaText && inputScriptIdea) {
        inputScriptIdea.value = ideaText;
        inputScriptIdea.focus();
      }
    });
  });

  // Step 1 -> Next
  if (btnNextStep1) {
    btnNextStep1.addEventListener('click', () => {
      const name = inputUserName ? inputUserName.value.trim() : '';
      if (!name) {
        alert('Vui lòng nhập tên của bạn để tiếp tục!');
        if (inputUserName) inputUserName.focus();
        return;
      }
      chrome.storage.local.set({ userName: name });
      updateBrandHeader(name);
      goToStep(2);
    });
  }

  // Enter key on Step 1 Name input
  if (inputUserName) {
    inputUserName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnNextStep1.click();
      }
    });
    inputUserName.addEventListener('input', (e) => {
      updateBrandHeader(e.target.value.trim());
    });
  }

  // Step 2 -> Back & Next
  if (btnBackStep2) {
    btnBackStep2.addEventListener('click', () => goToStep(1));
  }
  if (btnNextStep2) {
    btnNextStep2.addEventListener('click', () => goToStep(3));
  }

  // Step 3 -> Back
  if (btnBackStep3) {
    btnBackStep3.addEventListener('click', () => goToStep(2));
  }

  // Edit name pencil click listener
  if (editNameBtn) {
    editNameBtn.addEventListener('click', () => {
      goToStep(1);
    });
  }

  // Reset Project
  btnResetProject.addEventListener('click', async () => {
    if (confirm('Bạn có chắc chắn muốn làm mới Dự án Gibi AI không?')) {
      await chrome.storage.local.clear();
      if (inputScriptIdea) inputScriptIdea.value = '';
      if (inputUserName) inputUserName.value = '';
      window.location.reload();
    }
  });

  // Smart Helper: Auto-detect, switch to, or create Gemini Tab automatically with GUARANTEED AUTO-RETRY!
  async function sendToGemini(action, payload = {}) {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    let geminiTab = tabs.find((t) => t.active && t.url && t.url.includes('gemini.google.com'));

    if (!geminiTab) {
      geminiTab = tabs.find((t) => t.url && t.url.includes('gemini.google.com'));
      if (geminiTab) {
        await chrome.tabs.update(geminiTab.id, { active: true });
      }
    }

    if (!geminiTab) {
      console.log('[GIBI AI] No Gemini tab open, creating new tab automatically...');
      geminiTab = await chrome.tabs.create({ url: 'https://gemini.google.com', active: true });

      await new Promise((resolve) => {
        const listener = (tabId, changeInfo) => {
          if (tabId === geminiTab.id && changeInfo.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(listener);
            resolve();
          }
        };
        chrome.tabs.onUpdated.addListener(listener);
        setTimeout(resolve, 8000);
      });
    }

    // Try sending directly first
    try {
      const response = await chrome.tabs.sendMessage(geminiTab.id, { action, ...payload });
      if (response && response.success) return response;
    } catch (err) {
      console.warn('[GIBI AI] Content script not responding initially, injecting content script...', err);
    }

    // Inject content-gemini.js dynamically into the tab
    try {
      await chrome.scripting.executeScript({
        target: { tabId: geminiTab.id },
        files: ['scripts/content-gemini.js']
      });
    } catch (scriptErr) {
      console.error('[GIBI AI] Failed to execute content script:', scriptErr);
    }

    // Automatic Aggressive Retry Loop
    for (let attempt = 1; attempt <= 5; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      try {
        const response = await chrome.tabs.sendMessage(geminiTab.id, { action, ...payload });
        if (response && response.success) {
          console.log(`[GIBI AI] Successfully communicated with Gemini on attempt ${attempt}`);
          return response;
        }
      } catch (retryErr) {
        console.warn(`[GIBI AI] Retry attempt ${attempt} failed, retrying...`, retryErr);
      }
    }

    if (statusText) statusText.innerText = '✨ Đã kết nối với Gemini! Hãy chờ ô chat phản hồi.';
    return null;
  }

  // Phase 0: Start Project Action (Step 3 Submit)
  if (btnStartPhase0) {
    btnStartPhase0.addEventListener('click', async () => {
      const scriptIdea = inputScriptIdea.value.trim();
      if (!scriptIdea) {
        if (statusText) statusText.innerText = '⚠️ Vui lòng nhập Ý tưởng kịch bản trước!';
        alert('Vui lòng nhập Ý tưởng kịch bản trước!');
        if (inputScriptIdea) inputScriptIdea.focus();
        return;
      }

      const userName = (inputUserName ? inputUserName.value.trim() : '') || 'bạn';
      const selectedRatio = document.querySelector('input[name="aspect-ratio"]:checked')?.value || '16:9';

      await chrome.storage.local.set({ userName, scriptIdea, aspectRatio: selectedRatio });
      updateBrandHeader(userName !== 'bạn' ? userName : '');

      const fullMegaPrompt = buildMegaPrompt(userName);

      const fullInjectionPrompt = `⚠️ [CẤU HÌNH XƯNG HÔ THỜI GIAN THỰC]:
Bạn là Miss GIBI — chuyên gia đồng hành đạo diễn phim hoạt hình 2D phong cách Studio Ghibli của ${userName}. Hãy tự xưng là "Miss GIBI" và gọi người dùng là "${userName}" trong toàn bộ quá trình sản xuất phim nhé!

${fullMegaPrompt}

THÔNG TIN KỊCH BẢN ĐÃ CUNG CẤP TỪ BẢNG ĐIỀU KHIỂN (TUYỆT ĐỐI KHÔNG HỎI LẠI ĐIỀU NÀY):
1. Ý tưởng/Kịch bản: "${scriptIdea}"
2. Tỷ lệ video: Aspect ratio ${selectedRatio}

Hãy gửi sơ đồ quy trình, xác nhận đã nhận được kịch bản trên, và HỎI DUY NHẤT 1 VIỆC: Yêu cầu ${userName} đính kèm 1-3 ảnh chân dung cận mặt để tạo 'Bảng Chân Dung Đa Góc Độ' nhé!`;

      if (statusText) statusText.innerText = '⏳ Đang tự động gửi kịch bản sang Gemini Chat...';

      const res = await sendToGemini('INJECT_PROMPT', { promptText: fullInjectionPrompt });
      if (res && res.success) {
        if (statusText) statusText.innerText = `✨ Đã gửi kịch bản! Hãy đính kèm ảnh chân dung ở khung chat nhé ${userName}.`;
      } else {
        if (statusText) statusText.innerText = `✨ Đã chuyển kịch bản sang Gemini! Kiểm tra khung chat nhé ${userName}.`;
      }
    });
  }

  // Initialize view at Step 1 or Step 3 if name already filled
  if (stored.userName) {
    goToStep(3);
  } else {
    goToStep(1);
  }
});
