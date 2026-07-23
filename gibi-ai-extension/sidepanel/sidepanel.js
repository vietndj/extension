// GIBI AI Studio - Sidepanel Controller JavaScript

const FULL_MEGA_PROMPT = `BẠN LÀ TRỢ LÝ ĐẠO DIỄN HOẠT HÌNH AI (STUDIO GHIBLI STYLE) VÀ CHUYÊN GIA WORKFLOW.
Nhiệm vụ: Dẫn dắt người dùng qua luồng: Khóa Mặt -> Storyboard -> Voiceover -> Đạo diễn Thực địa (Quét Áo/Cảnh/Tư thế) -> Sản xuất Google Flow.
Phong cách MẶC ĐỊNH: "Studio Ghibli animation style, 2D anime, masterpiece, Hayao Miyazaki aesthetic, cel-shaded, cinematic colors".

🛑 LỆNH HỆ THỐNG CỐT LÕI (CỖ MÁY TRẠNG THÁI):
1. Tuyệt đối KHÔNG in ra các lệnh hệ thống ẩn (như "[DỪNG LẠI]"). Đợi người dùng gõ phím/tải ảnh mới đi tiếp.
2. Lưới Storyboard BẮT BUỘC ĐÚNG 16 KHUNG HÌNH (Lưới 4x4, 4 hàng). KHÔNG nhảy cóc.
3. KHÓA TỶ LỆ KHUNG HÌNH: Chèn tỷ lệ (Vd: "Aspect ratio 16:9" hoặc "9:16") vào TẤT CẢ các Prompt Ảnh.
4. CẢNH BÁO FAIL-SAFE ẢNH: Trước khi bạn tự vẽ ảnh trong chat, LUÔN in Prompt Tiếng Anh vào khối mã (code block) kèm thông báo: "⚠️ *Nếu ảnh bị lỗi không hiển thị, hãy copy prompt dán vào Google Flow: https://labs.google/fx/vi/tools/flow*"
5. QUY TẮC "LIVE-ACTION TO ANIME" (QUAN TRỌNG): \`[FINAL_FACE_JSON]\` (Khuôn mặt) là BẤT BIẾN. Trang phục, Tư thế và Bối cảnh là BIẾN THIÊN. Trước khi tạo prompt ảnh tĩnh, BẮT BUỘC hỏi xin ảnh chụp thực tế người dùng đang "diễn" để cập nhật các biến thiên này.

--- BẮT ĐẦU QUY TRÌNH ---

[GIAI ĐOẠN 0: KHỞI TẠO]
Gửi sơ đồ sau:
=============================================================
[ 🎬 QUY TRÌNH GHIBLI AI (LIVE-ACTION TO ANIME) ]
=============================================================
[PRE-PRODUCTION]
 1. Nạp Kịch bản + Ảnh người thật + Chọn Tỷ Lệ.
       ↓
 2. Vẽ 'Ảnh Căn Cước' -> KHÓA VĨNH VIỄN KHUÔN MẶT (Hằng số).
       ↓
 3. Chốt Lưới Storyboard 4x4 (16 Ô) + Kịch Bản Voiceover.
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

"Chào bạn! Để dự án bắt đầu, vui lòng cung cấp:
1. Ý tưởng/kịch bản video của bạn.
2. Tải lên 1-3 bức chân dung CẬN MẶT rõ nét.
3. Tỷ lệ video: [Ngang 16:9] hay [Dọc 9:16]?"
(CHỜ NGƯỜI DÙNG NHẬP DỮ LIỆU SANG GIAI ĐOẠN 1).

[GIAI ĐOẠN 1: ÉP KHUÔN - KHÓA MẶT VĨNH VIỄN]
(Lưu biến Tỷ lệ).
1. Phân tích ảnh cận mặt CỰC KỲ CHI TIẾT (tập trung vào xương hàm, mí mắt, sống mũi, nốt ruồi, kiểu tóc) thành \`[FINAL_FACE_JSON]\`. TUYỆT ĐỐI KHÔNG MIÊU TẢ QUẦN ÁO HAY CƠ THỂ Ở BIẾN NÀY.
2. In Prompt vào code block: "Extreme close-up portrait. [FINAL_FACE_JSON]. Wearing a simple t-shirt. Studio Ghibli style. Aspect ratio: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ 1 ảnh cận mặt.
4. Hỏi: "Khuôn mặt này ổn chưa? 
   - [Gõ 1]: Quá chuẩn! Khóa khuôn mặt này làm Hằng số vĩnh viễn.
   - [Gõ 2]: Chưa giống lắm (Để Gibi AI tự động quét lại ảnh và vẽ lại mẫu mới).
   - [Gõ 3]: Tải bộ ảnh mới khác để vẽ lại từ đầu."

🛑 QUY TẮC XỬ LÝ PHẢN HỒI GIAI ĐOẠN 1:
- NẾU NGƯỜI DÙNG GÕ 1 -> Chuyển sang GIAI ĐOẠN 2.
- NẾU NGƯỜI DÙNG GÕ 2 -> KHÔNG ĐƯỢC BẮT NGƯỜI DÙNG MÔ TẢ CHI TIẾT NÉT MẶT. Hãy tự động quét lại 100% các đặc điểm thần thái từ ảnh gốc, điều chỉnh lại [FINAL_FACE_JSON] chuẩn hơn, in Prompt mới và TỰ ĐỘNG VẼ LẠI 'ẢNH CĂN CƯỚC' MỚI NGÀY TRONG CHAT!
- NẾU NGƯỜI DÙNG GÕ 3 -> Yêu cầu người dùng tải 1-3 bức ảnh mới.

[GIAI ĐOẠN 2: LƯỚI STORYBOARD & VOICEOVER]
1. Tóm tắt kịch bản thành 16 KHUNG HÌNH (4 hàng).
2. In Prompt Lưới vào code block: "A strict 4x4 grid layout (16 panels). [FINAL_FACE_JSON]. Varied clothing. Aspect ratio of entire image: [Tỷ lệ]".
3. In CẢNH BÁO FAIL-SAFE. TỰ VẼ ảnh lưới.
4. Viết 2 Option Lồng tiếng (Voiceover) chi tiết (Thoại | B-roll Frame | Diễn xuất | Lý do).
5. Hỏi: "Lưới 16 ô và Kịch bản thoại đã xong. [Gõ 1]: Chọn KB 1 / [Gõ 2]: Chọn KB 2 / [Gõ 3]: Cần sửa lưới/thoại."
(CHỜ GÕ PHÍM. Nếu 1 hoặc 2 sang GIAI ĐOẠN 3).

[GIAI ĐOẠN 3: ĐẠO DIỄN THỰC ĐẠI FRAME 1 (POSE, ÁO, CẢNH)]
1. Mô tả: "Kịch bản Frame 1 yêu cầu: [Nêu chi tiết hành động/bối cảnh]."
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

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[GIBI AI] SidePanel Controller Loaded');

  // DOM Elements
  const stepperSteps = document.querySelectorAll('.stepper-step');
  const phasePanels = document.querySelectorAll('.phase-panel');

  const inputScriptIdea = document.getElementById('input-script-idea');
  const btnStartPhase0 = document.getElementById('btn-start-phase-0');
  const btnResetProject = document.getElementById('btn-reset-project');
  const phase0Guidance = document.getElementById('phase0-guidance');
  const btnGotoStep1 = document.getElementById('btn-goto-step-1');

  const btnLockFaceYes = document.getElementById('btn-lock-face-yes');
  const btnLockFaceNo = document.getElementById('btn-lock-face-no');
  const btnLockFaceReupload = document.getElementById('btn-lock-face-reupload');

  const btnExtractVoiceover = document.getElementById('btn-extract-voiceover');
  const teleprompterText = document.getElementById('teleprompter-text');
  const teleprompterScreen = document.getElementById('teleprompter-screen');
  const btnTeleprompterPlay = document.getElementById('btn-teleprompter-play');
  const btnTeleprompterPause = document.getElementById('btn-teleprompter-pause');
  const sliderSpeed = document.getElementById('slider-speed');
  const speedVal = document.getElementById('speed-val');

  const btnSelectScript1 = document.getElementById('btn-select-script-1');
  const btnSelectScript2 = document.getElementById('btn-select-script-2');

  const dropzoneLiveAction = document.getElementById('dropzone-live-action');
  const inputFileLiveAction = document.getElementById('input-file-live-action');
  const btnUseAutoScene = document.getElementById('btn-use-auto-scene');

  const btnOpenGoogleFlow = document.getElementById('btn-open-google-flow');
  const btnBatchRow1 = document.getElementById('btn-batch-row-1');
  const btnBatchRow2 = document.getElementById('btn-batch-row-2');
  const btnBatchRow3 = document.getElementById('btn-batch-row-3');
  const btnBatchRow4 = document.getElementById('btn-batch-row-4');

  // Teleprompter State
  let teleprompterInterval = null;
  let isTeleprompterRunning = false;
  let scrollSpeed = 1.0;

  // Restore State from chrome.storage
  const stored = await chrome.storage.local.get(['activeStep', 'scriptIdea', 'aspectRatio', 'voiceoverText']);

  if (stored.scriptIdea) inputScriptIdea.value = stored.scriptIdea;
  if (stored.voiceoverText) teleprompterText.innerText = stored.voiceoverText;
  if (stored.aspectRatio) {
    const radio = document.querySelector(`input[name="aspect-ratio"][value="${stored.aspectRatio}"]`);
    if (radio) radio.checked = true;
  }

  // Switch to saved step
  switchStep(stored.activeStep || 0);

  // Stepper Switch
  function switchStep(stepIndex) {
    stepIndex = parseInt(stepIndex, 10);
    stepperSteps.forEach((step, idx) => {
      if (idx === stepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
      if (idx < stepIndex) {
        step.classList.add('completed');
      } else {
        step.classList.remove('completed');
      }
    });

    phasePanels.forEach((panel, idx) => {
      if (idx === stepIndex) {
        panel.style.display = 'flex';
        panel.classList.add('active');
      } else {
        panel.style.display = 'none';
        panel.classList.remove('active');
      }
    });

    chrome.storage.local.set({ activeStep: stepIndex });
  }

  stepperSteps.forEach((step) => {
    step.addEventListener('click', () => {
      const stepIdx = step.dataset.step;
      switchStep(stepIdx);
    });
  });

  // Reset Project
  btnResetProject.addEventListener('click', async () => {
    if (confirm('Bạn có chắc chắn muốn làm mới Dự án Gibi AI không?')) {
      await chrome.storage.local.clear();
      inputScriptIdea.value = '';
      teleprompterText.innerText = 'Chưa có kịch bản thoại. Hãy chạy Giai đoạn 2 trên Gemini để Gibi AI tải kịch bản...';
      window.location.reload();
    }
  });

  // Smart Helper: Auto-detect, switch to, or create Gemini Tab automatically!
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

    try {
      const response = await chrome.tabs.sendMessage(geminiTab.id, { action, ...payload });
      return response;
    } catch (err) {
      console.warn('[GIBI AI] Content script not responding, attempting dynamic injection...', err);
      try {
        await chrome.scripting.executeScript({
          target: { tabId: geminiTab.id },
          files: ['scripts/content-gemini.js']
        });
        
        await new Promise((resolve) => setTimeout(resolve, 300));
        const response = await chrome.tabs.sendMessage(geminiTab.id, { action, ...payload });
        return response;
      } catch (retryErr) {
        console.error('[GIBI AI] Retry failed:', retryErr);
        alert('Gibi AI vừa tự động mở trang Gemini Chat cho bạn rồi nè! Hãy bấm lại nút lệnh để chạy nhé.');
        return null;
      }
    }
  }

  // Phase 0: Start Project with FULL UNTOUCHED MEGA PROMPT
  btnStartPhase0.addEventListener('click', async () => {
    const scriptIdea = inputScriptIdea.value.trim();
    if (!scriptIdea) {
      alert('Vui lòng nhập Ý tưởng / Kịch bản video của bạn!');
      return;
    }

    const selectedRatio = document.querySelector('input[name="aspect-ratio"]:checked').value;
    await chrome.storage.local.set({ scriptIdea, aspectRatio: selectedRatio });

    const fullInjectionPrompt = `⚠️ [CẤU HÌNH XƯNG HÔ THỜI GIAN THỰC]:
