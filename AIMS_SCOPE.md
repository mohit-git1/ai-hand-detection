# ISO/IEC 42001 AIMS Scope Statement

**Document Reference:** AIMS-DOC-4.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**System & Compliance Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Top Management Sponsor:** Executive Leadership Team (Noida Unit)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 4.4 (AI Management System Scope)  

---

## 1. Executive Summary & Organizational Context

This Scope Statement formally defines the boundaries, applicability, interfaces, and governance framework of the Artificial Intelligence Management System (AIMS) established under **ISO/IEC 42001:2023** for the `ai-hand-detection` web application (System ID: `AIS-2e3a94ae`).

The Noida Business Unit operates and maintains `ai-hand-detection` as a client-side static web application utilizing `ml5.js` (built on TensorFlow.js / MediaPipe Handpose) for real-time hand landmark visualization and simulated pointer interaction.

---

## 2. AIMS Boundaries & Included System Components

### Included Components & Boundaries
The AIMS scope encompasses the complete lifecycle (design, development, testing, static deployment, third-party dependency management, operational monitoring, and risk governance) of:
1. **Main Hand Detection Visualizer**: Client-side HTML/JS application ([index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html) and [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js)).
2. **Pointer Control Demonstration**: Client-side sub-module ([mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html) and [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js)) mapping middle-finger landmark coordinates to a simulated on-screen pointer.
3. **Local Media Access & Processing**: Browser-based `navigator.mediaDevices.getUserMedia` camera capture and DOM `HTMLCanvasElement` rendering.
4. **Third-Party Script Integration**: Client-side execution of `ml5.js` (v0.12.2) and `Materialize CSS` (v1.0.0) loaded via static CDN (`unpkg.com` and `cdnjs.cloudflare.com`).

---

## 3. AI Value-Chain Role

Under ISO/IEC 42001 Annex A definitions, the Noida Business Unit performs the following AI value-chain roles:
- **AI Application Deployer & Integrator**: Integrating pre-trained open-source handpose models (`ml5.js` / MediaPipe) into a browser interface.
- **AI System Operator**: Hosting and serving static web assets to end-users without backend processing.

The Noida Business Unit does **not** perform model pre-training, raw neural network architecture modification, or server-side weight hosting.

---

## 4. Interested Parties & Requirements Matrix

| Interested Party | Category | Key Requirements & Expectations | Addressed In AIMS |
| :--- | :--- | :--- | :--- |
| **End-Users** | Internal / External | Real-time hand landmark visualization, privacy preservation, simple controls, clear disclaimers, keyboard accessibility. | [AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md), [index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html) |
| **GovernXOne Governance** | Compliance / Audit | ISO/IEC 42001 compliance, risk treatment, CAPA process, zero production console logging, supplier controls. | [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md), [RISK_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RISK_ASSESSMENT.md) |
| **Noida Business Leadership** | Management | Clear system ownership (Mohit Sharma), zero cloud infrastructure budget, reputation protection, audit readiness. | [AIMS_SCOPE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AIMS_SCOPE.md), [RESOURCES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RESOURCES.md) |
| **Third-Party CDN Providers** | Supplier | Compliance with CDN acceptable use policies, static asset requests only. | [SUPPLIER_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/SUPPLIER_ASSESSMENT.md) |

---

## 5. Exclusions & Justifications

Under ISO/IEC 42001 Clause 4.4, the following exclusions are formally declared and justified:
1. **Server-Side Model Training & Data Center Infrastructure**: Justified because processing occurs 100% client-side inside the user's browser sandbox. No server infrastructure or AI model training hardware is owned or operated.
2. **Biometric Identity Storage & Data Retention Protocols**: Justified because camera frames and landmark coordinates exist transiently in JavaScript heap memory and are immediately overwritten on frame refresh; no database or local storage retention exists.

---

## 6. Revision & Review Schedule

This Scope Statement is maintained under document control and must be formally reviewed by Mohit Sharma at least annually or upon material changes to system architecture, dependencies, or governance requirements.
