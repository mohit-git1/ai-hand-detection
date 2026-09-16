# Governance & Risk Management Charter

**Document Reference:** AIMS-GOV-5.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**ISO/IEC 42001 Clause Alignment:** Clause 5.1 (Leadership & Commitment) & Clause 5.2 (AI Policy)  

---

## 1. Top Management Leadership & Sponsorship Charter

Top management of the Noida Business Unit demonstrates leadership and commitment with respect to the AI Management System (AIMS) by:

1. **Ensuring Strategic Alignment**: Establishing that AI policies and objectives are compatible with the strategic direction of the organization.
2. **Resource Provisioning**: Allocating necessary staffing, client compute budget, hosting infrastructure, and tools to maintain effective AI risk controls ([RESOURCES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RESOURCES.md)).
3. **Endorsing Governance & Risk Controls**: Signing and endorsing the AI Policy ([AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md)) and formal risk treatment plans ([RISK_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RISK_ASSESSMENT.md)).
4. **Conducting Periodic Management Reviews**: Convening semi-annual management reviews ([MANAGEMENT_REVIEW.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/MANAGEMENT_REVIEW.md)) to assess system effectiveness, audit findings, CAPA status, and continual improvement initiatives.
5. **Promoting Continual Improvement**: Supporting systematic retrospectives and nonconformity resolution ([CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md), [CONTINUAL_IMPROVEMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CONTINUAL_IMPROVEMENT.md)).

### Top Management Sponsor Sign-Off
- **Top Management Sponsor**: Mohit Sharma (Lead Engineer & Designated Top Management Representative, Noida Business Unit)
- **Signature & Endorsement**: *Mohit Sharma* (Signed electronically on 15 September 2026)

---

## 2. Intended vs. Prohibited Uses

### Intended Uses
- Interactive client-side hand landmark visualization.
- Demonstration of real-time browser-based computer vision.
- Simulated single-pointer gesture interaction demo.

### Prohibited Uses
The application and its underlying model outputs must **NOT** be used for:
- Identity verification, authentication, or biometric matching.
- Physical or digital access control.
- Profiling, categorization, surveillance, or tracking of individuals.
- Medical diagnosis, health monitoring, or clinical assessments.
- Employment, recruitment, worker monitoring, or performance evaluation.
- Credit, insurance, educational, or legal eligibility decisions.
- Safety-critical system control or industrial operation.
- Any other consequential or high-risk decision-making context.

---

## 3. Camera Data Flow & Privacy Framework
- **Client-Side Scope**: Camera frames are captured via `navigator.mediaDevices.getUserMedia` and processed strictly within the client browser DOM (`HTMLCanvasElement`).
- **No Remote Transmission**: Camera streams, frame buffers, and hand landmark coordinates are **never** transmitted over network protocols to external servers or telemetry endpoints.
- **Transient Memory Lifecycle**: Frame imagery and landmark vectors exist transiently in JavaScript heap memory during processing loops and are automatically overwritten on subsequent frame iterations.
- **Stream Termination**: Explicit camera stop controls and page unload listeners invoke `MediaStreamTrack.stop()` to ensure physical camera hardware is released immediately when disabled or when navigating away.

---

## 4. Model Limitations & Mitigations
The application relies on the `ml5.js` / MediaPipe Handpose model. Operational performance varies based on environment and user characteristics:
- **Lighting**: Poor or high-contrast illumination may degrade landmark tracking accuracy.
- **Occlusion & Pose**: Extreme hand orientation, overlapping fingers, or partial camera view entry can cause missing detections or landmark displacement.
- **Diversity & Mobility**: Model behavior may vary across skin tones, hand sizes, and mobility conditions.
- **Mitigation**: Clear UI limitation disclaimers, visual tracking status indicators ("No Hand Detected", "Tracking Active"), coordinate exponential smoothing to prevent cursor jumps, and non-gesture alternative controls.

---

## 5. Risk Register Summary

| Risk ID | Identified Risk Description | Implemented Control | Verification Method | Status |
| :--- | :--- | :--- | :--- | :--- |
| **R-01** | Production exposure of handpose coordinates & camera logs | Removed all `console.log(results)` calls; safe opt-in sanitized diagnostic mechanism | Source code audit & console inspection | **Mitigated** |
| **R-02** | Uninformed camera permission request & unreleased stream | Pre-permission privacy banner; explicit Camera Start/Stop controls; stream track release on exit | UI inspection & camera hardware indicator test | **Mitigated** |
| **R-03** | Misuse of hand detection for authentication or surveillance | Explicit intended/prohibited use notices in UI and repository documentation | UI & documentation review | **Mitigated** |
| **R-04** | Pointer erratic behavior due to lost tracking or model lock | Automatic pointer release on tracking loss/lock exit; coordinate smoothing; prominent exit button | Functional pointer test & lock-loss test | **Mitigated** |
| **R-05** | Over-reliance on inaccurate or unstable AI outputs | System status badges ("Automated AI Output", "No Hand Detected"); environmental limitation warnings | UI inspection & low-light / occlusion test | **Mitigated** |
| **R-06** | Exclusion of non-camera or keyboard-only users | Full keyboard navigation (`Tab`, `Space`, `Enter`, `Esc`); ARIA live regions; test mode | Keyboard-only accessibility audit | **Mitigated** |
| **R-07** | Supply chain vulnerability from unpinned third-party scripts | Documented CDN dependencies, pinned versions (`ml5@0.12.2`), review policy | Dependency audit & network check | **Mitigated** |

---

## 6. Governance Review & Change Management Policy
- **Dependency Audit**: Any update to `ml5.js` or Materialize CSS must be reviewed for privacy changes before deployment under [CHANGE_CONTROL.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CHANGE_CONTROL.md).
- **Release Verification**: Pre-release checklists must confirm zero console logging of landmark vectors and verify complete camera shutdown behavior ([OPERATIONAL_RUNBOOK.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/OPERATIONAL_RUNBOOK.md)).
