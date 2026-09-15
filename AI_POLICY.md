# ISO/IEC 42001 AI Policy

**Document Reference:** AIMS-POL-5.2  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Organization / Unit:** Noida Business Unit  
**Named Policy Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Approved By:** Mohit Sharma (Lead Engineer & Top Management Representative, Noida Business Unit)  
**Effective Date:** 15 September 2026  
**Annual Review Date:** 15 September 2027 (Review Cycle: Annual)  
**ISO/IEC 42001 Clause Alignment:** Clause 5.1 (Leadership & Commitment) & Clause 5.2 (AI Policy)  

---

## 1. Top Management Policy Statement & Commitments

Top management of the Noida Business Unit, led by **Mohit Sharma (Top Management Representative & System Owner)**, is formally committed to operating browser-based artificial intelligence applications responsibly, securely, transparently, and ethically in compliance with **ISO/IEC 42001:2023**.

For system `AIS-2e3a94ae` (`ai-hand-detection`), top management mandates the following explicit commitments:

1. **Commitment to Responsible Camera & Biometric Use**: The application processes camera frames strictly client-side inside the user's browser DOM memory (`HTMLCanvasElement`). The application shall **NEVER** save, persist, or transmit raw camera video, image frames, or biometric hand landmark coordinates across network endpoints, nor shall it be used for identity verification, authentication, surveillance, profiling, medical diagnosis, or consequential decision-making.
2. **Commitment to Human Control & User Autonomy**: Users shall maintain complete, unhindered control over camera streaming and AI processing. The system mandates explicit Start/Stop camera buttons, a non-camera simulation mode, keyboard shortcuts (`Esc`), and automatic pointer-lock release mechanisms to ensure users can halt processing at any time.
3. **Commitment to Supplier Oversight of ml5.js & CDNs**: All external software dependencies (`ml5.js` v0.12.2, `Materialize CSS` v1.0.0, `unpkg` CDN) must be pinned to exact reviewed versions, audited for security vulnerabilities, monitored for availability, and backed by documented local fallback procedures.
4. **Commitment to Corrective Action & Issue Management**: System nonconformities, privacy concerns, hand-detection failures, and pointer interaction hazards shall be systematically investigated, remediated, and verified under a formal CAPA (Corrective Action) process.
5. **Commitment to Monitoring & Operational Safety**: A proportionate monitoring framework shall measure camera access error rates, inference readiness, pointer-lock stability, and CDN availability without collecting user PII or raw landmark data.
6. **Commitment to Continual Improvement**: The organization commits to continually evaluating user feedback, browser compatibility testing, and risk reviews to improve system performance, accessibility, and governance.

---

## 2. Measurable AI Policy Objectives

| Objective Domain | Target Benchmark | Responsible Owner | Verification Method |
| :--- | :--- | :--- | :--- |
| **Privacy Protection** | 0 production console exposures of raw landmark matrices or frame buffers. | Mohit Sharma | Source code audit & console check |
| **Hardware Release** | 100% camera stream track shutdown upon user stop or window unload (<500ms). | Mohit Sharma | Browser MediaDevices state audit |
| **Human Control** | 100% keyboard accessibility (`Tab`, `Space`, `Enter`, `Esc`) for all UI controls. | Mohit Sharma | Keyboard-only usability testing |
| **Supplier Security** | 100% version-pinned third-party CDN script tags with fallback support. | Mohit Sharma | HTML source code inspection |
| **CAPA Closure** | 100% of reported AI nonconformities resolved within 30 days of logging. | Mohit Sharma | CAPA register audit |

---

## 3. Communication & Governance Review

This AI Policy is communicated across the Noida Business Unit, published in the codebase root ([AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md)), linked from the application user interface, and formally reviewed annually by Mohit Sharma.

---

**Approved by:**  
*Mohit Sharma, Lead Engineer & Top Management Representative (Noida Business Unit)*  
*Date: 15 September 2026*
