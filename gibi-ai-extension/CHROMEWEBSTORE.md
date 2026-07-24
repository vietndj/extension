# Chrome Web Store Listing — Miss GIBI

This document contains the metadata, description, permissions justification, and version history for the **Miss GIBI — Trợ Lý Đạo Diễn Ghibli** Chrome Extension. Use this information to publish or update the extension in the Chrome Developer Dashboard.

---

## 1. Store Metadata

- **Title (Max 45 chars):** Miss GIBI — Trợ Lý Đạo Diễn Ghibli
- **Summary (Max 132 chars):** Đồng hành sáng tạo phim hoạt hình 2D phong cách Studio Ghibli từ ảnh thực tế và phòng thu đọc thoại Teleprompter.
- **Category:** Productivity / Developer Tools
- **Default Language:** Vietnamese (vi)

---

## 2. Detailed Description (CWS Listing Description)

**Miss GIBI** là Trợ lý Đạo diễn AI chuyên biệt đồng hành cùng học viên và nhà sáng tạo nội dung chuyển thể những câu chuyện, ký ức cá nhân và kịch bản thực tế thành các thước phim hoạt hình 2D mang đậm phong cách cổ tích Studio Ghibli (Hayao Miyazaki aesthetic).

Extension tích hợp trực tiếp vào Side Panel trình duyệt Chrome, giúp tự động hóa toàn bộ quy trình sản xuất phim 16 khung hình chuyên nghiệp kết hợp giữa Google Gemini và công cụ Google Flow (Veo 3):

* **Giai đoạn 0 — Khởi tạo Dự án:** Nạp kịch bản, chọn tỷ lệ khung hình (16:9 / 9:16) và cá nhân hóa danh xưng trợ lý.
* **Giai đoạn 1 — Ép khuôn Đa góc độ (Model Sheet Turnaround):** Phân tích nét mặt từ ảnh chân dung thực tế của bạn để khóa thần thái nhân vật ở 4-5 góc quay tiêu chuẩn (Chính diện, Nghiêng 3/4, Profile, Trên xuống).
* **Giai đoạn 2 — Bảng Storyboard 16 Ô & Ảnh Lưới 4x4:** Thiết lập kịch bản 16 phân cảnh dạng bảng Markdown kèm prompt ảnh lưới 4x4 xem trước.
* **Giai đoạn 3 — Sản xuất Cuốn chiếu từng Frame (Frame 1 đến 16):** Cung cấp hướng dẫn 3 bước trực quan cho từng cảnh (vẽ ảnh tĩnh ➔ mở Google Flow tạo video ➔ xác nhận/chỉnh sửa bối cảnh & vibe).

**Tính năng nổi bật:**
1. **12 Kịch bản Ký ức & Chữa lành Autofill:** Gợi ý nhanh 12 chủ đề hoài niệm sâu sắc (bữa cơm bếp củi, xe đạp của ba, mối tình tuổi học trò, thiền định tâm linh...) tự động điền prompt mồi cá nhân hóa.
2. **Giao diện Side Panel Zero-Scrollbar:** Thiết kế hiện đại, màu sắc Ghibli ấm cúng, tự động dãn khung hiển thị 100% kịch bản.
3. **Nút Copy Prompt Tự động:** Phân loại thông minh nút "📋 Copy Prompt Ảnh" và "🚀 Copy Prompt Video" tự động mở Google Flow.
4. **Phòng thu Đọc thoại Teleprompter:** Tích hợp bộ đọc kịch bản chuyên nghiệp ngay trên màn hình.

---

## 3. Permissions Justification

| Permission / Host | Type | Plain-English Justification |
| :--- | :--- | :--- |
| `sidePanel` | Permission | Required to host the Miss GIBI companion chat interface directly inside Chrome's side panel. |
| `storage` | Permission | Required to save user preferences, project name, script draft, and ratio locally on the device (`chrome.storage.local`). |
| `tabs` | Permission | Required to inspect active tab URLs to detect Gemini and Google Flow tabs and navigate seamlessly. |
| `scripting` | Permission | Required to inject content scripts into Gemini and Google Flow web pages for prompt insertion and codeblock button enhancements. |
| `https://gemini.google.com/*` | Host Permission | Required to communicate with Gemini to inject production prompts and display helper action buttons. |
| `https://labs.google/*` | Host Permission | Required to interact with Google Flow (Veo 3) tool pages for video prompt automation. |

---

## 4. Privacy & Data Use

- **Data Collection:** Miss GIBI does **NOT** collect, store, or transmit any personal data, emails, or browsing history to external servers.
- **Local Processing:** User inputs and project settings are saved locally on your device via `chrome.storage.local`.
- **Third-Party Sharing:** Prompts are only sent directly to Google Gemini or Google Flow tabs upon explicit user action.

---

## 5. Version History

### Version 1.0 (2026-07-24)
- Initial release.
- Complete Studio Ghibli 4-stage movie production workflow.
- Integrated 12 Emotional Memory Idea Chips with rich prompt autofill.
- Zero-body-scrollbar responsive layout with dynamic auto-expanding textarea.
- Dual prompt copy buttons (Image Prompt & Video Prompt with direct Google Flow opening).
