const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Studio Ghibli Totoro Circular SVG Logo (Large Totoro Face & Ears, Vibrant Ghibli Colors)
const totoroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Ghibli Sky Blue & Emerald Forest Gradient -->
    <linearGradient id="ghibliSky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="60%" stop-color="#0284C7"/>
      <stop offset="100%" stop-color="#059669"/>
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
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#022C22" flood-opacity="0.4"/>
    </filter>

    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="236"/>
    </clipPath>
  </defs>

  <!-- Transparent background container -->
  <g clip-path="url(#circleClip)">
    <!-- Background Circle Sky & Forest -->
    <circle cx="256" cy="256" r="236" fill="url(#ghibliSky)"/>

    <!-- Fluffy Clouds & Sun Sparkles -->
    <circle cx="110" cy="110" r="45" fill="#FFFFFF" opacity="0.35"/>
    <circle cx="400" cy="130" r="55" fill="#FFFFFF" opacity="0.3"/>
    <path d="M120 160 L124 172 L136 176 L124 180 L120 192 L116 180 L104 176 L116 172 Z" fill="#FDE047" opacity="0.9"/>
    <path d="M380 180 L383 190 L393 193 L383 196 L380 206 L377 196 L367 193 L377 190 Z" fill="#FDE047" opacity="0.9"/>

    <!-- TOTORO CHARACTER EMBLEM (LARGE, FILLING THE FRAME) -->
    <g filter="url(#ghibliShadow)">
      <!-- Totoro Ears (Tall & Big) -->
      <path d="M165 190 Q125 40 160 20 Q195 35 195 180 Z" fill="url(#totoroFur)"/>
      <path d="M347 190 Q387 40 352 20 Q317 35 317 180 Z" fill="url(#totoroFur)"/>

      <!-- Totoro Leaf on Head 🍃 -->
      <path d="M256 95 Q300 45 320 75 Q295 125 256 95 Z" fill="#22C55E"/>
      <path d="M256 95 Q220 55 205 80 Q235 120 256 95 Z" fill="#16A34A"/>
      <path d="M256 95 L290 65" stroke="#15803D" stroke-width="4" stroke-linecap="round"/>

      <!-- Totoro Head & Body (Large Oval filling center) -->
      <path d="M110 280 Q95 140 256 130 Q417 140 402 280 Q420 420 395 490 L117 490 Q92 420 110 280 Z" fill="url(#totoroFur)"/>

      <!-- Totoro White Belly (Big & Bright) -->
      <ellipse cx="256" cy="385" rx="125" ry="110" fill="#FFFBEB"/>

      <!-- Totoro Chest Chevrons -->
      <path d="M210 310 Q225 295 240 310" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M242 310 Q256 295 270 310" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M272 310 Q286 295 300 310" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      
      <path d="M185 345 Q200 330 215 345" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M216 345 Q230 330 245 345" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M267 345 Q281 330 295 345" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>
      <path d="M296 345 Q310 330 325 345" stroke="#475569" stroke-width="8" fill="none" stroke-linecap="round"/>

      <!-- Totoro Big Iconic Eyes -->
      <circle cx="195" cy="205" r="30" fill="#FFFFFF"/>
      <circle cx="195" cy="205" r="11" fill="#0F172A"/>
      <circle cx="199" cy="201" r="4" fill="#FFFFFF"/>

      <circle cx="317" cy="205" r="30" fill="#FFFFFF"/>
      <circle cx="317" cy="205" r="11" fill="#0F172A"/>
      <circle cx="321" cy="201" r="4" fill="#FFFFFF"/>

      <!-- Totoro Nose & Cute Whiskers -->
      <ellipse cx="256" cy="212" rx="18" ry="10" fill="#0F172A"/>

      <line x1="80" y1="210" x2="155" y2="218" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="75" y1="232" x2="152" y2="232" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="85" y1="254" x2="157" y2="246" stroke="#334155" stroke-width="6" stroke-linecap="round"/>

      <line x1="432" y1="210" x2="357" y2="218" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="437" y1="232" x2="360" y2="232" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
      <line x1="427" y1="254" x2="355" y2="246" stroke="#334155" stroke-width="6" stroke-linecap="round"/>
    </g>
  </g>

  <!-- Outer Gold Ring Frame -->
  <circle cx="256" cy="256" r="244" fill="none" stroke="url(#goldBorder)" stroke-width="20"/>
