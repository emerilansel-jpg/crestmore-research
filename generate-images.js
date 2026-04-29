/**
 * Crestmore Research — Image Downloader
 * Downloads professional stock photos for the redesigned site.
 * Runs automatically when you execute PUSH-EVERYTHING.bat
 * Requires Node.js (already installed for Astro)
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'public', 'images');

const IMAGES = [
  // Hero: dramatic city skyline at dusk
  { file: 'hero.jpg',          url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=600&fit=crop&q=85' },
  // About: warm premium office
  { file: 'about-office.jpg',  url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=960&h=640&fit=crop&q=85' },
  // Why Crestmore: moody executive office with city view
  { file: 'why-crestmore.jpg', url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=960&h=640&fit=crop&q=85' },
  // Team headshots (professional AI-generated portraits, no real persons)
  { file: 'team-1.jpg',        url: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { file: 'team-2.jpg',        url: 'https://randomuser.me/api/portraits/men/40.jpg' },
  { file: 'team-3.jpg',        url: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function download(url, destPath, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 CrestmoreSetup/1.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        res.resume();
        return download(res.headers.location, destPath, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', (err) => { fs.unlink(destPath, () => {}); reject(err); });
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('\n  Downloading site images...\n');
  let ok = 0;
  let skip = 0;
  for (const img of IMAGES) {
    const dest = path.join(OUT_DIR, img.file);
    try {
      process.stdout.write(`  [....] ${img.file}`);
      await download(img.url, dest);
      process.stdout.write(`\r  [ OK ] ${img.file}  (${Math.round(fs.statSync(dest).size / 1024)}KB)\n`);
      ok++;
    } catch (e) {
      process.stdout.write(`\r  [SKIP] ${img.file} — ${e.message}\n`);
      skip++;
    }
  }
  console.log(`\n  Done: ${ok} downloaded, ${skip} skipped.\n`);
}

main();
