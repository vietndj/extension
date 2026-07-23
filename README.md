# 🎬 GIBI AI Studio - Chrome Extension (Studio Ghibli AI Video Director & Teleprompter)

**GIBI AI Studio** là Chrome Extension (chuẩn Manifest V3) giúp tự động hóa quy trình làm phim hoạt hình 2D phong cách Studio Ghibli từ ảnh chụp thực tế (Live-Action to Anime), tích hợp phòng thu đọc thoại Teleprompter và cầu nối tự động với Google Flow (Veo 3).

---

## 🌟 TÍNH NĂNG NỔI BẬT

1. **Side Panel Studio Dark Mode & Ghibli Gold Aesthetic**:
   - Giao diện dạng thanh Side Panel cạnh bên trình duyệt, không gây rối mắt khi dùng Gemini cá nhân.
   - Thanh tiến trình 5 Giai đoạn (Stepper) chuẩn hóa quy trình đạo diễn hoạt hình.

2. **Tự động hóa Mega Prompt "Live-Action to Anime" (1-Click Injection)**:
   - Tự động điền Mega Prompt và lệnh điều khiển (`Phím 1`, `Phím 2`, `Phím 0`) vào Gemini Chat mà không cần gõ tay.
   - Khóa vĩnh viễn nét mặt nhân vật `[FINAL_FACE_JSON]` làm hằng số, ghép với Quần áo/Tư thế/Bối cảnh biến thiên `[SCENE_JSON]`.

3. **Phòng Thu Đọc Thoại Teleprompter Tích Hợp**:
   - Tự động bóc tách kịch bản Voiceover từ Gemini Web.
   - Chữ cuộn tự động (Auto-scroll), tùy chỉnh tốc độ đọc và tạm dừng linh hoạt.

4. **Cầu Nối Google Flow (Veo 3)**:
   - Tự động trích xuất Code Block Prompt Video từ Gemini.
   - 1-Click mở tab Google Flow (`labs.google/fx/tools/flow`) và tự động dán prompt video vào Veo 3.

---

## 📦 HƯỚNG DẪN CÀI ĐẶT LÊN CHROME (CHỈ NĂM 3 BƯỚC)

1. **Mở trình duyệt Google Chrome**:
   - Truy cập vào địa chỉ: `chrome://extensions`

2. **Bật Chế Độ Nhà Phát Triển (Developer Mode)**:
   - Bật công tắc **"Developer mode"** ở góc trên bên phải màn hình.

3. **Cài đặt Extension (Load Unpacked)**:
   - Bấm nút **"Load unpacked"** (Tải tiện ích đã giải nén).
   - Chọn thư mục dự án: `/Users/vietmac/Documents/CODE/Hoạt hình video`
   - **Xong!** Icon GIBI AI Studio sẽ xuất hiện trên thanh công cụ Chrome.

---

## 🎬 HƯỚNG DẪN SỬ DỤNG

1. Truy cập vào trang **[Gemini Chat](https://gemini.google.com)**.
2. Bấm vào Icon **GIBI AI** trên trình duyệt để mở thanh Side Panel ở góc phải.
3. Điền ý tưởng kịch bản & chọn tỷ lệ video (Ngang 16:9 hoặc Dọc 9:16) $\rightarrow$ Bấm **"🚀 Kích Hoạt Dự Án"**.
4. Thực hiện theo từng nút bấm 1-Click của 5 Giai đoạn trên Side Panel!

---

## 🛠️ CẤU TRÚC THƯ MỤC DỰ ÁN

```text
/Users/vietmac/Documents/CODE/Hoạt hình video/
├── manifest.json              # Khai báo Manifest V3
├── sidepanel/
│   ├── sidepanel.html         # Giao diện Studio Side Panel
│   ├── sidepanel.css          # CSS Dark Mode Glassmorphism
│   └── sidepanel.js           # Controller & Teleprompter engine
├── scripts/
│   ├── service-worker.js      # Background service worker
│   ├── content-gemini.js      # Content script nhúng vào Gemini Web
│   └── content-flow.js        # Content script nhúng vào Google Flow (Veo 3)
├── prompts/
│   └── mega-prompt-ghibli.md  # Mega Prompt Ghibli Live-Action to Anime
└── icons/                     # Icons chuẩn PNG (16x16, 48x48, 128x128)
```
