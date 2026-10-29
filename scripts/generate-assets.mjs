/**
 * Generates the placeholder brand assets in /public from src/config/profile.ts:
 *   brand/logo.svg, brand/favicon.svg, brand/apple-touch-icon.png, brand/icon-192.png, brand/icon-512.png,
 *   og/lee-scents-card.jpg and (only if missing) profile/leslie-peiris.webp
 *
 * Run with:  npm run assets   (requires Node 22.18+ for TypeScript config import)
 * Re-run after changing the name, company or tagline so the social preview image matches.
 */
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { profileConfig } from "../src/config/profile.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (...parts) => path.join(root, "public", ...parts);
const force = process.argv.includes("--force");

const C = {
  forest: "#173D32",
  deep: "#0F2922",
  gold: "#C5A46D",
  champagne: "#E4D4B7",
  ivory: "#F8F6F1",
};
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "'Segoe UI', Arial, Helvetica, sans-serif";

const { person, company } = profileConfig;
const monogram = company.name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

const iconSvg = (size, radius) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.forest}"/><stop offset="1" stop-color="${C.deep}"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="${radius}" fill="url(#bg)"/>
  <rect x="4.5" y="4.5" width="55" height="55" rx="${Math.max(radius - 4, 0)}" fill="none" stroke="${C.gold}" stroke-opacity="0.7" stroke-width="1"/>
  <text x="32" y="41.5" text-anchor="middle" font-family="${SERIF}" font-size="25" font-weight="600" letter-spacing="1.5" fill="${C.champagne}">${monogram}</text>
</svg>`;

const logoSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="140" viewBox="0 0 480 140" role="img" aria-label="${esc(company.name)}">
  <title>${esc(company.name)}</title>
  <text x="240" y="70" text-anchor="middle" font-family="'Cormorant Garamond', ${SERIF}" font-size="52" font-weight="600" letter-spacing="15" fill="${C.deep}">${esc(company.name.toUpperCase())}</text>
  <line x1="150" y1="92" x2="200" y2="92" stroke="${C.gold}" stroke-width="1.2"/>
  <line x1="280" y1="92" x2="330" y2="92" stroke="${C.gold}" stroke-width="1.2"/>
  <circle cx="240" cy="92" r="2.4" fill="${C.gold}"/>
  <text x="240" y="122" text-anchor="middle" font-family="${SANS}" font-size="14" font-weight="600" letter-spacing="6" fill="#8A6934">${esc(company.shortTagline.toUpperCase())}</text>
</svg>`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.forest}"/><stop offset="1" stop-color="${C.deep}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6">
      <stop offset="0" stop-color="${C.gold}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.gold}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="40" y="40" width="1120" height="550" rx="28" fill="none" stroke="${C.gold}" stroke-opacity="0.45" stroke-width="1.5"/>
  <g fill="none" stroke="${C.gold}" stroke-opacity="0.22" stroke-width="2" stroke-linecap="round">
    <path d="M820 600 C 900 500, 980 420, 1120 250"/>
    <path d="M900 505 C 870 470, 866 430, 884 396 C 912 426, 920 466, 900 505 Z"/>
    <path d="M900 505 C 942 498, 978 512, 1000 540 C 960 548, 926 534, 900 505 Z"/>
    <path d="M990 400 C 962 366, 960 326, 982 292 C 1008 326, 1012 366, 990 400 Z"/>
    <path d="M990 400 C 1032 394, 1068 410, 1088 440 C 1048 446, 1012 430, 990 400 Z"/>
  </g>
  <text x="110" y="170" font-family="${SERIF}" font-size="30" font-weight="600" letter-spacing="14" fill="${C.gold}">${esc(company.name.toUpperCase())}</text>
  <line x1="110" y1="200" x2="200" y2="200" stroke="${C.gold}" stroke-width="2"/>
  <text x="106" y="320" font-family="${SERIF}" font-size="84" font-weight="600" fill="${C.ivory}">${esc(person.name)}</text>
  <text x="110" y="378" font-family="${SANS}" font-size="26" font-weight="600" letter-spacing="6" fill="${C.champagne}">${esc(person.position.toUpperCase())}</text>
  <text x="110" y="470" font-family="${SANS}" font-size="28" fill="${C.ivory}" fill-opacity="0.8">${esc(company.tagline)}</text>
  <text x="110" y="530" font-family="${SANS}" font-size="20" letter-spacing="5" fill="${C.gold}">DIGITAL VISITING CARD</text>
</svg>`;

// Neutral silhouette placeholder — replace public/profile/leslie-peiris.webp with the real portrait
const portraitSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F1E7D4"/><stop offset="1" stop-color="${C.champagne}"/>
    </linearGradient>
    <linearGradient id="fig" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5E7A6F"/><stop offset="1" stop-color="${C.forest}"/>
    </linearGradient>
  </defs>
  <rect width="640" height="640" fill="url(#bg)"/>
  <circle cx="320" cy="262" r="112" fill="url(#fig)" fill-opacity="0.85"/>
  <path d="M110 640 C 120 480, 220 410, 320 410 C 420 410, 520 480, 530 640 Z" fill="url(#fig)" fill-opacity="0.85"/>
</svg>`;

async function main() {
  await Promise.all(["brand", "og", "profile"].map((dir) => mkdir(pub(dir), { recursive: true })));

  await writeFile(pub("brand", "logo.svg"), logoSvg.trim() + "\n");
  await writeFile(pub("brand", "favicon.svg"), iconSvg(64, 14).trim() + "\n");

  await sharp(Buffer.from(iconSvg(180, 0))).png().toFile(pub("brand", "apple-touch-icon.png"));
  await sharp(Buffer.from(iconSvg(192, 14))).png().toFile(pub("brand", "icon-192.png"));
  await sharp(Buffer.from(iconSvg(512, 14))).png().toFile(pub("brand", "icon-512.png"));
  await sharp(Buffer.from(ogSvg)).jpeg({ quality: 86, mozjpeg: true }).toFile(pub("og", "lee-scents-card.jpg"));

  const portrait = pub("profile", "leslie-peiris.webp");
  if (force || !(await exists(portrait))) {
    await sharp(Buffer.from(portraitSvg)).webp({ quality: 82 }).toFile(portrait);
    console.log("✓ placeholder portrait created");
  } else {
    console.log("• kept existing portrait (use --force to overwrite)");
  }

  console.log("✓ brand assets generated in /public");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
