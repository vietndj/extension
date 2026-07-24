document.addEventListener('DOMContentLoaded', () => {
  const templateList = document.getElementById('template-list');
  const searchInput = document.getElementById('searchInput');
  const loading = document.getElementById('loading');
  const errorDiv = document.getElementById('error');
  let allTemplates = [];
  let rawMarkdownText = "";

  // Lấy dữ liệu trực tiếp từ GitHub (Không cần Local Server nữa)
  const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/vietndj/vietmac-brand-voice-data/master/vietmac_brand_voice.md';

  function fetchTemplates() {
    fetch(GITHUB_RAW_URL + '?' + new Date().getTime()) // Add timestamp to prevent caching
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(markdownText => {
        rawMarkdownText = markdownText;
        allTemplates = parseMarkdown(markdownText);
        loading.classList.add('hidden');
        renderList(allTemplates);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
        loading.classList.add('hidden');
        errorDiv.classList.remove('hidden');
        errorDiv.innerHTML = '⚠️ Lỗi kết nối GitHub. Vui lòng kiểm tra mạng!';
      });
  }

  // Hàm Parse Markdown ngay trên Frontend
  function parseMarkdown(data) {
    const sections = data.split('---');
    const templates = [];

    sections.forEach((section, index) => {
      const titleMatch = section.match(/###\s*(.*)/);
      if (!titleMatch) return;
      let title = titleMatch[1].trim();
      title = title.replace(/^\d+\.\d+\.\s*/, '');

      const objMatch = section.match(/\*\s*\*\*Mục tiêu:\*\*(.*)/);
      const objective = objMatch ? objMatch[1].trim() : '';

      const lines = section.split('\n');
      let contentLines = [];
      let inContent = false;
      for (const line of lines) {
        if (line.trim().startsWith('>')) {
          inContent = true;
          const text = line.replace(/^\s*>\s?/, '');
          contentLines.push(text);
        }
      }
      
      const content = contentLines.join('\n');
      if (content) {
        templates.push({
          id: `template-${index}`,
          title: title,
          objective: objective,
          content: content
        });
      }
    });
    return templates;
  }

  function renderList(templates) {
    templateList.innerHTML = '';
    if (templates.length === 0) {
      templateList.innerHTML = '<div class="status-msg">Không tìm thấy mẫu nào phù hợp.</div>';
      return;
    }

    templates.forEach(t => {
      const el = document.createElement('div');
      el.className = 'template-item';
      
      const cleanTitle = t.title.replace(/^Bối cảnh:\s*/, '');
      
      el.innerHTML = `
        <div class="template-title">${cleanTitle}</div>
        <div class="template-objective">${t.objective}</div>
      `;
      
      el.addEventListener('click', () => {
        copyToClipboard(t.content);
        showToast();
      });
      
      templateList.appendChild(el);
    });
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Không thể copy text: ', err);
    });
  }

  let toastTimeout;
  function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    void toast.offsetWidth;
    toast.classList.add('show');
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
  }

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allTemplates.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.objective.toLowerCase().includes(query)
    );
    renderList(filtered);
  });

  const copyAllBtn = document.getElementById('copyAllBtn');
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
      const megaPrompt = `Bạn là VietMac - Chuyên gia đào tạo Quay Dựng Video Thực Chiến. Dưới đây là kho dữ liệu văn phong (Tone & Voice) và các bài viết mẫu của tôi. Hãy đọc kỹ, phân tích cách dùng từ, cách ngắt câu, tư duy trình bày để nhập vai tôi và xử lý yêu cầu tiếp theo của tôi một cách chuẩn xác nhất.\n\n=== KHO DỮ LIỆU VĂN PHONG ===\n\n${rawMarkdownText}`;
      copyToClipboard(megaPrompt);
      showToast();
    });
  }

  fetchTemplates();
});
