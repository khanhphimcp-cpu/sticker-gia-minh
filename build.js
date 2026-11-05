const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

const items = [
  'index.html',
  'og-banner.png',
  'DEMO_STICKER_GIAMINH.html',
  'DEMO_OPTION_2.html',
  'assets',
  'HINH XOAY',
  'logo-gm-emblem.png',
  'logo-gm-original.png',
  'logo-gm-transparent.png',
  'logo-gm.png',
  'LOGO.png',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'favicon.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'stats.json'
];

// Fallback baseline stats
const statsData = {
  success: true,
  online: 1,
  today: 30,
  month: 221,
  total: 1682,
  updatedAt: new Date().toISOString()
};
fs.writeFileSync(path.join(__dirname, 'stats.json'), JSON.stringify(statsData, null, 2));

for (const item of items) {
  const p = path.join(__dirname, item);
  if (fs.existsSync(p)) {
    copyRecursive(p, path.join(outDir, item));
  }
}

fs.writeFileSync(path.join(outDir, 'stats.json'), JSON.stringify(statsData, null, 2));

console.log('Build completed! Files copied to dist/public');
