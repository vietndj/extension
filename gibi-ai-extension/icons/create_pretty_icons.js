const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Generate SVG icon asset
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1C2C"/>
      <stop offset="100%" stop-color="#0E0F17"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD700"/>
      <stop offset="50%" stop-color="#F5A623"/>
      <stop offset="100%" stop-color="#D98200"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect x="16" y="16" width="480" height="480" rx="100" fill="url(#bgGrad)" stroke="url(#goldGrad)" stroke-width="12"/>

  <!-- Magic Sparkles -->
  <path d="M120 140 L125 155 L140 160 L125 165 L120 180 L115 165 L100 160 L115 155 Z" fill="#FFD700" opacity="0.8"/>
  <path d="M380 120 L383 130 L393 133 L383 136 L380 146 L377 136 L367 133 L377 130 Z" fill="#FFD700" opacity="0.8"/>

  <!-- Clapperboard Base -->
  <g transform="translate(106, 170)" filter="url(#glow)">
    <!-- Bottom Board -->
    <path d="M10 90 L290 90 Q300 90 300 100 L300 230 Q300 240 290 240 L10 240 Q0 240 0 230 L0 100 Q0 90 10 90 Z" fill="#1e1e2e" stroke="url(#goldGrad)" stroke-width="6"/>

    <!-- Clapper Top Strips -->
    <g transform="rotate(-12, 0, 80)">
      <path d="M10 20 L290 20 Q300 20 300 30 L300 75 Q300 85 290 85 L10 85 Q0 85 0 75 L0 30 Q0 20 10 20 Z" fill="#1e1e2e" stroke="url(#goldGrad)" stroke-width="6"/>
      <!-- Slanted Gold Zebra Stripes -->
      <polygon points="40,20 80,20 40,85 0,85" fill="url(#goldGrad)"/>
      <polygon points="120,20 160,20 120,85 80,85" fill="url(#goldGrad)"/>
      <polygon points="200,20 240,20 200,85 160,85" fill="url(#goldGrad)"/>
      <polygon points="280,20 300,20 300,50 280,85 240,85" fill="url(#goldGrad)"/>
    </g>

    <!-- Star Emblem Center -->
    <path d="M150 120 L162 145 L190 149 L170 169 L175 196 L150 183 L125 196 L130 169 L110 149 L138 145 Z" fill="url(#goldGrad)"/>
    
    <!-- Text GIBI -->
    <text x="150" y="225" font-family="'Inter', sans-serif" font-weight="900" font-size="26" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">GIBI AI</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'icon.svg'), svgContent);

// Function to generate raw PNG with golden clapperboard pixel graphics
function generatePNG(size) {
  const rBg = 26, gBg = 28, bBg = 44;
  const rGold = 245, gGold = 166, bGold = 35;
  const rWhite = 255, gWhite = 255, bWhite = 255;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rows = [];
  const radius = size * 0.2;
  const center = size / 2;

  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    row[0] = 0;

    for (let x = 0; x < size; x++) {
      const idx = 1 + x * 3;

      // Rounded border check
      const dx = Math.max(Math.abs(x - center) - (center - radius), 0);
      const dy = Math.max(Math.abs(y - center) - (center - radius), 0);
      const isInside = (dx * dx + dy * dy) <= (radius * radius);

      // Border glow
      const distFromEdge = Math.min(x, size - 1 - x, y, size - 1 - y);
      const isBorder = distFromEdge <= Math.max(1, Math.floor(size * 0.06));

      if (!isInside) {
        row[idx] = 0; row[idx+1] = 0; row[idx+2] = 0;
      } else if (isBorder) {
        row[idx] = rGold; row[idx+1] = gGold; row[idx+2] = bGold;
      } else {
        // Clapperboard Star / Center Icon graphic
        const distFromCenter = Math.hypot(x - center, y - center);
        const inStar = distFromCenter <= (size * 0.25);
        const inInnerStar = distFromCenter <= (size * 0.12);

        if (inInnerStar) {
          row[idx] = rWhite; row[idx+1] = rWhite; row[idx+2] = rWhite;
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

fs.writeFileSync(path.join(__dirname, 'icon-16.png'), generatePNG(16));
fs.writeFileSync(path.join(__dirname, 'icon-48.png'), generatePNG(48));
fs.writeFileSync(path.join(__dirname, 'icon-128.png'), generatePNG(128));

console.log('Successfully generated GIBI AI Studio PNG & SVG icons!');
