// GIBI AI Studio - Sidepanel Controller JavaScript

document.addEventListener('DOMContentLoaded', async () => {
  console.log('[GIBI AI] SidePanel Controller Loaded');

  // Elements
  const stepperSteps = document.querySelectorAll('.stepper-step');
  const phasePanels = document.querySelectorAll('.phase-panel');

  const inputScriptIdea = document.getElementById('input-script-idea');
  const btnStartPhase0 = document.getElementById('btn-start-phase-0');
  const btnResetProject = document.getElementById('btn-reset-project');

  const btnLockFaceYes = document.getElementById('btn-lock-face-yes');
  const btnLockFaceNo = document.getElementById('btn-lock-face-no');

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
        panel.classList.add('active');
      } else {
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
    if (confirm('Bạn có chắc chắn muốn làm mới Dự án GIBI AI không?')) {
      await chrome.storage.local.clear();
      inputScriptIdea.value = '';
      teleprompterText.innerText = 'Chưa có kịch bản thoại. Hãy chạy Giai đoạn 2 trên Gemini để tải kịch bản...';
      switchStep(0);
    }
  });

  // Helper: Send message to active Gemini Tab
  async function sendToGemini(action, payload = {}) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      alert('Vui lòng mở tab Gemini Chat (gemini.google.com) trước khi thực hiện!');
      return null;
    }

    if (!tab.url || !tab.url.includes('gemini.google.com')) {
      alert('Tab hiện tại không phải là Gemini Chat. Vui lòng chuyển sang tab gemini.google.com!');
      return null;
    }

    try {
      const response = await chrome.tabs.sendMessage(tab.id, { action, ...payload });
      return response;
    } catch (err) {
      alert('Không thể kết nối với Gemini Chat. Vui lòng F5 làm mới lại trang Gemini.');
      return null;
    }
  }

  // Phase 0: Start Project
  btnStartPhase0.addEventListener('click', async () => {
    const scriptIdea = inputScriptIdea.value.trim();
    if (!scriptIdea) {
      alert('Vui lòng nhập Ý tưởng / Kịch bản video của bạn!');
      return;
    }

    const selectedRatio = document.querySelector('input[name="aspect-ratio"]:checked').value;
    await chrome.storage.local.set({ scriptIdea, aspectRatio: selectedRatio });

    const phase0Prompt = `Chào bạn! Tôi muốn bắt đầu sản xuất phim hoạt hình Ghibli.
Dưới đây là thông tin khởi tạo dự án của tôi:
1. Ý tưởng/Kịch bản: "${scriptIdea}"
2. Tỷ lệ video: Aspect ratio ${selectedRatio}

Hãy kích hoạt [GIAI ĐOẠN 0] và dẫn dắt tôi sang [GIAI ĐOẠN 1: ÉP KHUÔN NHÂN VẬT] ngay nhé!`;

    const res = await sendToGemini('INJECT_PROMPT', { promptText: phase0Prompt });
    if (res && res.success) {
      switchStep(1);
    }
  });

  // Phase 1: Lock Face
  btnLockFaceYes.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '1' });
    if (res && res.success) switchStep(2);
  });

  btnLockFaceNo.addEventListener('click', async () => {
    const res = await sendToGemini('INJECT_PROMPT', { promptText: '2' });
  });

  // Phase 2: Storyboard & Teleprompter
  btnExtractVoiceover.addEventListener('click', async () => {
    const res = await sendToGemini('EXTRACT_VOICEOVER');
    if (res && res.lines && res.lines.length > 0) {
      const formattedText = res.lines.map((line, idx) => `[Câu ${idx + 1}]: ${line}`).join('\n\n');
      teleprompterText.innerText = formattedText;
      await chrome.storage.local.set({ voiceoverText: formattedText });
      alert(`Đã trích xuất thành công ${res.lines.length} câu thoại vào Teleprompter!`);
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