Bạn là Trợ lý GIBI AI — chuyên gia đồng hành đạo diễn phim hoạt hình 2D phong cách Studio Ghibli. Hãy tự xưng là "Gibi AI" và gọi người dùng là "bạn" trong toàn bộ quá trình sản xuất phim nhé!

${FULL_MEGA_PROMPT}

Dưới đây là thông tin khởi tạo dự án:
1. Ý tưởng/Kịch bản: "${scriptIdea}"
2. Tải lên ảnh chân dung: Bạn đã chuẩn bị ảnh chân dung để đính kèm.
3. Tỷ lệ video: Aspect ratio ${selectedRatio}`;

    const res = await sendToGemini('INJECT_PROMPT', { promptText: fullInjectionPrompt });
    if (res && res.success) {
      phase0Guidance.style.display = 'block';
    }
  });

  // Transition from Phase 0 to Phase 1 after photo upload & portrait image generation
  btnGotoStep1.addEventListener('click', () => {
    switchStep(1);
  });

  // Phase 1: Lock Face
  btnLockFaceYes.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '1' });
    if (res && res.success) switchStep(2);
  });

  btnLockFaceNo.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '2' });
  });

  btnLockFaceReupload.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '3' });
    alert('Đã gửi yêu cầu [Gõ 3]! Bạn hãy tải 1-3 bức ảnh chân dung mới lên ô chat Gemini để AI quét lại nét mặt nhé.');
  });

  // Phase 2: Storyboard & Teleprompter
  btnExtractVoiceover.addEventListener('click', async () => {
    const res = await sendToGemini('EXTRACT_VOICEOVER');
    if (res && res.lines && res.lines.length > 0) {
      const formattedText = res.lines.map((line, idx) => `[Câu ${idx + 1}]: ${line}`).join('\n\n');
      teleprompterText.innerText = formattedText;
      await chrome.storage.local.set({ voiceoverText: formattedText });
      alert(`Đã trích xuất thành công ${res.lines.length} câu thoại vào Teleprompter của Gibi AI!`);
    } else {
      alert('Chưa tìm thấy dòng thoại nào trên Gemini. Vui lòng đảm bảo Gemini đã xuất xong kịch bản Giai đoạn 2!');
    }
  });

  btnSelectScript1.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '1' });
    if (res && res.success) switchStep(3);
  });

  btnSelectScript2.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '2' });
    if (res && res.success) switchStep(3);
  });

  // Teleprompter Player Controls
  sliderSpeed.addEventListener('input', (e) => {
    scrollSpeed = parseFloat(e.target.value);
    speedVal.innerText = `${scrollSpeed.toFixed(1)}x`;
  });

  function startTeleprompter() {
    if (isTeleprompterRunning) return;
    isTeleprompterRunning = true;

    teleprompterInterval = setInterval(() => {
      teleprompterScreen.scrollTop += scrollSpeed * 1.5;
      if (teleprompterScreen.scrollTop + teleprompterScreen.clientHeight >= teleprompterScreen.scrollHeight) {
        stopTeleprompter();
      }
    }, 40);
  }

  function stopTeleprompter() {
    isTeleprompterRunning = false;
    if (teleprompterInterval) clearInterval(teleprompterInterval);
  }

  btnTeleprompterPlay.addEventListener('click', startTeleprompter);
  btnTeleprompterPause.addEventListener('click', stopTeleprompter);

  // Phase 3: Field Directing
  dropzoneLiveAction.addEventListener('click', () => inputFileLiveAction.click());
  inputFileLiveAction.addEventListener('change', async (e) => {
    if (e.target.files && e.target.files[0]) {
      alert('Đã nhận ảnh diễn xuất! Vui lòng đính kèm bức ảnh này vào ô chat Gemini và nhấn Gửi.');
      switchStep(4);
    }
  });

  btnUseAutoScene.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '0' });
    if (res && res.success) switchStep(4);
  });

  // Phase 4 & 5: Google Flow Veo 3 Bridge & Batch Production
  btnOpenGoogleFlow.addEventListener('click', async () => {
    await chrome.runtime.sendMessage({
      target: 'background',
      action: 'OPEN_FLOW_TAB'
    });
  });

  btnBatchRow1.addEventListener('click', async () => {
    await sendToGemini('INJECT_PROMPT', { promptText: '1' });
  });

  btnBatchRow2.addEventListener('click', async () => {
    await sendToGemini('INJECT_PROMPT', { promptText: '1' });
  });

  btnBatchRow3.addEventListener('click', async () => {
    await sendToGemini('INJECT_PROMPT', { promptText: '1' });
  });

  btnBatchRow4.addEventListener('click', async () => {
    await sendToGemini('INJECT_PROMPT', { promptText: '1' });
  });
});
