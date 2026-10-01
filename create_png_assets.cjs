const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to generate uncompressed / compressed minimal valid transparent PNG
function createPng(width, height, r, g, b, alpha = 255) {
  // Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT - raw image data
  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = [0]; // Filter byte
    for (let x = 0; x < width; x++) {
      // Draw rounded circle with specified color
      const dx = x - width / 2;
      const dy = y - height / 2;
      const distSq = dx * dx + dy * dy;
      const radiusSq = (width / 2 - 4) * (width / 2 - 4);

      if (distSq <= radiusSq) {
        row.push(r, g, b, alpha);
      } else {
        row.push(0, 0, 0, 0);
      }
    }
    rawRows.push(Buffer.from(row));
  }
  const rawData = Buffer.concat(rawRows);
  const compressedData = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', compressedData);

  // IEND
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4);
  data.copy(buf, 8);
  const crc = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      if (crc & 1) {
        crc = (crc >>> 1) ^ 0xedb88320;
      } else {
        crc = crc >>> 1;
      }
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const dir = path.join(__dirname, 'public', 'assets', 'characters');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Generate clean PNGs for each character with character distinct color accents
const charList = [
  { name: 'manchas.png', r: 245, g: 158, b: 11 },   // Manchas Amber/White
  { name: 'negro.png', r: 129, g: 140, b: 248 },    // Negro Indigo
  { name: 'mari.png', r: 16, g: 185, b: 129 },      // Mari Emerald
  { name: 'nohel.png', r: 59, g: 130, b: 246 },     // Nohel Blue
  { name: 'kitty.png', r: 249, g: 115, b: 22 },     // Kitty Orange
  { name: 'zafiro.png', r: 168, g: 85, b: 247 },    // Zafiro Purple
  { name: 'cuervo.png', r: 100, g: 116, b: 139 },   // Cuervo Slate
  { name: 'buho.png', r: 217, g: 119, b: 6 },       // Buho Amber
  { name: 'guardiana.png', r: 4, g: 120, b: 87 }   // Guardiana Forest Green
];

charList.forEach(c => {
  const p = path.join(dir, c.name);
  fs.writeFileSync(p, createPng(160, 160, c.r, c.g, c.b));
  console.log('Created valid PNG:', p);
});
