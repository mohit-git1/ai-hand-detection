# ISO/IEC 42001 Operational Runbook & Deployment Controls

**Document Reference:** AIMS-RUN-8.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Runbook Owner & Named Incident Contact:** Mohit Sharma (`mohit.sharma@noida.example.com` / +91-XXXX-XXXXXX)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 8.1 (Operational Planning & Control)  

---

## 1. System Architecture & Operational Scope

`ai-hand-detection` is a lightweight, zero-backend static web application. It requires no server-side compilation or backend build pipeline. The operational environment consists of serving static files ([index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html), [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js), [style.css](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/style.css), [mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html), [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js), [mouse/style.css](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/style.css)) over HTTPS.

---

## 2. Supported Browsers Matrix

| Browser | Minimum Supported Version | Platform / OS | Support Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Google Chrome** | v80+ | Windows, macOS, Linux, Android | ✅ Supported | WebRTC Camera & PointerLock supported |
| **Mozilla Firefox** | v75+ | Windows, macOS, Linux, Android | ✅ Supported | WebRTC Camera & PointerLock supported |
| **Microsoft Edge** | v80+ | Windows, macOS | ✅ Supported | Chromium engine |
| **Apple Safari** | v13.1+ | macOS, iOS | ✅ Supported | WebRTC Camera supported; pointer lock limited on mobile |
| **Internet Explorer**| All | Windows | ❌ Not Supported | Obsolete ES6 / MediaDevices APIs |

---

## 3. Build, Deployment, & Rollback Controls

### Step 1: Pre-Release Build & Syntax Check
Before committing changes or deploying to production:
```bash
# 1. Run JavaScript syntax compile check
node -c video.js
node -c mouse/video.js

# 2. Audit console logging (Must return ONLY safeLog wrapper lines)
grep -n "console.log" video.js mouse/video.js
```

### Step 2: Deployment Execution
1. Commit verified code changes to `master` branch:
   ```bash
   git add -A
   git commit -m "feat: <description of release>"
   ```
2. Push commit to remote static hosting environment (e.g. GitHub Pages or static web server):
   ```bash
   git push origin master
   ```

### Step 3: Post-Deployment Smoke Verification
1. Load deployment URL in browser DevTools.
2. Verify zero active `console.log(results)` or landmark coordinate array output.
3. Test **Start Camera** and verify webcam LED turns ON.
4. Test **Stop Camera** and verify webcam LED turns OFF (<500ms).
5. Test keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`).

### Step 4: Rollback Procedure
If post-deployment smoke verification fails or a critical issue is reported:
```bash
# Immediately revert the latest release commit
git revert HEAD --no-edit
git push origin master
```

---

## 4. Named Incident Contacts & Responsibilities

- **Named System Owner & Primary Incident Contact**: Mohit Sharma (`mohit.sharma@noida.example.com` / +91-XXXX-XXXXXX)
- **Escalation Path**: Noida Business Unit Executive Leadership Team
- **Responsibilities**: Mohit Sharma is responsible for monitoring CDN availability (`unpkg.com`), managing operational incidents, executing rollbacks, and logging CAPA records.
