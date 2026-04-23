# HBN Update Log and Deployment Protocol

Date: April 24, 2026
Project: Hananu ba Nai (HBN)
Deployment Model: Build static web output to /dist and upload to hosting folder public_html

---

## 1) Latest Changes, Fixes, and Enhancements

### A. Favoritus - Camera export behavior

- Camera action is now responsive and generates the event/song list image.
- Web flow now prioritizes share-capable behavior where available (best path for Android PWA users).
- Fallback remains file download when browser share/save-to-gallery path is unavailable.

### B. Favoritus - Importa Eventu reliability

- JSON import flow was strengthened for web/PWA file-picking behavior.
- File reading now supports picked files from browser/PWA contexts more reliably.
- Imported event refresh is triggered immediately after successful import.

### C. PWA/web deployment hardening

- Post-build patch step ensures required PWA tags are present in dist/index.html.
- Rewrite rules in dist/.htaccess are preserved/hardened for deep-link refresh support.

### D. Build and dependency validation

- Fresh dependency install and production web build completed successfully.
- Current workflow validated: install -> build -> publish dist output.

---

## 2) Mandatory Protocol for Every Update or Correction

Use this checklist every single time code is changed.

### Step 1 - Sync and prepare

1. Pull latest main branch.
2. Confirm working tree is clean or intentionally staged.
3. Verify Node/npm environment is available.

### Step 2 - Implement and verify locally

1. Apply code changes.
2. Run local checks (lint/type checks if applicable).
3. Test the affected feature(s) in browser and, when relevant, Android PWA behavior.

### Step 3 - Rebuild web output

1. Run build command:

```bash
npm run build
```

2. Confirm build completes with no errors.
3. Confirm generated output exists in /dist.
4. Quick sanity check critical generated files:
   - dist/index.html
   - dist/.htaccess
   - dist/\_expo/static/... assets

### Step 4 - Publish source history

1. Commit changes with clear message.
2. Push to main:

```bash
git push origin main
```

### Step 5 - Deploy static output

1. Upload and replace contents of local /dist to server public_html.
2. Ensure stale files on server are not left behind from older builds.
3. Confirm correct file permissions if hosting requires them.

### Step 6 - Post-deploy validation (production)

1. Hard refresh browser (or clear site data/service worker cache if needed).
2. Verify:
   - App loads from production URL.
   - Favoritus import/export works.
   - Camera export/share flow behaves as expected on target device.
   - Deep links and refresh do not return 404.
3. Log result and timestamp in project notes.

---

## 3) Fast Command Reference

```bash
# Optional clean install when needed
rm -rf node_modules package-lock.json
npm install

# Build static web output
npm run build

# Publish source code updates
git add .
git commit -m "Describe update"
git push origin main
```

---

## 4) Release Notes Template (Copy/Paste)

Date:
Version/Tag:
Summary:

- Fix:
- Enhancement:
- Refactor:

Validation:

- Local test status:
- Build status:
- Production smoke test status:

Deployment:

- Dist exported: Yes/No
- Dist uploaded to public_html: Yes/No
- Cache/service worker check completed: Yes/No

---

## 5) Important Rule

For this project, any functional/UI update is not live until BOTH are completed:

1. New web build generated in /dist.
2. New /dist contents uploaded to public_html.

If either is skipped, the online version will not reflect the latest changes.
