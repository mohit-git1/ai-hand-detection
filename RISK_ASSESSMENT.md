# ISO/IEC 42001 AI Risk Assessment & Operational Treatment

**Document Reference:** AIMS-RISK-6.1 / 8.2  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Risk Assessment Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 6.1 (AI Risk Assessment) & Clause 8.2 (Operational Risk Treatment)  

---

## 1. Methodology & Risk Criteria

Risks are evaluated using a standard 5x5 Likelihood and Severity matrix:
- **Likelihood (L)**: 1 (Rare), 2 (Unlikely), 3 (Possible), 4 (Likely), 5 (Almost Certain)
- **Severity (S)**: 1 (Insignificant), 2 (Minor), 3 (Moderate), 4 (Major), 5 (Critical)
- **Risk Rating (R = L x S)**: 1–5 (Low), 6–11 (Medium), 12–19 (High), 20–25 (Critical)

Pre-flight operational thresholds and stop conditions are established for each identified risk.

---

## 2. Comprehensive AI Risk Matrix & Operational Stop Conditions

| Risk ID | Category | Risk Description | Pre-Mitigation (L x S) | Risk Owner | Mitigations & Operational Controls | Enforceable Stop Condition & Threshold | Residual Risk (L x S) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | Privacy | Production console exposure of raw landmark matrices or camera frame arrays. | L=4, S=4 (16 High) | Mohit Sharma | Complete removal of `console.log(results)` calls; safe opt-in sanitized diagnostic wrapper (`window.ENABLE_DIAGNOSTICS`). | **Stop Condition**: DevTools console shows raw coordinate array. Code check blocks release if unredacted `console.log` exists. | L=1, S=2 (2 Low) | **Mitigated** |
| **RSK-02** | Privacy / Hardware | Uninformed camera prompt or failure to release camera stream on exit. | L=4, S=3 (12 High) | Mohit Sharma | Pre-permission privacy banner; explicit Start/Stop buttons; `MediaStreamTrack.stop()` invoked on stop/unload. | **Stop Condition**: Webcam LED remains illuminated after clicking "Stop Camera". Stream must terminate within <500ms. | L=1, S=2 (2 Low) | **Mitigated** |
| **RSK-03** | Misuse / Compliance | Misapplication of handpose for authentication, profiling, surveillance, or health assessment. | L=3, S=5 (15 High) | Mohit Sharma | Prominent intended/prohibited use banners in UI, [README.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/README.md), and [AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md). | **Stop Condition**: Discovery of feature code attempting identity matching or data export. Immediate removal required. | L=1, S=2 (2 Low) | **Mitigated** |
| **RSK-04** | Operation / Accuracy | Unstable handpose predictions causing erratic pointer jumps or false clicks. | L=4, S=3 (12 High) | Mohit Sharma | Exponential coordinate smoothing (`alpha = 0.25`); middle-finger coordinate boundary clamping; pointer lock loss release. | **Stop Condition**: Coordinate delta > 200px per frame without hand movement; automatic fallback to default OS cursor. | L=2, S=2 (4 Low) | **Mitigated** |
| **RSK-05** | Operation / Accuracy | Inaccurate tracking due to poor lighting, occlusion, background clutter, skin tone, or mobility differences. | L=4, S=3 (12 High) | Mohit Sharma | Environmental limitation disclaimers; dynamic status badges ("No Hand Detected", "Searching..."); canvas reset on lost tracking. | **Stop Condition**: 0 hands detected for >3 consecutive seconds resets pointer position and updates UI badge. | L=2, S=2 (4 Low) | **Mitigated** |
| **RSK-06** | Dependency / Security | Third-party script tampering, CDN downtime (`unpkg.com`, `cdnjs`), or breaking `ml5.js` updates. | L=3, S=4 (12 High) | Mohit Sharma | Pin dependencies to exact versions (`ml5@0.12.2`, `materialize@1.0.0`); document CDN fallback and update review policy. | **Stop Condition**: Network error loading script tag sets UI status to "Model Failed to Load" and disables controls. | L=2, S=2 (4 Low) | **Mitigated** |
| **RSK-07** | Accessibility | Exclusion of users unable to use camera or hand gestures. | L=3, S=3 (9 Medium) | Mohit Sharma | Complete keyboard accessibility (`Tab`, `Space`, `Enter`, `Esc`); ARIA live status regions; non-camera "Simulate Hand Pattern" mode. | **Stop Condition**: Any interactive control un-focusable via Keyboard `Tab` navigation. | L=1, S=2 (2 Low) | **Mitigated** |

---

## 3. Operational Pre-Flight Checklist

Before launching or serving `ai-hand-detection`:
1. **Model Initialization Check**: Confirm `modelIsLoaded === true` before enabling UI checkboxes.
2. **Camera Readiness Check**: Confirm `video.readyState === video.HAVE_ENOUGH_DATA` before drawing canvas frames.
3. **Pointer Lock Check**: Confirm `document.pointerLockElement === c1` during pointer lock execution.
4. **Console Cleanliness Check**: Verify zero active `console.log(results)` calls in JavaScript execution context.

---

## 4. Operational Feedback into AIMS Risk Treatment

Operational findings (e.g. user error reports, browser compatibility failures, CDN outages) are logged as CAPA records ([CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md)) and reviewed during annual risk reviews or quarterly management reviews to update this Risk Assessment.
