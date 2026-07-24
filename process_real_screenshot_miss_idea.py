import os
from PIL import Image, ImageDraw, ImageFont

def process_screenshot():
    src_path = "/Users/vietmac/.gemini/antigravity/brain/d85d93f5-a2cc-4360-bf57-870a9fd4a311/.user_uploaded/media__1784863251641.png"
    out_dir_1 = "/Users/vietmac/Documents/CODE/extension/miss-idea-extension/store_assets"
    out_dir_2 = "/Users/vietmac/Documents/CODE/extension/store_assets_miss_idea"
    os.makedirs(out_dir_1, exist_ok=True)
    os.makedirs(out_dir_2, exist_ok=True)
    
    # 1. Create 1280x800 Canvas with dark gradient theme
    canvas_w, canvas_h = 1280, 800
    base = Image.new('RGB', (canvas_w, canvas_h), (18, 19, 28))
    top = Image.new('RGB', (canvas_w, canvas_h), (28, 25, 45))
    mask = Image.new('L', (canvas_w, canvas_h))
    mask_draw = ImageDraw.Draw(mask)
    for y in range(canvas_h):
        mask_draw.line([(0, y), (canvas_w, y)], fill=int(255 * (y / canvas_h)))
    base.paste(top, (0, 0), mask)
    
    draw = ImageDraw.Draw(base)
    
    # 2. Add Left Marketing Content
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 36, index=1)
        font_sub = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 20, index=0)
        font_bullet = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 16, index=0)
        font_badge = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", 14, index=1)
    except Exception:
        font_title = font_sub = font_bullet = font_badge = ImageFont.load_default()
        
    # Badge
    draw.rectangle([70, 150, 320, 185], fill=(139, 92, 246))
    draw.text((85, 158), "CHROME EXTENSION SIDE PANEL", fill=(255, 255, 255), font=font_badge)
    
    # Title
    draw.text((70, 210), "Miss Idea — Trợ Lý Cố Vấn", fill=(255, 255, 255), font=font_title)
    draw.text((70, 255), "Kịch Bản Talking Head", fill=(196, 181, 253), font=font_title)
    
    # Subtitle
    draw.text((70, 320), "Đồng hành dắt tay chủ doanh nghiệp nhỏ tự lên kịch bản", fill=(220, 225, 240), font=font_sub)
    draw.text((70, 350), "video ngắn chuyên nghiệp từng bước một.", fill=(220, 225, 240), font=font_sub)
    
    # Bullet points
    bullets = [
        "✨ Quyền năng Cố vấn Mentor đồng hành 4 bước",
        "🎯 Khóa Nỗi sợ Khách hàng -> Hook 3 giây hấp dẫn",
        "🎬 Tự động đề xuất cảnh quay phụ (B-roll) uy tín",
        "⚡ Nạp Mega Prompt trực tiếp vào ChatGPT & Gemini"
    ]
    
    y_pos = 420
    for b in bullets:
        draw.rectangle([70, y_pos+2, 76, y_pos+16], fill=(139, 92, 246))
        draw.text((90, y_pos), b, fill=(200, 210, 230), font=font_bullet)
        y_pos += 38

    # 3. Process Sidepanel Screenshot
    if os.path.exists(src_path):
        side_img = Image.open(src_path).convert("RGBA")
        
        # Scale sidepanel to fit canvas height comfortably (height = 700px)
        target_h = 720
        aspect = side_img.width / side_img.height
        target_w = int(target_h * aspect)
        
        side_img_resized = side_img.resize((target_w, target_h), Image.Resampling.LANCZOS)
        
        # Position sidepanel mock on right side
        pos_x = canvas_w - target_w - 70
        pos_y = 40
        
        # Draw soft shadow box behind sidepanel screenshot
        draw.rectangle([pos_x-8, pos_y-8, pos_x+target_w+8, pos_y+target_h+8], fill=(10, 10, 16))
        
        base.paste(side_img_resized, (pos_x, pos_y), side_img_resized)
        
    # Save output files
    out_file_1 = os.path.join(out_dir_1, "screenshot_1280x800.png")
    out_file_2 = os.path.join(out_dir_2, "screenshot_1280x800.png")
    base.save(out_file_1)
    base.save(out_file_2)
    print(f"Successfully processed real screenshot to valid 1280x800 at:\n{out_file_1}\n{out_file_2}")

if __name__ == "__main__":
    process_screenshot()