</svg>`;

// Save SVG to root & icons/
const rootDir = path.join(__dirname, '..');
fs.writeFileSync(path.join(rootDir, 'icon.svg'), totoroSvg);
fs.writeFileSync(path.join(__dirname, 'icon.svg'), totoroSvg);

// Pure Node 32-bit RGBA PNG Encoder with TRUE TRANSPARENCY
function create32BitRGBATotoroPNG(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // IHDR chunk: 8-bit depth, color type 6 (RGBA: 4 bytes/pixel)
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type 6 = RGBA (Alpha channel supported!)
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const ihdrChunk = createChunk('IHDR', ihdr);

  const center = size / 2;
  const outerRadius = size / 2;
  const borderWidth = Math.max(1, Math.floor(size * 0.07));
  const innerRadius = outerRadius - borderWidth;

  // Colors RGBA
  const skyRGBA = [56, 189, 248, 255];      // Bright Ghibli Sky Blue
  const goldRGBA = [245, 158, 11, 255];     // Gold Ring
  const totoroRGBA = [100, 116, 139, 255];  // Totoro Grey
  const bellyRGBA = [255, 251, 235, 255];   // Cream White Belly
  const eyeWhiteRGBA = [255, 255, 255, 255];
  const eyeBlackRGBA = [15, 23, 42, 255];
  const transparentRGBA = [0, 0, 0, 0];    // 100% TRANSPARENT

  const rows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4); // 1 filter byte + 4 bytes per pixel
    row[0] = 0; // Filter None

    for (let x = 0; x < size; x++) {
      const idx = 1 + x * 4;
      const distFromCenter = Math.hypot(x - center, y - center);

      // Outside circle = 100% TRANSPARENT
      if (distFromCenter > outerRadius) {
        row[idx] = transparentRGBA[0];
        row[idx+1] = transparentRGBA[1];
        row[idx+2] = transparentRGBA[2];
        row[idx+3] = transparentRGBA[3]; // Alpha = 0!
      }
      // Outer Gold Ring Border
      else if (distFromCenter >= innerRadius) {
        row[idx] = goldRGBA[0];
        row[idx+1] = goldRGBA[1];
        row[idx+2] = goldRGBA[2];
        row[idx+3] = goldRGBA[3];
      }
      // Inside Circle Totoro Emblem
      else {
        const relY = (y - center) / innerRadius;
        const relX = (x - center) / innerRadius;

        // Big Totoro Eyes (relY around -0.2, relX -0.24 & +0.24)
        const leftEyeDist = Math.hypot(relX + 0.24, relY + 0.2);
        const rightEyeDist = Math.hypot(relX - 0.24, relY + 0.2);

        // Big Totoro Belly (relY > 0.15)
        const bellyDist = Math.hypot(relX * 0.9, relY - 0.5);

        // Large Totoro Head & Body (relY > -0.6)
        const bodyDist = Math.hypot(relX * 0.85, relY - 0.1);

        // Big Ears
        const leftEarDist = Math.hypot((relX + 0.35) * 1.5, relY + 0.6);
        const rightEarDist = Math.hypot((relX - 0.35) * 1.5, relY + 0.6);

        let color = skyRGBA;

        if (leftEyeDist < 0.13 || rightEyeDist < 0.13) {
          if (leftEyeDist < 0.05 || rightEyeDist < 0.05) {
            color = eyeBlackRGBA;
          } else {
            color = eyeWhiteRGBA;
          }
        } else if (bellyDist < 0.55 && relY > 0.15) {
          color = bellyRGBA;
        } else if (bodyDist < 0.72 && relY > -0.55) {
          color = totoroRGBA;
        } else if ((leftEarDist < 0.25 || rightEarDist < 0.25) && relY <= -0.4) {
          color = totoroRGBA;
        }

        row[idx] = color[0];
        row[idx+1] = color[1];
        row[idx+2] = color[2];
        row[idx+3] = color[3];
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

// Write 32-bit Transparent PNGs
fs.writeFileSync(path.join(rootDir, 'icon.png'), create32BitRGBATotoroPNG(128));
fs.writeFileSync(path.join(__dirname, 'icon-16.png'), create32BitRGBATotoroPNG(16));
fs.writeFileSync(path.join(__dirname, 'icon-32.png'), create32BitRGBATotoroPNG(32));
fs.writeFileSync(path.join(__dirname, 'icon-48.png'), create32BitRGBATotoroPNG(48));
fs.writeFileSync(path.join(__dirname, 'icon-128.png'), create32BitRGBATotoroPNG(128));

console.log('Successfully created 32-bit Transparent RGBA Circular Totoro PNG & SVG icons!');
