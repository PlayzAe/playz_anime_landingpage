// Makes the WebP copies of public/screenshots/*.png that the site actually loads:
// <name>.webp at full width and <name>-800.webp for phones.
// Needs ffmpeg: set FFMPEG to its path, or have it on PATH.
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dir = join(root, 'public', 'screenshots');

function findFfmpeg() {
  const candidates = [
    process.env.FFMPEG,
    resolve(root, '..', 'playz_anime_desktopapp', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe'),
    resolve(root, '..', 'Electron Conversion', 'node_modules', 'ffmpeg-static', 'ffmpeg.exe'),
    'ffmpeg',
  ].filter(Boolean);
  for (const c of candidates) {
    try {
      execFileSync(c, ['-version'], { stdio: 'ignore' });
      return c;
    } catch {
      /* try the next one */
    }
  }
  throw new Error('ffmpeg not found. Set FFMPEG=C:\\path\\to\\ffmpeg.exe and run again.');
}

const ffmpeg = findFfmpeg();
const force = process.argv.includes('--force');
let made = 0;

for (const file of readdirSync(dir).filter((f) => f.endsWith('.png'))) {
  const src = join(dir, file);
  const base = file.slice(0, -4);
  const jobs = [
    { out: join(dir, `${base}.webp`), scale: null },
    { out: join(dir, `${base}-800.webp`), scale: 800 },
  ];
  for (const job of jobs) {
    if (!force && existsSync(job.out) && statSync(job.out).mtimeMs >= statSync(src).mtimeMs) continue;
    const args = ['-y', '-loglevel', 'error', '-i', src];
    if (job.scale) args.push('-vf', `scale=${job.scale}:-1:flags=lanczos`);
    args.push('-c:v', 'libwebp', '-quality', '80', '-compression_level', '6', job.out);
    execFileSync(ffmpeg, args, { stdio: 'inherit' });
    made++;
  }
}

console.log(made ? `Wrote ${made} WebP file(s).` : 'WebP files are up to date.');
