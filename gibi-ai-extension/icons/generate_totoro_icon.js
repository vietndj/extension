const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Studio Ghibli Totoro Circular SVG Logo
const totoroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Ghibli Sky Blue & Emerald Forest Gradient -->
    <linearGradient id="ghibliSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="55%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <!-- Totoro Fur Gradient -->
    <linearGradient id="totoroFur" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94A3B8"/>
      <stop offset="50%" stop-color="#64748B"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>

    <!-- Warm Gold Ring Gradient -->
    <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="50%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>

    <!-- Drop Shadow for Totoro -->
    <filter id="ghibliShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#022C22" flood-opacity="0.5"/>
    </filter>

    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="240"/>
    </clipPath>
  </defs>

  <!-- Outer Gold Circle Frame -->
  <circle cx="256" cy="256" r="248" fill="none" stroke="url(#goldBorder)" stroke-width="16"/>

  <g clip-path="url(#circleClip)">
    <!-- Background Circle Sky & Forest -->
    <circle cx="256" cy="256" r="240" fill="url(#ghibliSky)"/>

    <!-- Fluffy Clouds & Sun Rays -->
    <circle cx="100" cy="120" r="50" fill="#FFFFFF" opacity="0.3"/>
    <circle cx="140" cy="110" r="40" fill="#FFFFFF" opacity="0.3"/>
    <circle cx="400" cy="160" r="60" fill="#FFFFFF" opacity="0.25"/>

    <!-- Magical Dust Sparkles -->
    <path d="M120 180 L124 192 L136 196 L124 200 L120 212 L116 200 L104 196 L116 192 Z" fill="#FDE047" opacity="0.95"/>
    <path d="M380 220 L383 230 L393 233 L383 236 L380 246 L377 236 L367 233 L377 230 Z" fill="#FDE047" opacity="0.95"/>

    <!-- TOTORO CHARACTER EMBLEM -->
    <g filter="url(#ghibliShadow)">
      <!-- Totoro Ears -->
      <path d="M185 190 Q160 80 180 60 Q205 70 205 180 Z" fill="url(#totoroFur)"/>
      <path d="M327 190 Q352 80 332 60 Q307 70 307 180 Z" fill="url(#totoroFur)"/>

      <!-- Totoro Leaf on Head 🍃 -->
      <path d="M256 120 Q290 80 305 105 Q285 145 256 120 Z" fill="#22C55E"/>
      <path d="M256 120 Q230 90 220 110 Q240 140 256 120 Z" fill="#16A34A"/>
      <path d="M256 120 L280 100" stroke="#15803D" stroke-width="3" stroke-linecap="round"/>

      <!-- Totoro Head & Main Body -->
      <path d="M150 260 Q140 180 256 175 Q372 180 362 260 Q375 360 360 440 L152 440 Q137 360 150 260 Z" fill="url(#totoroFur)"/>

      <!-- Totoro White Belly -->
      <ellipse cx="256" cy="355" rx="95" ry="90" fill="#FFFBEB"/>

      <!-- Totoro Chest Chevrons -->
      <path d="M225 295 Q235 285 245 295" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M246 295 Q256 285 266 295" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M267 295 Q277 285 287 295" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M205 320 Q215 310 225 320" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M226 320 Q236 310 246 320" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M266 320 Q276 310 286 320" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M287 320 Q297 310 307 320" stroke="#475569" stroke-width="6" fill="none" stroke-linecap="round"/>

      <!-- Totoro Eyes -->
      <circle cx="210" cy="215" r="22" fill="#FFFFFF"/>
      <circle cx="210" cy="215" r="8" fill="#0F172A"/>
      <circle cx="213" cy="212" r="3" fill="#FFFFFF"/>

      <circle cx="302" cy="215" r="22" fill="#FFFFFF"/>
      <circle cx="302" cy="215" r="8" fill="#0F172A"/>
      <circle cx="305" cy="212" r="3" fill="#FFFFFF"/>

      <!-- Totoro Nose & Whiskers -->
      <ellipse cx="256" cy="222" rx="14" ry="8" fill="#0F172A"/>

      <line x1="120" y1="220" x2="180" y2="225" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <line x1="115" y1="235" x2="178" y2="235" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <line x1="122" y1="250" x2="182" y2="245" stroke="#334155" stroke-width="4" stroke-linecap="round"/>

      <line x1="392" y1="220" x2="332" y2="225" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <line x1="397" y1="235" x2="334" y2="235" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
      <line x1="390" y1="250" x2="330" y2="245" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
    </g>
  </g>
