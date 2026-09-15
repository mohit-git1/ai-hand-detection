# ISO/IEC 42001 AI Policy

**Document Reference:** AIMS-POL-5.2  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Organization:** Noida Business Unit  
**Named Policy Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Approved By:** Top Management Leadership (Noida Unit)  
**Effective Date:** 15 September 2026  
**Review Cycle:** Annual (Next Review: September 2027)  
**ISO/IEC 42001 Clause Alignment:** Clause 5.1 (Leadership & Commitment) & Clause 5.2 (AI Policy)  

---

## 1. Policy Statement & Commitments

Top management of the Noida Business Unit, under the operational leadership of **Mohit Sharma (System Owner)**, is committed to developing, deploying, and operating Artificial Intelligence systems responsibly, transparently, securely, and ethically in compliance with **ISO/IEC 42001:2023**.

For system `AIS-2e3a94ae` (`ai-hand-detection`), top management mandates the following core commitments:

1. **Responsible & Scope-Bounded Use**: The application shall be operated exclusively for interactive client-side hand visualization and simulated pointer interaction. It shall **NEVER** be used for identity verification, authentication, access control, profiling, surveillance, medical assessment, employment decisions, or consequential automation.
2. **Privacy-Aware Client-Side Processing**: Camera access must be transparent, user-consented, session-scoped, and processed strictly within client-side browser DOM memory (`HTMLCanvasElement`). No camera frames, landmarks, or biometric data shall be saved or transmitted.
3. **Risk Management & Accuracy Transparency**: Operational risks (including inaccurate hand detection, unstable landmark coordinates, and pointer jitter) shall be managed through proactive technical safeguards, environmental disclaimers, visual status badges, and coordinate smoothing.
4. **Human Control & Override**: Users must maintain complete control over camera streaming and AI processing at all times, supported by explicit Start/Stop buttons, keyboard shortcuts (`Esc`), and automatic pointer-lock release mechanisms.
5. **Supplier Oversight & Integrity**: Third-party dependencies (`ml5.js`, `Materialize CSS`, `unpkg CDN`) shall be pinned to exact reviewed versions, monitored for security vulnerabilities, and periodically evaluated for integrity.
6. **Corrective Action & Continual Improvement**: System nonconformities, privacy bugs, and performance issues shall be systematically logged, investigated, corrected, and verified under a formal CAPA workflow.

---

## 2. Policy Objectives & Quantifiable Targets

| Objective Area | Target Metric / Benchmark | Responsible Owner | Monitoring Method |
| :--- | :--- | :--- | :--- |
| **Privacy Protection** | 0 production console exposures of raw landmark matrices or frame buffers. | Mohit Sharma | Code audit & console inspection |
| **Hardware Release** | 100% camera stream track shutdown upon user stop or page unload. | Mohit Sharma | Browser MediaDevices state check |
| **Accessibility** | 100% keyboard accessibility (`Tab`, `Space`, `Enter`, `Esc`) for all UI controls. | Mohit Sharma | Keyboard-only usability test |
| **Dependency Pinning** | 0 unpinned third-party CDN script tags in production builds. | Mohit Sharma | HTML source code inspection |
| **CAPA Closure** | 100% of reported AI defects resolved within 30 days of logging. | Mohit Sharma | CAPA register audit |

---

## 3. Roles and Responsibilities

- **Top Management (Noida Unit Leadership)**: Provides AIMS governance mandate, approves AI policy, reviews AIMS performance annually, and allocates necessary resources.
- **Named AI Policy & System Owner (Mohit Sharma)**: Responsible for daily AIMS operation, risk assessment updates, dependency reviews, incident response, CAPA tracking, and document control.
- **Maintainers & Developers**: Responsible for implementing code changes in strict accordance with this policy, change control procedures, and privacy guidelines.

---

## 4. Communication & Policy Review

This AI Policy is communicated across the Noida Business Unit, published in the codebase root ([AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md)), linked from the application UI, and reviewed at least annually by Mohit Sharma and Top Management.

---

**Approved by:**  
*Executive Leadership Team, Noida Business Unit*  
*Mohit Sharma, Named System Owner (`AIS-2e3a94ae`)*
