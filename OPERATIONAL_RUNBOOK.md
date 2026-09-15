# ISO/IEC 42001 Operational Runbook & Deployment Controls

**Document Reference:** AIMS-RUN-8.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Runbook Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 8.1 (Operational Planning & Control)  

---

## 1. System Architecture & Static Deployment Overview

`ai-hand-detection` is a purely static client-side web application. It requires no backend server compilation or build step. The operational environment consists of serving static files ([index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html), [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js), [style.css](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/style.css), [mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html), [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js), [mouse/style.css](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/style.css)) over HTTPS.

---

## 2. Supported Browsers & Operational Constraints

| Browser | Minimum Version | Operating System | Support Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Google Chrome** | v80+ | Windows, macOS, Linux, Android | ✅ Full Support | WebRTC Camera & PointerLock supported |
| **Mozilla Firefox** | v75+ | Windows, macOS, Linux, Android | ✅ Full Support | WebRTC Camera & PointerLock supported |
| **Microsoft Edge** | v80+ | Windows, macOS | ✅ Full Support | Chromium engine |
| **Apple Safari** | v13.1+ | macOS, iOS | ✅ Full Support | WebRTC Camera supported; pointer lock limited on mobile |
| **Internet Explorer**| All | Windows | ❌ Not Supported | Obsolete ES6/MediaDevices APIs |

---

## 3. Deployment & Release Procedure

### Step 1: Pre-Release Quality & Privacy Audit
Before pushing code changes to production:
```bash
# 1. Run JavaScript syntax verification
node -c video.js
node -c mouse/video.js

# 2. Audit console exposure (Verify zero unredacted console.log calls exist)
grep -n "console.log" video.js mouse/video.js
```
*Criteria*: `grep` must return ONLY safe diagnostic wrapper lines (`safeLog`).

### Step 2: Deployment Execution
1. Commit approved changes to Git `master` branch.
2. Push commit to remote static host (e.g. GitHub Pages or static HTTP server):
```bash
git push origin master
```

### Step 3: Post-Deployment Smoke Verification
1. Open browser in Incognito mode and navigate to deployment URL.
2. Open DevTools (`F12`) Console tab and verify zero landmark coordinate logs exist.
3. Click **Start Camera** and verify webcam indicator light activates.
4. Click **Stop Camera** and verify webcam indicator light turns OFF within <500ms.
5. Test Keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`).

### Step 4: Rollback Strategy
If post-deployment verification fails:
```bash
git revert HEAD --no-edit
git push origin master
```

---

## 4. Incident Contacts & Monitoring Responsibilities

- **Primary Incident Contact**: Mohit Sharma (`mohit.sharma@noida.example.com` / +91-XXXX-XXXXXX)
- **Escalation Path**: Executive Leadership Team (Noida Unit)
- **Monitoring Responsibility**: Daily monitoring of dependency CDN availability (`unpkg.com`) and weekly browser compatibility reviews.
