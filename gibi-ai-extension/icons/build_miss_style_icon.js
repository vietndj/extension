const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Build SVG icon matching Miss extension series style
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient (Royal Indigo to Deep Violet) -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="50%" stop-color="#2E1065"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>

    <!-- Warm Ghibli Gold & Coral Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <!-- Coral Pink Accent -->
    <linearGradient id="coralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F43F5E"/>
      <stop offset="100%" stop-color="#FB7185"/>
    </linearGradient>

    <!-- Soft Drop Shadow -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
      <feGaussianBlur stdDeviation="8" result="blur"/>
    </filter>
  </defs>

  <!-- Squircle Base -->
  <rect x="24" y="24" width="464" height="464" rx="104" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="10" filter="url(#shadow)"/>

  <!-- Inner Subtle Ring -->
  <rect x="36" y="36" width="440" height="440" rx="92" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.12"/>

  <!-- Magic Sparkles (Miyazaki Aesthetic) -->
  <path d="M120 130 L126 150 L146 156 L126 162 L120 182 L114 162 L94 156 L114 150 Z" fill="#FCD34D" opacity="0.9"/>
  <path d="M390 110 L394 122 L406 126 L394 130 L390 142 L386 130 L374 126 L386 122 Z" fill="#FCD34D" opacity="0.9"/>

  <!-- Central Emblem: Film Clapperboard + Ghibli Star -->
  <g transform="translate(106, 150)">
    <!-- Clapper Body -->
    <rect x="20" y="80" width="260" height="160" rx="20" fill="#18181B" stroke="url(#goldGrad)" stroke-width="6" filter="url(#shadow)"/>
    
    <!-- Clapper Top Handle -->
    <g transform="rotate(-10, 20, 80)">
      <rect x="20" y="30" width="260" height="45" rx="10" fill="#18181B" stroke="url(#goldGrad)" stroke-width="6"/>
      <!-- Slanted Stripes -->
      <polygon points="50,30 90,30 55,75 15,75" fill="url(#goldGrad)"/>
      <polygon points="120,30 160,30 125,75 85,75" fill="url(#goldGrad)"/>
      <polygon points="190,30 230,30 195,75 155,75" fill="url(#goldGrad)"/>
      <polygon points="260,30 280,30 265,75 225,75" fill="url(#goldGrad)"/>
    </g>

    <!-- Glowing Star Center -->
    <path d="M150 115 L162 138 L188 142 L170 161 L174 186 L150 174 L126 186 L130 161 L112 142 L138 138 Z" fill="url(#goldGrad)"/>
    
    <!-- Heart / Camera Play Symbol -->
    <path d="M150 138 L160 155 L140 155 Z" fill="#18181B"/>
  </g>

  <!-- Title Badge Text GIBI -->
  <rect x="136" y="380" width="240" height="54" rx="27" fill="url(#coralGrad)" filter="url(#shadow)"/>
  <text x="256" y="417" font-family="'Inter', -apple-system, sans-serif" font-weight="900" font-size="28" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">GIBI AI</text>
</svg>`;

// Save SVG
const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'icon.svg'), svgIcon);
fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgIcon);

// Pure Node PNG Encoder
function createPNG(size) {
  const rBg = 26, gBg = 27, bBg = 50;
  const rGold = 245, gGold = 158, bGold = 11;
  const rCoral = 244, gCoral = 63, bCoral = 94;
  const rWhite = 255, gWhite = 255, bWhite = 255;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rows = [];
  const radius = size * 0.22;
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    row[0] = 0;

    for (let x = 0; x < size; x++) {
      const idx = 1 + x * 3;

      // Rounded container check
      const dx = Math.max(Math.abs(x - center) - (center - radius), 0);
      const dy = Math.max(Math.abs(y - center) - (center - radius), 0);
      const isInside = (dx * dx + dy * dy) <= (radius * radius);

      const borderWidth = Math.max(1, Math.floor(size * 0.05));
      const distFromEdge = Math.min(x, size - 1 - x, y, size - 1 - y);
      const isBorder = distFromEdge <= borderWidth;

      if (!isInside) {
        row[idx] = 0; row[idx+1] = 0; row[idx+2] = 0;
      } else if (isBorder) {
        row[idx] = rGold; row[idx+1] = gGold; row[idx+2] = bGold;
      } else {
        // Inner badge vs emblem graphics
        const distFromCenter = Math.hypot(x - center, y - center);
        const inStar = distFromCenter <= (size * 0.22);
        const inBadge = y > (size * 0.72) && y < (size * 0.88) && Math.abs(x - center) < (size * 0.35);

        if (inBadge) {
          row[idx] = rCoral; row[idx+1] = gCoral; row[idx+2] = bCoral;
        } else if (inStar) {
          row[idx] = rGold; row[idx+1] = gGold; row[idx+2] = bGold;
        } else {
          row[idx] = rBg; row[idx+1] = gBg; row[idx+2] = bBg;
        }
      }
    }
    rows.push(row);
  }

  const rawData = Buffer.concat(rows);
  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcVal = crc32(buf.slice(4, 8 + len));
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) crc = (crc >>> 1) ^ 0xedb88320;
      else crc = crc >>> 1;
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate icon.png in root and sizes in icons/
fs.writeFileSync(path.join(rootDir, 'icon.png'), createPNG(128));
fs.writeFileSync(path.join(__dirname, 'icon-16.png'), createPNG(16));
fs.writeFileSync(path.join(__dirname, 'icon-32.png'), createPNG(32));
fs.writeFileSync(path.join(__dirname, 'icon-48.png'), createPNG(48));
fs.writeFileSync(path.join(__dirname, 'icon-128.png'), createPNG(128));

console.log('Successfully created Miss-style high quality icon.png and icon.svg!');
