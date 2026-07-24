import os
from PIL import Image, ImageDraw, ImageFont

def create_gradient_bg(width, height, color1, color2):
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_draw = ImageDraw.Draw(mask)
    for y in range(height):
        alpha = int(255 * (y / height))
        mask_draw.line([(0, y), (width, y)], fill=alpha)
    base.paste(top, (0, 0), mask)
    return base

def draw_header_banner(img, title, subtitle, badge_text, theme_color, border_color):
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Draw decorative subtle glow elements
    draw.rectangle([20, 20, w-20, h-20], outline=border_color, width=3)
    
    # Try system font, fallback to default
    try:
        font_title = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", int(h * 0.08), index=1)
        font_sub = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", int(h * 0.04), index=0)
        font_badge = ImageFont.truetype("/System/Library/Fonts/HelveticaNeue.ttc", int(h * 0.03), index=1)
    except Exception:
        font_title = font_sub = font_badge = ImageFont.load_default()
        
    # Title Text
    bbox_t = draw.textbbox((0,0), title, font=font_title)
    tw = bbox_t[2] - bbox_t[0]
    th = bbox_t[3] - bbox_t[1]
    
    tx = (w - tw) // 2
    ty = (h // 2) - int(th * 1.2)
    
    draw.text((tx, ty), title, fill=(255, 255, 255), font=font_title)
    
    # Subtitle
    bbox_s = draw.textbbox((0,0), subtitle, font=font_sub)
    sw = bbox_s[2] - bbox_s[0]
    sx = (w - sw) // 2
    sy = ty + th + int(h * 0.04)
    draw.text((sx, sy), subtitle, fill=(200, 210, 225), font=font_sub)
    
    # Badge
    bbox_b = draw.textbbox((0,0), badge_text, font=font_badge)
    bw = bbox_b[2] - bbox_b[0]
    bh = bbox_b[3] - bbox_b[1]
    bx = (w - bw) // 2
    by = sy + int(h * 0.08)
    
    padding = 10
    draw.rectangle([bx - padding, by - padding, bx + bw + padding, by + bh + padding], fill=theme_color)
    draw.text((bx, by), badge_text, fill=(255, 255, 255), font=font_badge)

def generate_assets_for_extension(ext_dir, title, subtitle, theme_rgb, border_rgb):
    assets_dir = os.path.join(ext_dir, "store_assets")
    os.makedirs(assets_dir, exist_ok=True)
    
    # 1. Store Icon (128x128)
    icon_path = os.path.join(ext_dir, "icon.png")
    if os.path.exists(icon_path):
        img_icon = Image.open(icon_path).convert("RGBA")
        img_icon = img_icon.resize((128, 128), Image.Resampling.LANCZOS)
        img_icon.save(os.path.join(assets_dir, "icon_128x128.png"))
        img_icon.save(icon_path) # Also update root icon.png to exact 128x128!
    
    # 2. Screenshot (1280x800)
    sc = create_gradient_bg(1280, 800, (18, 19, 28), (26, 28, 44))
    draw_header_banner(sc, title, subtitle, "CHROME EXTENSION SIDE PANEL", theme_rgb, border_rgb)
    sc.save(os.path.join(assets_dir, "screenshot_1280x800.png"))
    
    # 3. Small Promo Tile (440x280)
    promo = create_gradient_bg(440, 280, (18, 19, 28), (30, 32, 50))
    draw_header_banner(promo, title, subtitle, "STUDIO AI ASSISTANT", theme_rgb, border_rgb)
    promo.save(os.path.join(assets_dir, "promo_440x280.png"))
    
    # 4. Marquee Banner (1400x560)
    marquee = create_gradient_bg(1400, 560, (12, 13, 20), (26, 28, 44))
    draw_header_banner(marquee, title, subtitle, "OFFICIAL AI ASSISTANT FOR CREATORS", theme_rgb, border_rgb)
    marquee.save(os.path.join(assets_dir, "marquee_1400x560.png"))
    print(f"Generated exact pixel store assets for {ext_dir}")

def main():
    base_path = "/Users/vietmac/Documents/CODE/extension"
    
    # Miss GIBI
    generate_assets_for_extension(
        os.path.join(base_path, "gibi-ai-extension"),
        "Miss GIBI — Trợ Lý Đạo Diễn Ghibli",
        "Tự động tạo phim hoạt hình 2D Ghibli 16 ô chuyên nghiệp",
        (245, 166, 35),
        (56, 189, 248)
    )
    
    # Miss Idea
    generate_assets_for_extension(
        os.path.join(base_path, "miss-idea-extension"),
        "Miss Idea — Trợ Lý Cố Vấn Kịch Bản",
        "Kịch bản Talking Head thương hiệu cá nhân từng bước một",
        (139, 92, 246),
        (196, 181, 253)
    )
    
    # Miss Vlog
    generate_assets_for_extension(
        os.path.join(base_path, "miss-vlog-extension"),
        "Miss Vlog — Trợ Lý Kịch Bản Xây Kênh",
        "Biên tập kịch bản Vlog ngắn xây dựng thương hiệu cá nhân",
        (255, 126, 95),
        (254, 180, 123)
    )
    
    # Miss Video Ads
    generate_assets_for_extension(
        os.path.join(base_path, "miss-video-ads-extension"),
        "Miss Video Ads — Trợ Lý Kịch Bản",
        "Kịch bản video ads chuẩn công thức Marketing chuyển đổi cao",
        (98, 0, 238),
        (187, 134, 252)
    )

if __name__ == "__main__":
    main()
