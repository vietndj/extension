# Chrome Web Store Listing — Miss Idea

This document contains the metadata, description, permissions justification, and version history for the **Miss Idea** Chrome Extension. Use this information to publish or update the extension in the Chrome Developer Dashboard.

---

## 1. Store Metadata

- **Title (Max 45 chars):** Miss Idea — Trợ Lý Cố Vấn Kịch Bản Video
- **Summary (Max 132 chars):** Đồng hành cùng chủ doanh nghiệp nhỏ tự lên kịch bản video Talking Head từng bước một cực kỳ đơn giản và hiệu quả.
- **Category:** Productivity / Developer Tools
- **Default Language:** Vietnamese (vi)

---

## 2. Detailed Description (CWS Listing Description)

**Miss Idea** là một "Trợ lý Cố vấn Nội dung" — một Mentor điềm đạm, tinh tế và thấu hiểu kinh doanh, hỗ trợ các chủ doanh nghiệp nhỏ hoặc người làm nội dung tự lên kịch bản video ngắn dạng Talking Head một cách dễ dàng và chân thực.

Extension hoạt động ngay trên Side Panel trình duyệt của bạn và đồng bộ trực tiếp với ChatGPT hoặc Gemini để dắt tay bạn qua 4 bước thiết lập kịch bản tiêu chuẩn:

* **Bước 1 — Nhập môn & Định vị (Dễ):** Tập trung vào việc giải đáp nỗi sợ thực tế của khách hàng, đúc kết thành Hook thu hút và 3 ý chính của video.
* **Bước 2 — Sức mạnh của B-roll (Trung bình):** Tự động phân tích và hướng dẫn bạn thời điểm chèn cảnh quay phụ (B-roll) làm bằng chứng trực quan để tăng độ uy tín gấp 10 lần.
* **Bước 3 — Storytelling cảm xúc (Khó):** Chuyển thể nội dung thành một câu chuyện chân thật, đính kèm các ghi chú đạo diễn (như chỗ nào nói chậm, chỗ nào dừng tạo khoảng lặng).
* **Bước 4 — Vòng lặp vô cực:** Khóa các hướng đi nội dung tiếp theo qua menu trắc nghiệm (trả lời thắc mắc, bóc phốt hiểu lầm, kể chuyện cửa hàng) để duy trì kỷ luật làm video mỗi ngày.

**Tính năng chính:**
1. Giao diện chat Side Panel mượt mà, thân thiện với tông màu tím sang trọng.
2. Tự động nạp Mega Prompt tối ưu hóa trực tiếp vào ChatGPT hoặc Gemini chỉ với 1 cú click.
3. Thanh trạng thái đồng bộ thời gian thực (Live Monitor) hiển thị bước kịch bản hiện tại mà AI đang hỗ trợ bạn.
4. Chế độ sao chép thủ công linh hoạt nếu không muốn kết nối tự động.

---

## 3. Permissions Justification

The extension requests the following permissions. Each is required for the core functionality:

| Permission / Host | Type | Plain-English Justification |
| :--- | :--- | :--- |
| `sidePanel` | Permission | Required to host the Miss Idea companion chat interface directly inside the browser's side panel. |
| `tabs` | Permission | Required to inspect the current active tab's URL to identify if the user is on a supported AI site (ChatGPT or Gemini). |
| `scripting` | Permission | Required to inject `content.js` into the active ChatGPT or Gemini page to programmatic fill the text box. |
| `storage` | Permission | Required to save the student's name locally on the device to personalize the interface and prompt headers. |
| `https://gemini.google.com/*` | Host Permission | Required to communicate with Gemini to inject prompts and monitor the generation state. |
| `https://chatgpt.com/*` | Host Permission | Required to communicate with ChatGPT to inject prompts and monitor the generation state. |

---

## 4. Privacy & Data Use

- **Data Collection:** Miss Idea does **NOT** collect, store, or transmit any user data to external servers.
- **Local Processing:** All inputs (product type, customer concerns, and duration) are processed locally in your browser's memory and used solely to construct the chat prompt.
- **Third-Party sharing:** The inputs are only sent to ChatGPT or Gemini (whichever tab the user chooses to run the extension on) via direct DOM injection.

---

## 5. Version History

### Version 1.0 (2026-07-17)
- Initial release.
- Fully implemented 4-step wizard locally on Side Panel.
- Automated Mega Prompt injection into ChatGPT and Gemini.
- Live status sync monitor.
