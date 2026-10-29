import path from "node:path";
import type { Plugin } from "vite";
import { profileConfig } from "../src/config/profile";
import { buildContactLinks } from "../src/utils/links";
import { normalizeUrl } from "../src/utils/validation";
import { buildVCard } from "../src/utils/vcard";

const VCARD_FILE = "contact.vcf";
const MANIFEST_FILE = "site.webmanifest";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildManifest(base: string): string {
  const { company, person, seo } = profileConfig;
  return JSON.stringify(
    {
      name: `${company.name} — ${person.name}`,
      short_name: company.name,
      description: seo.description,
      start_url: base,
      scope: base,
      display: "standalone",
      background_color: seo.backgroundColor,
      theme_color: seo.themeColor,
      icons: [
        { src: `${base}brand/icon-192.png`, sizes: "192x192", type: "image/png" },
        { src: `${base}brand/icon-512.png`, sizes: "512x512", type: "image/png" },
        { src: `${base}brand/favicon.svg`, sizes: "any", type: "image/svg+xml" },
      ],
    },
    null,
    2,
  );
}

function buildHeadTags(base: string): string {
  const { seo, company } = profileConfig;
  const siteUrl = normalizeUrl(profileConfig.links.digitalCardUrl);
  const local = (file: string) => `${base}${file.replace(/^\//, "")}`;
  // Social networks need absolute image URLs, which are only known once digitalCardUrl is set
  const absolute = (file: string) =>
    siteUrl ? new URL(file.replace(/^\//, ""), siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`).href : local(file);

  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="theme-color" content="${seo.themeColor}" />`,
    `<meta name="apple-mobile-web-app-capable" content="yes" />`,
    `<meta name="mobile-web-app-capable" content="yes" />`,
    `<meta name="apple-mobile-web-app-title" content="${escapeHtml(company.name)}" />`,
    `<meta name="apple-mobile-web-app-status-bar-style" content="default" />`,
    `<link rel="icon" href="${local("brand/favicon.svg")}" type="image/svg+xml" />`,
    `<link rel="apple-touch-icon" href="${local("brand/apple-touch-icon.png")}" />`,
    `<link rel="manifest" href="${local(MANIFEST_FILE)}" />`,
    siteUrl && `<link rel="canonical" href="${siteUrl}" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${escapeHtml(company.name)}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.ogDescription)}" />`,
    siteUrl && `<meta property="og:url" content="${siteUrl}" />`,
    `<meta property="og:image" content="${absolute(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta property="profile:first_name" content="${escapeHtml(profileConfig.person.firstName)}" />`,
    `<meta property="profile:last_name" content="${escapeHtml(profileConfig.person.lastName)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.ogTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.ogDescription)}" />`,
    `<meta name="twitter:image" content="${absolute(seo.ogImage)}" />`,
  ];

  return tags.filter(Boolean).join("\n    ");
}

/** Plain-HTML fallback for the rare visitor with JavaScript disabled. */
function buildNoscript(): string {
  const { person, company } = profileConfig;
  const links = buildContactLinks(profileConfig);
  const items = [
    links.tel && `<a href="${links.tel}">Call</a>`,
    links.whatsapp && `<a href="${escapeHtml(links.whatsapp)}">WhatsApp</a>`,
    links.mailto && `<a href="${links.mailto}">Email</a>`,
  ].filter(Boolean);
  return `<noscript><div style="font-family:system-ui;padding:24px;text-align:center"><h1>${escapeHtml(
    person.name,
  )}</h1><p>${escapeHtml(person.position)} · ${escapeHtml(company.name)}</p><p>${items.join(" · ")}</p></div></noscript>`;
}

/**
 * Keeps everything that must exist before JavaScript runs — page title, social preview
 * tags, the downloadable vCard and the web manifest — generated from src/config/profile.ts.
 */
export function digitalCardPlugin(): Plugin {
  let base = "/";
  const configDir = path.resolve(__dirname, "../src/config");

  return {
    name: "lee-scents-digital-card",

    configResolved(config) {
      base = config.base.endsWith("/") ? config.base : `${config.base}/`;
    },

    configureServer(server) {
      // Restart when the profile changes so meta tags and the vCard stay in sync during development
      server.watcher.on("change", (file) => {
        if (path.resolve(file).startsWith(configDir)) void server.restart();
      });

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url === `${base}${VCARD_FILE}`) {
          res.setHeader("Content-Type", "text/vcard; charset=utf-8");
          res.end(buildVCard(profileConfig));
          return;
        }
        if (url === `${base}${MANIFEST_FILE}`) {
          res.setHeader("Content-Type", "application/manifest+json; charset=utf-8");
          res.end(buildManifest(base));
          return;
        }
        next();
      });
    },

    transformIndexHtml(html) {
      return html.replace("<!-- card:head -->", buildHeadTags(base)).replace("<!-- card:noscript -->", buildNoscript());
    },

    generateBundle() {
      this.emitFile({ type: "asset", fileName: VCARD_FILE, source: buildVCard(profileConfig) });
      this.emitFile({ type: "asset", fileName: MANIFEST_FILE, source: buildManifest(base) });
    },
  };
}
