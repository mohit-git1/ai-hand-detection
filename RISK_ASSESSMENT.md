# ISO/IEC 42001 Risk Assessment & Enforced Risk Treatment Plan

**Document Reference:** AIMS-RSK-8.3  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Risk Assessment Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**ISO/IEC 42001 Clause Alignment:** Clause 8.3 (AI Risk Treatment)  

---

## 1. AI Risk Management Methodology

The Noida Business Unit conducts systematic risk assessments for system `AIS-2e3a94ae` evaluating privacy impact, AI output validity, hardware control, supply chain integrity, and user autonomy.

### Risk Scoring Criteria
- **Likelihood**: 1 (Unlikely) to 5 (Frequent)
- **Impact**: 1 (Negligible) to 5 (Critical)
- **Risk Level**: Likelihood × Impact (Low 1-5, Medium 6-12, High 15-25)

---

## 2. Risk Register & Enforced Operational Treatment Plan

| Risk ID | Identified Risk Description | Initial Risk | Enforced Code & Operational Risk Treatment | Residual Risk | Verification Method | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R-01** | Production console exposure of handpose landmark coordinates or frame data. | **High (15)** | Redacted all raw `console.log(results)` calls in `video.js` and `mouse/video.js`. Opt-in `safeLog()` string wrapper only. | **Low (2)** | Static `grep` check in CI pipeline ([.github/workflows/ci.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/ci.yml)). | **Mitigated** |
| **R-02** | Unreleased webcam stream track keeping physical camera active after stop. | **High (16)** | Explicit `stopCamera()` function iterating `mediaStream.getTracks().forEach(t => t.stop())` on user stop and `beforeunload`. | **Low (2)** | WebMediaStreams track state audit & webcam hardware LED test. | **Mitigated** |
| **R-03** | Misuse of AI hand detection for authentication, surveillance, or high-risk decisions. | **High (20)** | Prominent UI notice banners on `index.html` and `mouse/index.html`; explicit intended/prohibited use rules in [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md). | **Low (4)** | UI & repository documentation inspection. | **Mitigated** |
| **R-04** | Erratic pointer cursor movement or cursor lock traps during lost tracking. | **Medium (12)** | Added coordinate bounds checking (`0 <= x <= c1.width`), confidence thresholding (`>=0.70`), exponential smoothing (`alpha = 0.25`), and `ESC` key un-lock. | **Low (3)** | Pointer lock exit functional test & boundary test. | **Mitigated** |
| **R-05** | Over-reliance on inaccurate or unstable AI outputs during low light / occlusion. | **Medium (10)** | Status badge updates ("No Hand Detected / Searching..."), confidence drift alerts in [telemetry.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/telemetry.js), and limitation warnings. | **Low (2)** | Low-light and occlusion failure test. | **Mitigated** |
| **R-06** | Exclusion of non-camera or keyboard-only users. | **Medium (9)** | Full keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`), ARIA live regions, and interactive hand simulation pattern (no camera required). | **Low (2)** | Keyboard accessibility audit. | **Mitigated** |
| **R-07** | Supply chain vulnerability from unpinned or tampered CDN scripts. | **High (15)** | Pinned version numbers (`ml5.js@0.12.2`, `materialize@1.0.0`), dependency scanning workflow ([.github/workflows/dependency-scan.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/dependency-scan.yml)). | **Low (3)** | Dependency audit in [DEPENDENCIES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/DEPENDENCIES.md). | **Mitigated** |

---

## 3. Linkage to Implementation Features

- **Confidence Guardrail**: Code in `video.js:243` and `mouse/video.js:215` checks `results[0].handInViewConfidence >= 0.70`. Detections below baseline threshold trigger `Telemetry.recordFrame(null)` and transition system to "Searching for hand...".
- **Rate Limit Guardrail**: Target FPS control slider (`fpsInput`) throttles frame inference callback loops (`setTimeout(timerCallback, fps)`).
- **Landmark Array Bounds Check**: Before processing annotations or landmarks, code checks `element.boundingBox`, `element.annotations`, and array lengths to prevent array index out-of-bounds crashes.

---

**Approved by:**  
*Mohit Sharma, Risk Assessment Owner & Lead Engineer*  
*Date: 15 September 2026*
