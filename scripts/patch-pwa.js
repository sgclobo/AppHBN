/**
 * Post-build script: injects PWA meta tags into dist/index.html.
 * Expo's static export generates a minimal HTML shell that omits the
 * <link rel="manifest"> and related PWA tags defined in app/+html.tsx.
 * This script adds them so that Android Chrome can offer the "Add to Home
 * Screen" / install prompt and iOS Safari shows the correct app icon.
 */

const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "..", "dist");
const distHtml = path.join(distDir, "index.html");
const distHtaccess = path.join(distDir, ".htaccess");

if (!fs.existsSync(distHtml)) {
  console.error("❌  dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}

let html = fs.readFileSync(distHtml, "utf8");

const pwaTags = `
    <!-- PWA manifest & icons -->
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#c1121f" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Harohan ba Nai" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="shortcut icon" href="/favicon.ico" />`;

// Also ensure viewport-fit=cover is present for iOS notch support
html = html.replace(
  'content="width=device-width, initial-scale=1, shrink-to-fit=no"',
  'content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"',
);

// Inject before </head> (idempotent)
if (!html.includes('rel="manifest"')) {
  html = html.replace("</head>", `${pwaTags}\n  </head>`);
}

fs.writeFileSync(distHtml, html, "utf8");
console.log("✅  PWA tags ensured in dist/index.html");

// Harden Apache rewrite rules to avoid JS bundles being rewritten to index.html.
if (fs.existsSync(distHtaccess)) {
  let ht = fs.readFileSync(distHtaccess, "utf8");

  if (!ht.includes("Options -MultiViews")) {
    ht = `Options -MultiViews\n${ht}`;
  }

  if (!ht.includes("RewriteRule ^_expo/ - [L]")) {
    ht = ht.replace(
      "  # Never rewrite common PWA assets.",
      "  # Never rewrite JS/CSS bundles or static assets.\n  RewriteRule ^_expo/ - [L]\n  RewriteRule ^assets/ - [L]\n\n  # Never rewrite common PWA assets.",
    );
  }

  fs.writeFileSync(distHtaccess, ht, "utf8");
  console.log("✅  Rewrite rules hardened in dist/.htaccess");
}