</svg>`;

// Save SVG to root & icons/
const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'icon.svg'), totoroSvg);
fs.writeFileSync(path.join(__dirname, 'icon.svg'), totoroSvg);

// Pure Node PNG Encoder for Circular Totoro Icon
function createCircularTotoroPNG(size) {
  const rSky = 56, gSky = 189, bSky = 248;       // Ghibli Sky Blue
  const rTotoro = 148, gTotoro = 163, bTotoro = 184; // Totoro Grey
  const rBelly = 255, gBelly = 251, bBelly = 235; // Totoro Cream Belly
  const rGold = 245, gGold = 158, bGold = 11;     // Gold Border
  const rWhite = 255, gWhite = 255, bWhite = 255;
  const rBlack = 15, gBlack = 23, bBlack = 42;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const rows = [];
  const radius = size / 2;
  const center = size / 2;
  const borderWidth = Math.max(1, Math.floor(size * 0.06));

  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3);
    row[0] = 0;

    for (let x = 0; x < size; x++) {
      const idx = 1 + x * 3;
      const distFromCenter = Math.hypot(x - center, y - center);

      // Outside circle boundary
      if (distFromCenter > radius) {
        row[idx] = 0; row[idx+1] = 0; row[idx+2] = 0;
      }
      // Outer Gold Ring Border
      else if (distFromCenter >= (radius - borderWidth)) {
        row[idx] = rGold; row[idx+1] = gGold; row[idx+2] = bGold;
      }
      // Inside Totoro Emblem & Ghibli Sky
      else {
        const relY = (y - center) / radius;
        const relX = (x - center) / radius;

        // Totoro Eyes (relY around -0.15, relX around -0.18 and +0.18)
        const leftEyeDist = Math.hypot(relX + 0.18, relY + 0.15);
        const rightEyeDist = Math.hypot(relX - 0.18, relY + 0.15);

        // Totoro Belly (relY > 0.2, relX around 0)
        const bellyDist = Math.hypot(relX, relY - 0.38);

        // Totoro Body Outline (center oval)
        const bodyDist = Math.hypot(relX * 1.1, relY - 0.1);

        if (leftEyeDist < 0.08 || rightEyeDist < 0.08) {
          if (leftEyeDist < 0.03 || rightEyeDist < 0.03) {
            row[idx] = rBlack; row[idx+1] = gBlack; row[idx+2] = bBlack;
          } else {
            row[idx] = rWhite; row[idx+1] = rWhite; row[idx+2] = rWhite;
          }
        } else if (bellyDist < 0.32 && relY > 0.1) {
          row[idx] = rBelly; row[idx+1] = gBelly; row[idx+2] = bBelly;
        } else if (bodyDist < 0.45 && relY > -0.4) {
          row[idx] = rTotoro; row[idx+1] = gTotoro; row[idx+2] = bTotoro;
        } else {
          // Ghibli Sky Background
          row[idx] = rSky; row[idx+1] = gSky; row[idx+2] = bSky;
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

// Write PNGs
fs.writeFileSync(path.join(rootDir, 'icon.png'), createCircularTotoroPNG(128));
fs.writeFileSync(path.join(__dirname, 'icon-16.png'), createCircularTotoroPNG(16));
fs.writeFileSync(path.join(__dirname, 'icon-32.png'), createCircularTotoroPNG(32));
fs.writeFileSync(path.join(__dirname, 'icon-48.png'), createCircularTotoroPNG(48));
fs.writeFileSync(path.join(__dirname, 'icon-128.png'), createCircularTotoroPNG(128));

console.log('Successfully created Circular Totoro Studio Ghibli PNG & SVG icons!');
