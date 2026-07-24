// sidepanel.js — Chat logic controller for Miss Idea Script Coach Panel (Gemini & ChatGPT support)

document.addEventListener("DOMContentLoaded", async () => {
  // DOM Elements
  const cw = document.getElementById("cw");
  const uin = document.getElementById("uin");
  const sbtn = document.getElementById("sbtn");
  const qtags = document.getElementById("qtags");
  const prog = document.getElementById("prog");
  const brandTitle = document.querySelector(".brand-title");
  const titleText = document.getElementById("title-text");
  const editNameBtn = document.getElementById("edit-name-btn");

  // State Management
  let step = 0;
  let busy = false;
  let waitingToOpen = false;

  let userData = {
    studentName: "",
    product: "",
    objection: "",
    duration: ""
  };

  // Click to reset name (Title click listener)
  if (brandTitle) {
    brandTitle.style.cursor = "pointer";
    brandTitle.title = "Nhấp chuột để đổi tên";
    brandTitle.addEventListener("click", async () => {
      if (confirm("Bạn có muốn đổi tên không?")) {
        await chrome.storage.local.remove("studentName");
        window.location.reload();
      }
    });
  }

  // Pencil icon click listener
  if (editNameBtn) {
    editNameBtn.addEventListener("click", async (e) => {
      e.stopPropagation(); // Stop event bubbling to parent title listener
      if (confirm("Bạn có muốn đổi tên không?")) {
        await chrome.storage.local.remove("studentName");
        window.location.reload();
      }
    });
  }

  // Update header text dynamically
  function updateBrandHeader(name) {
    if (titleText) {
      titleText.textContent = `Miss Idea của ${name}`;
    }
  }

  // 1. CHUNK TYPEWRITER ANIMATION
  function chunk(el, html, n = 3, ms = 12) {
    return new Promise((resolve) => {
      el.innerHTML = '';
      const tokens = [];
      const re = /(<[^>]+>|&[^;]+;|[\s\S])/g;
      let m;
      while ((m = re.exec(html)) !== null) tokens.push(m[0]);
      
      let i = 0;
      const CUR = '<span class="cur"></span>';
      
      function tick() {
        if (i >= tokens.length) {
          el.innerHTML = html;
          resolve();
          return;
        }
        let added = 0;
        while (i < tokens.length && added < n) {
          i++;
          if (!tokens[i - 1].startsWith('<')) added++;
        }
        el.innerHTML = tokens.slice(0, i).join('') + CUR;
        scrollB();
        const last = tokens[i - 1] || '';
        const delay = last === '.' || last === '!' || last === '?' ? 120 : last === ',' ? 60 : ms;
        setTimeout(tick, delay);
      }
      tick();
    });
  }

  // 2. CHAT BUILDERS
  async function ideaSay(html) {
    busy = true;
    toggleInput(false);
    
    const row = document.createElement('div');
    row.className = 'msg';
    const ideaGradId = 'idea-g-' + Math.random().toString(36).substr(2, 9);
    row.innerHTML = `
      <div class="mav idea">
        <svg viewBox="0 0 24 24" width="20" height="20" style="display: block;">
          <defs>
            <linearGradient id="${ideaGradId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8B5CF6" />
              <stop offset="50%" stop-color="#A78BFA" />
              <stop offset="100%" stop-color="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.76 11.1l-.76.53V16H10v-2.37l-.76-.53C7.81 12.08 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.81 3.08-2.24 4.1z" fill="url(#${ideaGradId})" />
          <path d="M12 6a3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 0-2z" fill="#A78BFA" opacity="0.9" />
        </svg>
      </div>
      <div class="bubble"><div class="txt"></div>
      <div class="bm"><svg viewBox="0 0 24 24" width="10" height="10" fill="var(--primary-color)" style="margin-right:2px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ${getNowTime()}</div></div>`;
    
    const txt = row.querySelector('.txt');
    cw.appendChild(row);
    scrollB();
    
    await chunk(txt, html, 3, 10);
    busy = false;
    toggleInput(true);
  }

  function userSay(text) {
    const row = document.createElement('div');
    row.className = 'msg user';
    row.innerHTML = `
      <div class="mav human"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="display: block;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
      <div class="bubble"><div class="txt"></div>
      <div class="bm"><svg viewBox="0 0 24 24" width="10" height="10" fill="#555" style="margin-right:2px"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ${getNowTime()}</div></div>`;
    
    row.querySelector('.txt').textContent = text;
    cw.appendChild(row);
    scrollB();
  }

  // 3. ASK FOR NAME (PERSONALIZATION START)
  async function askName() {
    await ideaSay(
      '👋 Chào bạn! Mình là <span class="h">Miss Idea 💡</span> — người bạn đồng hành cố vấn kịch bản video Talking Head.<br><br>' +
      'Trước khi bắt đầu, **bạn tên là gì** để mình tiện xưng hô và cá nhân hóa người bạn đồng hành này nhé?'
    );
    uin.placeholder = "Nhập tên của bạn...";
    uin.focus();
  }

  function detectGender(name) {
    if (!name) return 'neutral';
    const lowercaseName = name.toLowerCase();
    
    // Male name keywords
    const maleKeywords = [
      'việt', 'nam', 'đức', 'hải', 'tuấn', 'hùng', 'cường', 'minh', 'hoàng', 'sơn', 'trung', 'bình', 
      'thành', 'phong', 'kiên', 'dũng', 'khánh', 'long', 'tùng', 'quang', 'huy', 'thắng', 'phúc', 
      'bảo', 'duy', 'lâm', 'quốc', 'tấn', 'toàn', 'vinh', 'khải', 'khoa', 'vũ', 'hiếu', 'đông', 
      'quân', 'bách', 'trường', 'đạt', 'lộc', 'hữu', 'văn', 'thế', 'quý'
    ];
    
    // Female name keywords
    const femaleKeywords = [
      'thị', 'hương', 'trang', 'lan', 'thảo', 'linh', 'hoa', 'mai', 'hằng', 'nhi', 'hồng', 'vy', 
      'trúc', 'châm', 'ngọc', 'vân', 'nguyên', 'phương', 'thu', 'tuyết', 'dung', 'chi', 'quỳnh', 
      'oanh', 'liên', 'huệ', 'giang', 'bích', 'hiền', 'yến', 'thúy', 'diệp', 'hà', 'hạnh', 'mơ', 
      'cúc', 'ly', 'xuân'
    ];

    if (lowercaseName.includes(' văn ') || lowercaseName.startsWith('văn ') || lowercaseName.endsWith(' văn')) return 'male';
    if (lowercaseName.includes(' thị ') || lowercaseName.startsWith('thị ') || lowercaseName.endsWith(' thị')) return 'female';

    const words = lowercaseName.split(/\s+/);
    for (const word of words) {
      if (maleKeywords.includes(word)) return 'male';
      if (femaleKeywords.includes(word)) return 'female';
    }
    
    return 'neutral';
  }

  // 4. BOOTSTRAP INITIAL QUESTION
  async function askQ1() {
    setProgress(0, 3);
    const nameStr = userData.studentName ? userData.studentName : "bạn";
    await ideaSay(
      `🍵 Chào ${nameStr}. Mình là <span class="h">Miss Idea</span> — Trợ lý Cố vấn Nội dung của bạn.<br><br>` +
      `<em>Hôm nay ta uống chén trà,<br>` +
      `Cùng làm kịch bản thật thà tự nhiên.</em> 🍵<br><br>` +
      `💡 **BÀI HỌC TƯ DUY (Bước 1):** Làm video dễ nhất không phải là cố tỏ ra thú vị, mà là giải đáp đúng nỗi sợ của khách hàng. Khách hết lăn tăn = Khách chốt đơn.<br><br>` +
      `❓ **CÂU HỎI KHAI VẤN:** Trước hết, ${nameStr} đang **kinh doanh sản phẩm hoặc dịch vụ gì**?`
    );

    const gender = detectGender(userData.studentName);
    if (gender === 'male') {
      renderTags([
        'Dịch vụ bảo dưỡng xe máy tại nhà 🛠️',
        'Bán mật ong rừng nguyên chất 🐝',
        'Tư vấn thi công nội thất căn hộ 📐'
      ]);
    } else if (gender === 'female') {
      renderTags([
        'Dịch vụ Spa trị mụn tại nhà 💆‍♀️',
        'Kinh doanh yến sào Khánh Hòa 🪺',
        'Đồ trang sức thủ công handmade 💍'
      ]);
    } else {
      renderTags([
        'Bán mật ong rừng nguyên chất 🐝',
        'Dịch vụ giặt sofa tại nhà 🧼',
        'Kinh doanh đồ gia dụng thông minh 🔌'
      ]);
    }

    uin.placeholder = "Nhập sản phẩm hoặc dịch vụ...";
    uin.focus();
  }

  // 5. ACTION PROCESSOR
  async function send() {
    const val = uin.value.trim();
    if (!val || busy) return;

    // Direct support for typing 'reset' or 'đổi tên' in chat
    if (val.toLowerCase() === "/reset" || val.toLowerCase() === "đổi tên" || val.toLowerCase() === "reset") {
      userSay(val);
      uin.value = '';
      await ideaSay("🔄 Đang xóa dữ liệu tên học viên cũ và khởi động lại...");
      await sleep(800);
      await chrome.storage.local.remove("studentName");
      window.location.reload();
      return;
    }

    userSay(val);
    uin.value = '';
    clearTags();
    toggleInput(false);

    await sleep(400);

    // SUB-STATE: WAITING FOR TAB TO BE OPENED
    if (waitingToOpen) {
      if (val.includes("Gửi kịch bản ngay")) {
        await executePromptLaunch();
      } else if (val.includes("ChatGPT")) {
        await chrome.tabs.create({ url: 'https://chatgpt.com' });
        await ideaSay("🚀 Mình đã mở tab ChatGPT mới rồi! Đợi trang tải xong, bạn bấm nút <strong>'Gửi kịch bản ngay ⚡'</strong> ở dưới để bắt đầu nhé.");
        renderTags(["⚡ Gửi kịch bản ngay"]);
      } else if (val.includes("Gemini")) {
        await chrome.tabs.create({ url: 'https://gemini.google.com' });
        await ideaSay("🚀 Mình đã mở tab Gemini mới rồi! Đợi trang tải xong, bạn bấm nút <strong>'Gửi kịch bản ngay ⚡'</strong> ở dưới để bắt đầu nhé.");
        renderTags(["⚡ Gửi kịch bản ngay"]);
      }
      return;
    }

    // STATE -1: COLLECTING NAME
    if (step === -1) {
      const name = val;
      await chrome.storage.local.set({ studentName: name });
      userData.studentName = name;
      updateBrandHeader(name);

      await ideaSay(`🎉 Tuyệt vời! Từ bây giờ, mình là **Miss Idea của ${name}** 🍵. Rất vui được đồng hành cùng ${name}!`);
      await sleep(500);

      step = 0;
      askQ1();
      return;
    }

    // STATE 0: PRODUCT SUBMITTED -> ASK FOR OBJECTION
    if (step === 0) {
      userData.product = val;
      setProgress(1, 3);
      const nameStr = userData.studentName ? userData.studentName : "bạn";

      await ideaSay(`📥 Đã ghi nhận sản phẩm/dịch vụ của ${nameStr}: <strong>"${val}"</strong>.`);
      await sleep(300);

      await ideaSay(
        `❓ Khi tư vấn, **khách hàng hay sợ, chê, hoặc thắc mắc điều gì nhất** trước khi xuống tiền mua sản phẩm/dịch vụ của ${nameStr}?`
      );
      
      step = 1;
      renderTags([
        'Khách sợ hàng giả, pha tạp chất 🚫',
        'Khách chê giá đắt hơn thị trường 💸',
        'Khách sợ dùng không hiệu quả, tốn tiền 🩺',
        'Khách lo ngại bảo hành, chăm sóc sau mua 🛠️'
      ]);
      uin.placeholder = "Khách hàng hay lo sợ điều gì nhất...";
      toggleInput(true);

    } else if (step === 1) {
      // STATE 1: OBJECTION SUBMITTED -> ASK FOR DURATION
      userData.objection = val;
      setProgress(2, 3);
      const nameStr = userData.studentName ? userData.studentName : "bạn";

      await ideaSay(`📥 Đã ghi nhận nỗi sợ của khách: <strong>"${val}"</strong>.`);
      await sleep(300);

      await ideaSay(
        `⏱️ Cuối cùng, ${nameStr} muốn độ dài kịch bản Talking Head này khoảng bao nhiêu giây để mình thiết kế mật độ từ thoại phù hợp?`
      );

      step = 2;
      renderTags([
        '⏱️ 45 giây (Ngắn gọn, súc tích)',
        '🎥 60 giây (Tiêu chuẩn, truyền tải tốt)',
        '🎬 90 giây (Chia sẻ sâu & Thuyết phục)',
        '📢 2 phút (Phân tích ngách sâu sắc)'
      ]);
      uin.placeholder = "Chọn thời lượng video...";
      toggleInput(false); // Force selecting chip

    } else if (step === 2) {
      // STATE 2: DURATION SUBMITTED -> LAUNCH
      let durVal = val;
      let durSec = "60";
      if (durVal.includes("45")) durSec = "45";
      else if (durVal.includes("90")) durSec = "90";
      else if (durVal.includes("2 phút")) durSec = "120";

      userData.duration = durSec;
      
      await executePromptLaunch();
    }
  }

  // 6. AUTO-INJECTION AND IMMEDIATE LAUNCH
  async function executePromptLaunch() {
    setProgress(3, 3);
    toggleInput(false);
    
    await ideaSay(`⚡ Đang chuẩn bị dữ liệu và kết nối với trang chat AI để dựng kịch bản...`);
    await sleep(350);

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Check if user is currently on a supported tab
    const isSupported = tab && tab.url && (tab.url.includes("gemini.google.com") || tab.url.includes("chatgpt.com"));
    
    if (!isSupported) {
      await ideaSay(
        `⚠️ Mình chưa tìm thấy tab ChatGPT hoặc Gemini nào đang mở ở cửa sổ trình duyệt hiện tại.<br><br>` +
        `Bạn hãy chọn nền tảng muốn sử dụng bên dưới, mình sẽ tự động mở ra giúp nhé:`
      );
      waitingToOpen = true;
      renderTags([
        "💬 Mở & Gửi sang ChatGPT",
        "✨ Mở & Gửi sang Gemini"
      ]);
      return;
    }

    waitingToOpen = false;

    // Auto-inject and auto-send
    try {
      // Inject content.js on-demand
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });

      const promptText = buildPrompt();

      // Send instruction safely
      const response = await new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "INJECT_PROMPT",
          prompt: promptText
        }, (res) => {
          const err = chrome.runtime.lastError;
          if (err) {
            resolve({ success: false, error: err.message });
          } else {
            resolve(res);
          }
        });
      });

      if (response && response.success) {
        showToast("🎉 Khởi chạy kịch bản thành công!");
        await sleep(1000);
        window.close(); // Close side panel immediately after 1s
      } else {
        throw new Error(response ? response.error : "Không kết nối được với trang AI.");
      }
    } catch (err) {
      console.error(err);
      await renderFallbackPromptBox(err.message);
    }
  }

  // 7. RENDER FALLBACK PROMPT BOX (Manual Copy Fallback)
  async function renderFallbackPromptBox(errorMsg) {
    await ideaSay(
      `<span style="color:#a78bfa;"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="display:inline-block; vertical-align:middle; margin-right:4px;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg> ⚠️ Lỗi kết nối tự động:</span> ${errorMsg}.<br><br>` +
      `Đã chuyển sang chế độ thủ công 🛠️. Bạn hãy bấm nút sao chép prompt bên dưới và dán trực tiếp vào trang chat AI nhé:`
    );

    const promptText = buildPrompt();
    const pid = 'pr_' + Date.now();

    const row = document.createElement('div');
    row.className = 'msg';
    const ideaGradPromptId = 'idea-g-p-' + Math.random().toString(36).substr(2, 9);
    row.innerHTML = `
      <div class="mav idea">
        <svg viewBox="0 0 24 24" width="20" height="20" style="display: block;">
          <defs>
            <linearGradient id="${ideaGradPromptId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#8B5CF6" />
              <stop offset="50%" stop-color="#A78BFA" />
              <stop offset="100%" stop-color="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.76 11.1l-.76.53V16H10v-2.37l-.76-.53C7.81 12.08 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.81 3.08-2.24 4.1z" fill="url(#${ideaGradPromptId})" />
          <path d="M12 6a3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 0-2z" fill="#A78BFA" opacity="0.9" />
        </svg>
      </div>
      <div class="bubble" style="max-width:100%; border-color: rgba(139, 92, 246, 0.3)">
        <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px">📝 Script Prompt Cố Vấn của bạn:</div>
        <div class="pbox" id="${pid}"><button class="cpbtn">📋 Sao chép</button>${escapeHtml(promptText)}</div>
        <div class="btn-row" style="flex-direction: column; gap: 8px;">
          <button class="open-ai-btn" id="btn-send-chatgpt" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); box-shadow: 0 4px 10px rgba(139, 92, 246, 0.2);">
            💬 Mở & Gửi sang ChatGPT ⚡
          </button>
          <button class="open-ai-btn gemini" id="btn-send-gemini" style="background: linear-gradient(135deg, #a78bfa, #8b5cf6); box-shadow: 0 4px 10px rgba(167, 139, 250, 0.2);">
            ✨ Mở & Gửi sang Gemini ⚡
          </button>
        </div>
      </div>`;

    const cpBtn = row.querySelector('.cpbtn');
    cpBtn.onclick = () => copyText(promptText);

    const btnChatGPT = row.querySelector('#btn-send-chatgpt');
    const btnGemini = row.querySelector('#btn-send-gemini');

    btnChatGPT.onclick = async () => {
      await handleSendAction("chatgpt.com", btnChatGPT, promptText);
    };

    btnGemini.onclick = async () => {
      await handleSendAction("gemini.google.com", btnGemini, promptText);
    };

    cw.appendChild(row);
    scrollB();

    clearTags();
    const rb = document.createElement('button');
    rb.className = 'qt';
    rb.innerHTML = '🔄 Soạn kịch bản mới từ đầu';
    rb.onclick = () => {
      window.location.reload();
    };
    qtags.appendChild(rb);
  }

  // 8. ACTION SEND HANDLER
  async function handleSendAction(domain, button, promptText) {
    const originalContent = button.innerHTML;
    button.disabled = true;
    button.textContent = "🔄 Đang kết nối...";

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const matchesDomain = tab && tab.url && tab.url.includes(domain);

    if (!matchesDomain) {
      const platformName = domain.includes("chatgpt") ? "ChatGPT" : "Gemini";
      const targetUrl = domain.includes("chatgpt") ? "https://chatgpt.com" : "https://gemini.google.com";
      
      await ideaSay(
        `⚠️ Bạn cần mở tab <strong class="h">${platformName}</strong> để gửi kịch bản nhé.<br><br>` +
        `🚀 Mình đang tự động mở tab mới giúp bạn. Khi trang tải xong, hãy nhấn lại nút <strong>"Gửi sang ${platformName} ⚡"</strong> để chạy.`
      );
      
      await chrome.tabs.create({ url: targetUrl });
      
      button.disabled = false;
      button.innerHTML = originalContent;
      return;
    }

    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      });

      const response = await new Promise((resolve) => {
        chrome.tabs.sendMessage(tab.id, {
          action: "INJECT_PROMPT",
          prompt: promptText
        }, (res) => {
          const err = chrome.runtime.lastError;
          if (err) {
            resolve({ success: false, error: err.message });
          } else {
            resolve(res);
          }
        });
      });

      if (response && response.success) {
        showToast("🎉 Đã nạp và gửi prompt tự động!");
        button.disabled = false;
        button.innerHTML = `🎉 Đã nạp thành công`;
        button.style.background = "linear-gradient(135deg, #10b981, #059669)";
        
        await sleep(1000);
        window.close(); // Close side panel immediately after 1s
      } else {
        throw new Error(response ? response.error : "Không nhận được phản hồi nạp dữ liệu.");
      }
    } catch (e) {
      console.error(e);
      await ideaSay(`⚠️ Lỗi gửi tự động: ${e.message}. Bạn hãy copy kịch bản thủ công bằng nút bên trên nhé. 🛠️`);
      button.disabled = false;
      button.innerHTML = originalContent;
    }
  }

  // 9. BUILD PROMPT TEMPLATE
  function buildPrompt() {
    const nameStr = userData.studentName ? userData.studentName : "tôi";
    return `[ĐỊNH VỊ VAI TRÒ]
Bạn là "Trợ lý Cố vấn Nội dung" - một Mentor điềm đạm, tinh tế và thấu hiểu kinh doanh. Nhiệm vụ của bạn là dắt tay tôi (${nameStr} - chủ doanh nghiệp nhỏ) tự lên kịch bản video Talking Head.
Hãy tự xưng là "Miss Idea của ${nameStr}" và gọi tôi là "${nameStr}" trong cuộc đối thoại giữa Mentor và học viên để tạo sự gần gũi.

⚠️ [QUY TẮC XƯNG HÔ VÀ TÊN RIÊNG TRONG KỊCH BẢN VIDEO - BẮT BUỘC TUÂN THỦ 100%]:
Trong toàn bộ nội dung kịch bản video Talking Head (bao gồm cả phần Lời thoại đọc trước máy quay và phần Mô tả hành động/B-roll):
1. Tuyệt đối KHÔNG được viết tên riêng "${nameStr}" vào trong lời thoại (Ví dụ: CẤM viết "Với ${nameStr}...", "${nameStr} bảo hành...", "${nameStr} nghĩ là..."). Lời thoại của người nói trước ống kính phải xưng là "mình", "em", "tôi", hoặc xưng hô linh hoạt, tự nhiên nhất tùy theo ngách nội dung kịch bản để giống người thật nói thường ngày. Tuyệt đối không xưng bằng tên riêng vì nghe rất gượng gạo, sáo rỗng và giả tạo.
2. Tuyệt đối KHÔNG được viết tên riêng "${nameStr}" vào trong các ghi chú hành động hoặc B-roll (Ví dụ: CẤM viết "[${nameStr} nhìn thẳng vào ống kính]", "[${nameStr} mỉm cười]"). Hãy thay bằng "[Bạn nhìn thẳng vào ống kính]", "[Bạn mỉm cười]", hoặc "[Người nói...]" hoặc ghi hành động khách quan.
3. Tên riêng "${nameStr}" chỉ được phép xuất hiện ở phần nhận xét, giải thích, bài học tư duy hoặc câu hỏi khai vấn của bạn (AI) khi đối thoại trực tiếp với tôi ở ngoài kịch bản video.

# RÀNG BUỘC PHÂN DÒNG & SỐ TỪ THỰC TẾ (BẮT BUỘC TUÂN THỦ)
Để đảm bảo mật độ từ vựng chính xác và không viết thiếu từ cho từng mốc thời gian:
* **Video 45s (~110 từ thoại):** Bắt buộc gồm 1 phân đoạn Mở bài (15 từ) + 2 phân đoạn Thân bài (mỗi đoạn ~35 từ) + 1 phân đoạn Kết luận (15 từ).
* **Video 60s (~150 từ thoại):** Bắt buộc gồm 1 phân đoạn Mở bài (20 từ) + 3 đến 4 phân đoạn Thân bài (mỗi đoạn ~30 từ) + 1 phân đoạn Kết luận (20 từ).
* **Video 90s (~220 từ thoại):** Bắt buộc gồm 1 phân đoạn Mở bài (25 từ) + 4 đến 5 phân đoạn Thân bài (mỗi đoạn ~35 từ) + 1 phân đoạn Kết luận (25 từ).
* **Video 2 phút (120s) (~300 từ thoại):** Bắt buộc gồm 1 phân đoạn Mở bài (30 từ) + 5 đến 6 phân đoạn Thân bài (mỗi đoạn ~35 từ) + 1 phân đoạn Kết luận (30 từ).

> ⚠️ **Cảnh báo lỗi đếm từ (Cấm tuyệt đối):** Không được sinh ra kịch bản ngắn (dưới 100 từ) cho video 60s/90s/120s rồi điền bừa số từ giả ở tiêu đề. Bạn phải viết các câu thoại dài ra, đầy đủ phân tích chuyên môn. Sau khi viết xong, hãy đếm chính xác số từ thực tế của lời thoại (chỉ tính phần nằm trong dấu ngoặc kép "") rồi mới ghi vào mô tả (VD: "Số từ thực tế: 145 từ").

⚠️ [CẤM TUYỆT ĐỐI VIẾT LỜI XÁC NHẬN LUẬT CHƠI / QUY TẮC]:
Tuyệt đối KHÔNG bao giờ được viết các câu xác nhận, cam kết tuân thủ quy tắc, hoặc thông báo về việc đã nhận được luật giao tiếp/định dạng kịch bản (Ví dụ: CẤM viết "Tôi đã nắm rõ luật...", "Tôi cam kết tuân thủ...", "Chào bạn, tôi đã nhận được thông tin..."). Hãy đi thẳng vào nội dung chuyên môn và bắt đầu giúp tôi ngay lập tức bằng một lời chào ngắn gọn và đào tạo trực tiếp. Người dùng không cần biết và không muốn nghe giải thích về luật chơi hay các bước tiếp theo, hãy tập trung 100% vào việc hỗ trợ và đưa thông tin giá trị thực tế.

Văn phong toàn bộ cuộc trò chuyện giữa tôi và bạn: Gần gũi, mộc mạc, như hai người đang uống trà bàn công việc. TUYỆT ĐỐI KHÔNG dùng từ sáo rỗng, hô hào, đa cấp.

[QUY TẮC GIAO TIẾP UI/UX TỐI THƯỢNG - ĐỌC KỸ BẮT BUỘC TUÂN THỦ]
Đây là quy trình tương tác "Step-by-step" (Từng bước một). Ở mỗi lượt chat, bạn PHẢI tuân thủ đúng 3 khối sau:
1. 💡 [BÀI HỌC TƯ DUY]: Dạy tôi 1 kiến thức ngắn (2-3 câu) để tôi hiểu TẠI SAO phải làm bước này. 
2. ❓ [CÂU HỎI KHAI VẤN]: Đặt DUY NHẤT 1 CÂU HỎI MỞ hoặc yêu cầu chọn phương án để lấy phản hồi từ tôi. (Không gộp 2 câu hỏi).
3. 🛑 [DỪNG LẠI]: Tuyệt đối không tự ý viết kịch bản hay chuyển bước tiếp theo nếu tôi chưa gõ câu trả lời.

--- BẮT ĐẦU CHUỒI TƯƠNG TÁC THEO TRÌNH TỰ NÀY ---

BƯỚC 1: NHẬP MÔN & ĐỊNH VỊ (CẤP ĐỘ DỄ) - ĐÃ THU THẬP THÔNG TIN BAN ĐẦU
- Sản phẩm/Dịch vụ kinh doanh: "${userData.product}"
- Nỗi lo/Thắc mắc lớn nhất của khách: "${userData.objection}"
- Thời lượng video định hướng: ${userData.duration} giây

Dựa vào thông tin trên, nhiệm vụ đầu tiên của bạn ở lượt chat này là:
1. Đi thẳng vào việc giúp đỡ tôi bằng một lời chào ngắn gọn. Tuyệt đối KHÔNG viết lời hứa hẹn, cam kết hay giải thích về luật chơi.
2. Trình bày chính xác KHỐI ĐÀO TẠO & TẠO ĐỘNG LỰC dưới đây (trong khối trích dẫn >) để truyền cảm hứng về định dạng Talking Head:

> 💡 **Tư duy Xây kênh: Sức mạnh thực sự của việc "Lộ diện"**
> 
> Chào bạn, Miss Idea đây! Có một thực tế thế này: Hình ảnh sản phẩm bóng bẩy thì ai cũng có thể tải về, kịch bản cam kết chất lượng dài ngoằng thì ai cũng có thể nhờ AI viết hộ trong vài giây. 
> 
> Thứ duy nhất trên đời này đối thủ không thể sao chép, không thể làm giả chính là: **Khuôn mặt, giọng nói và sự chân thành của bạn.**
> 
> Đó là lý do định dạng video "Talking Head" (bạn ngồi trực diện, tâm tình và chia sẻ) không phải là một trào lưu để sống ảo. Nó là chiến lược cốt lõi để khách hàng "chọn người" trước khi "chọn hàng", bởi vì:
> 
> * 🛡️ **Khuôn mặt là "Tem bảo hành" đắt giá nhất:** Khách hàng thời nay luôn mang sẵn tâm lý phòng vệ trước những thương hiệu ẩn danh sau bàn phím. Khi bạn dám bước ra ánh sáng, trực tiếp chia sẻ góc nhìn, bạn đang lấy chính uy tín cá nhân để bảo chứng. Người ta luôn mua sự an tâm trước tiên.
> * 🤝 **Phá vỡ rào cản phòng thủ:** Người xem rất ghét cảm giác "bị bán hàng", nhưng lại thích được tư vấn. Một video do bạn tự nói, dù mộc mạc hay vấp váp đôi chút, lại mang đến cảm giác chân thật tột độ. Nó giống như một cuộc trò chuyện 1-1, đập tan sự hoài nghi nhanh hơn vạn lời quảng cáo.
> * 💎 **Định vị bằng thực lực, thoát bẫy đạp giá:** Không ai "mặc nhiên" thành chuyên gia chỉ vì bật máy quay. Nhưng khi bạn điềm tĩnh, lưu loát gỡ rối một vấn đề đau đầu của khách hàng, năng lực của bạn tự động được công nhận. Khách sẽ ở lại vì tin bạn, chứ không bỏ đi vì đối thủ bán rẻ hơn vài đồng.
> 
> *"Văn trơn, bài mẫu ngập tràn,*
> *Sao bằng trực diện, luận bàn thiệt hơn."*
3. Đóng vai trò là một Mentor chuyên sâu, thực hiện phân tích thị trường ngắn gọn về tâm lý của khách hàng khi họ có nỗi sợ/thắc mắc "${userData.objection}" đối với sản phẩm/dịch vụ "${userData.product}". Chỉ ra thực tế tại sao khách hàng lại phòng thủ và cách để vượt qua nó thông qua kịch bản video.
4. Đề xuất 5 hướng đi nội dung chiến lược khác nhau (ví dụ: Tiếp cận thực chứng của chuyên gia, Tiếp cận kể chuyện đồng cảm, Tiếp cận bóc phốt/hiểu lầm phổ biến, Tiếp cận so sánh trực diện, Tiếp cận Case study cụ thể) để giải quyết nỗi sợ này. Mỗi hướng đi viết ngắn gọn khoảng 2 câu mô tả ý tưởng.
5. Đưa ra khối giao tiếp chuẩn của BƯỚC 1 để tôi chọn hướng đi:
   - 💡 [BÀI HỌC TƯ DUY]: Làm video dễ nhất không phải là cố tỏ ra thú vị, mà là giải đáp đúng nỗi sợ của khách hàng. Khi ta phân loại và chọn được hướng đi phù hợp nhất với phong cách và nguồn lực của mình, kịch bản sẽ tự động có hồn và chạm đúng tâm lý người xem.
   - ❓ [CÂU HỎI KHAI VẤN]: "Anh/chị chọn phương án nào trong 5 phương án trên? Hãy gõ số phương án (1, 2, 3, 4 hoặc 5) và nhấn Enter."
   - 🛑 [DỪNG LẠI CHỜ TÔI TRẢ LỜI]

Sau lượt chat này, khi tôi trả lời bằng một con số (1, 2, 3, 4 hoặc 5), bạn hãy tiếp tục thực hiện theo các bước dưới đây:

BƯỚC 2: XUẤT BẢN KỊCH BẢN TALKING HEAD & ĐỀ XUẤT THANH LỌC AI (LƯỢT CHAT 2 CỦA AI)
- Dựa trên phương án chiến lược tôi đã chọn, hãy viết trực tiếp một kịch bản Talking Head hoàn chỉnh dưới dạng **Timeline Roadmap chiều dọc** sử dụng ký tự số khoanh tròn và các nét liên kết thẳng đứng nối tiếp để tối ưu hiển thị trên di động.
- Cấu trúc trình bày bắt buộc tuân thủ đúng mẫu Markdown dưới đây cho từng phân đoạn (tuyệt đối không dùng dạng bảng Markdown/table):

① **Phân đoạn 1: [Tiêu đề phân đoạn ngắn gọn]**
|
|  *Hành động & B-roll:* [Mô tả cụ thể hành động cơ thể hoặc cảnh quay phụ B-roll thực tế lồng ghép vào, tuyệt đối không viết tên "${nameStr}" ở đây]
|  *Lời thoại:* "[Viết câu thoại chi tiết để tôi đọc thành tiếng, tuyệt đối không dùng từ xưng hô là "${nameStr}" ở đây]"
|  *Chữ hiển thị:* [Chữ/Subtitle hoặc chữ tiêu đề hiện to trên màn hình]
|
② **Phân đoạn 2: [Tiêu đề phân đoạn ngắn gọn]**
|
|  *Hành động & B-roll:* [Mô tả hành động cơ thể hoặc B-roll]
|  *Lời thoại:* "[Lời thoại đọc]"
|  *Chữ hiển thị:* [Chữ hiện màn hình]
|
(Tiếp tục xếp chồng dọc nối tiếp nhau cho đến hết các phân đoạn).

- ⚠️ **Lưu ý thiết kế di động cực kỳ quan trọng:** Tuyệt đối KHÔNG dùng dạng bảng Markdown (table), loại bỏ hoàn toàn các thông số thời gian/thời lượng của từng phân đoạn để kịch bản sạch sẽ, dễ cuộn đọc trên màn hình điện thoại đứng.
- Sau đó, hiển thị khối giao tiếp chuẩn để đề xuất thanh lọc ngôn ngữ AI:
  - 💡 [BÀI HỌC TƯ DUY]: "Văn phong thô của AI thường rất dễ bị phát hiện bởi người xem vì dùng từ quá hào nhoáng hoặc sáo rỗng. Việc thanh lọc ngôn từ sẽ giúp video của anh/chị nghe mộc mạc, gần gũi và 'người' hơn rất nhiều."
  - ❓ [CÂU HỎI KHAI VẤN]: "Kịch bản Talking Head của phương án đã chọn đã sẵn sàng. Anh/chị có muốn thanh lọc ngôn ngữ AI để nâng cấp kịch bản nghe tự nhiên như người nói thật không? Hãy gõ 'Có' hoặc 'Đồng ý' và nhấn Enter."
  - 🛑 [DỪNG LẠI CHỜ TÔI TRẢ LỜI]

BƯỚC 3: THANH LỌC NGÔN NGỮ AI & VIẾT LẠI KỊCH BẢN (LƯỢT CHAT 3 CỦA AI)
- Nếu tôi trả lời "Có" hoặc "Đồng ý", bạn hãy lập tức đóng vai là một chuyên gia kịch bản video chuyển đổi và cực kỳ khó tính về mặt ngôn ngữ. Bạn cần:
  1. Chỉ ra và phân tích cụ thể 7 điểm dùng từ ngữ AI, ngôn ngữ quá hào nhoáng, không thực tế, kiểu nói kịch sáo rỗng không giống người nói tự nhiên, logic của hook đại trà, từ ngữ tối nghĩa trong kịch bản vừa viết ở lượt chat trước.
  2. Dựa trên phân tích khó tính đó, hãy viết lại kịch bản Talking Head vừa rồi theo 2 hướng tiếp cận mới tự nhiên và 'người' hơn, trình bày cả 2 phiên bản này theo định dạng **Timeline Roadmap chiều dọc** tương tự (sử dụng ký tự số khoanh tròn ①, ②, ③... và nét dọc |, tuyệt đối không dùng dạng bảng table, không ghi thời lượng phân đoạn và tuyệt đối không xưng tên riêng "${nameStr}" trong lời thoại hay ghi chú):
     - **Hướng tiếp cận 1: Mộc mạc & Gần gũi** (Văn phong tự nhiên như hai người đang uống trà bàn việc).
     - **Hướng tiếp cận 2: Sắc bén & Dứt khoát** (Tập trung thẳng vào giá trị thực tế, loại bỏ mọi từ thừa thãi).
- Sau khi viết xong kịch bản viết lại, hãy hiển thị Menu điều hướng để tôi chọn lựa bước đi tiếp theo:
  - 💡 [BÀI HỌC TƯ DUY]: "Kỷ luật quan trọng hơn động lực. Kênh chỉ lên xu hướng nhờ sự đều đặn làm content mỗi ngày."
  - ❓ [CÂU HỎI KHAI VẤN] (Menu lựa chọn): "Chúc mừng anh/chị đã tinh lọc thành công kịch bản! Bây giờ, anh/chị muốn làm gì tiếp theo? Hãy gõ số lựa chọn:
    - Gõ **1, 2, 3, 4 hoặc 5** để chọn lại phương án chiến lược khác và viết kịch bản mới.
    - Gõ **6** để tiếp tục khai vấn bước tiếp theo (B-roll nâng cao & Storytelling cảm xúc nâng sâu)."
  - 🛑 [DỪNG LẠI CHỜ TÔI TRẢ LỜI]

*(Lưu ý: Nếu ở lượt chat trước tôi trả lời "Không", bạn hãy bỏ qua phần phân tích/viết lại và hiển thị trực tiếp khối Menu lựa chọn ở trên để tôi quyết định bước đi tiếp theo).*

BƯỚC 4: VÒNG LẶP VÔ CỰC (KHÔNG BAO GIỜ KẾT THÚC)
- Nếu tôi gõ các số từ 1 đến 5, hãy quay lại thực hiện viết kịch bản Talking Head cho hướng chiến lược đó dưới dạng Timeline Roadmap chiều dọc và lặp lại quy trình hỏi thanh lọc ngôn từ AI.
- Nếu tôi gõ số 6, hãy chuyển tiếp sang bước khai vấn nâng cao về B-roll và Storytelling cảm xúc, luôn tuân thủ nguyên tắc 3 khối và dừng lại chờ tôi trả lời.

XÁC NHẬN LUẬT: Hãy bắt đầu ngay với phản hồi cho BƯỚC 1 theo yêu cầu trên!`;
  }

  // 10. HELPERS
  function getNowTime() {
    const d = new Date();
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  function scrollB() {
    const chatDiv = document.getElementById('chat');
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }

  function toggleInput(on) {
    uin.disabled = !on;
    sbtn.disabled = !on;
    uin.placeholder = on ? 'Nhập câu trả lời của bạn...' : 'Miss Idea đang phân tích...';
  }

  function setProgress(cur, tot) {
    prog.style.width = ((cur / tot) * 100) + '%';
  }

  function renderTags(tagsList) {
    qtags.innerHTML = '';
    tagsList.forEach((t) => {
      const b = document.createElement('button');
      b.className = 'qt';
      b.textContent = t;
      b.onclick = () => {
        uin.value = t;
        send();
      };
      qtags.appendChild(b);
    });
  }

  // Live monitor status receiver
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "UPDATE_STATUS") {
      const statusBar = document.getElementById("status-bar");
      const statusText = document.getElementById("status-text");
      if (statusBar && statusText) {
        statusBar.style.display = "flex";
        statusText.innerHTML = `<strong>Đang tiến hành:</strong> ${message.statusText}`;
      }
    }
  });

  const statusBarCloseBtn = document.getElementById("close-panel-btn");
  if (statusBarCloseBtn) {
    statusBarCloseBtn.onclick = () => {
      const statusBar = document.getElementById("status-bar");
      if (statusBar) statusBar.style.display = "none";
    };
  }

  function clearTags() {
    qtags.innerHTML = '';
  }

  // escape HTML helper
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2400);
  }

  function copyText(text) {
    (navigator.clipboard?.writeText(text) ?? Promise.reject()).catch(() => {
      const ta = Object.assign(document.createElement('textarea'), { value: text });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    });
    showToast("✓ Đã sao chép prompt!");
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Input Listeners
  sbtn.addEventListener("click", send);
  uin.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      send();
    }
  });

  // Initialize
  // Read studentName on startup
  const { studentName } = await chrome.storage.local.get("studentName");
  if (studentName) {
    userData.studentName = studentName;
    updateBrandHeader(studentName);
    step = 0;
    askQ1();
  } else {
    step = -1;
    askName();
  }
});
