# ISO/IEC 42001 Operational Runbook & Operating Procedures

**Document Reference:** AIMS-OPS-8.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Runbook Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**ISO/IEC 42001 Clause Alignment:** Clause 8.1 (Operational Planning & Control)  

---

## 1. Operational Overview & Boundaries

The `ai-hand-detection` system is a client-side browser application. Operational planning and control mandates that all software deployments and client runtime behaviors strictly conform to the safety boundaries defined in [AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md) and [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md).

---

## 2. Pre-Deployment Operations Checklist

Before approving any deployment or code promotion to production:

```bash
# 1. Run automated compliance audit script
bash scripts/audit_check.sh

# 2. Audit for unredacted raw prediction outputs
grep -rn "console.log" video.js mouse/video.js

# 3. Verify pinned CDN script versions
grep -n "unpkg.com/ml5" index.html mouse/index.html
```

- [x] **Zero Raw Log Exposure**: Confirm zero unredacted `console.log(results)` or coordinate matrices exist in production JavaScript code.
- [x] **Stream Shutdown**: Confirm `stopCamera()` releases all webcam stream tracks within <500ms.
- [x] **Version Pinning**: Confirm `ml5.js` script tag specifies version `0.12.2`.
- [x] **Accessibility**: Confirm `Tab`, `Space`, `Enter`, and `Esc` key navigation functions cleanly.
- [x] **Telemetry Active**: Confirm `telemetry.js` initializes and renders the diagnostics panel without error.

---

## 3. Production Deployment Execution Procedure

1. **GitHub Pages Deployment**:
   - Push reviewed and approved PR to `main` branch.
   - GitHub Actions CI ([.github/workflows/ci.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/ci.yml)) executes static audit checks.
   - Automated deployment publishes static assets to GitHub Pages.

2. **Containerized Deployment**:
   - Build image: `docker build -t ai-hand-detection:v2.0.0 .`
   - Run container: `docker run -d -p 80:80 --name ai-hand-detection ai-hand-detection:v2.0.0`
   - Verify security headers via curl: `curl -I http://localhost/`

---

## 4. Emergency Stop & Incident Response Protocol

If an unexpected AI behavior, pointer lock issue, or privacy concern occurs in production:

1. **User-Initiated Emergency Stop**:
   - User clicks **Stop Camera** (red button) or presses **ESC**.
   - Invokes `stopCamera()` and `exitPointerMode()`, releasing video tracks and disabling AI loop immediately.
2. **Feature Disablement**:
   - Set `aiCheckbox.checked = false` and `aiCheckbox.disabled = true` in UI DOM.
3. **Rollback Procedure**:
   - Revert `main` branch to prior tag (`git revert HEAD`).
   - Log nonconformity incident in [CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md).

---

**Approved by:**  
*Mohit Sharma, Runbook Owner & Lead Engineer*  
*Date: 15 September 2026*
