# 🤖 ai-hand-detection

**System Identifier:** `AIS-2e3a94ae`  
**Business Unit:** Noida Business Unit  
**Named System & Compliance Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Compliance Standard:** ISO/IEC 42001:2023 AI Management System (AIMS)  

---

## 👋 About this project
`ai-hand-detection` is an interactive browser-based hand detection and landmark visualization web application. It uses client-side machine learning via `ml5.js` (MediaPipe Handpose) to track hand landmarks directly within the user's browser.

---

## 🔒 ISO/IEC 42001 AI Management System (AIMS) Governance

This application operates under a complete **ISO/IEC 42001:2023** AI Management System framework owned by **Mohit Sharma** for the **Noida Business Unit**.

### 📜 Core AIMS Governance Documentation

| ISO 42001 Clause | AIMS Document Title | Document Link | Description |
| :--- | :--- | :--- | :--- |
| **Clause 4.4** | AIMS Scope Statement | 📄 [AIMS_SCOPE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AIMS_SCOPE.md) | Formally defines system boundaries, AI value-chain roles, and interested party needs. |
| **Clause 5.1 / 5.2** | Management AI Policy | 📄 [AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md) | Top management-approved policy committing to responsible use, privacy, and human control. |
| **Clause 6.1 / 8.2** | AI Risk Assessment | 📄 [RISK_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RISK_ASSESSMENT.md) | Risk matrix, mitigations, residual risk ratings, and operational stop conditions. |
| **Clause 6.3** | Change Control Procedure | 📄 [CHANGE_CONTROL.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CHANGE_CONTROL.md) | Workflow for code changes, release approvals, PR checklists, and rollback plans. |
| **Clause 7.1** | Resources & Hosting | 📄 [RESOURCES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RESOURCES.md) | Static web hosting budget, browser compute resource allocation, and zero backend cost. |
| **Clause 7.2** | Personnel Competence | 📄 [COMPETENCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/COMPETENCE.md) | Competency requirements matrix and training records for Mohit Sharma (Owner). |
| **Clause 7.3 / 7.4** | Awareness & Communication | 📄 [AWARENESS_COMMUNICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AWARENESS_COMMUNICATION.md) | Briefing records, stakeholder matrix, and user privacy communication protocols. |
| **Clause 7.5** | Document Control Register | 📄 [DOCUMENT_CONTROL.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/DOCUMENT_CONTROL.md) | Master register tracking versioning, review dates, and approvals of AIMS records. |
| **Clause 8.1** | Operational Runbook | 📄 [OPERATIONAL_RUNBOOK.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/OPERATIONAL_RUNBOOK.md) | Runbook for build, deployment, smoke tests, supported browsers, and incident contacts. |
| **Clause 8.4** | Supplier Assessment | 📄 [SUPPLIER_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/SUPPLIER_ASSESSMENT.md) | Governance for `ml5.js`, `Materialize`, and `unpkg CDN` dependency pinning and fallbacks. |
| **Clause 9.1** | Monitoring & Analysis | 📄 [MONITORING.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/MONITORING.md) | Privacy-preserving monitoring framework, camera error rates, and analysis logs. |
| **Clause 9.3** | Management Review | 📄 [MANAGEMENT_REVIEW.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/MANAGEMENT_REVIEW.md) | Leadership review procedure and quarterly meeting minutes. |
| **Clause 10.1** | CAPA & Nonconformity | 📄 [CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md) | CAPA workflow and completed Corrective Action Record (`CAPA-2026-01`). |
| **Clause 10.2** | Continual Improvement | 📄 [CONTINUAL_IMPROVEMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CONTINUAL_IMPROVEMENT.md) | Continual improvement backlog and retrospective review notes. |
| **Verification** | Controls Verification | 📄 [VERIFICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/VERIFICATION.md) | Step-by-step audit verification guide for every implemented control. |
| **General** | Privacy & Governance | 📄 [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md) | High-level governance, data flow, and prohibited use declarations. |
| **Testing** | Operational Validation | 📄 [TESTING.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/TESTING.md) | Test plan for lighting, occlusion, background clutter, and device variations. |

---

## ⚙️ Features

- ✅ Toggle switch to turn AI detection overlay on or off
- ✅ Explicit Camera Start / Stop buttons with physical stream release
- ✅ Target FPS processing speed slider
- ✅ Keyboard accessible navigation and controls (`Tab`, `Space`, `Enter`, `Esc`)
- ✅ Simulated hand pattern mode (non-camera alternative)
- ✅ Simulated mouse pointer interaction demo with coordinate smoothing
- ✅ Configurable border sensitivity in mouse example

---

## 🚀 How to Run Locally

Because browser webcam permissions require an HTTP context, run a local web server:

### Option 1: Python HTTP Server (Recommended)
```bash
python3 -m http.server 8000
```
Then navigate to:
- **Main App:** [http://localhost:8000](http://localhost:8000)
- **Mouse Demo:** [http://localhost:8000/mouse/](http://localhost:8000/mouse/)

### Option 2: Node.js / npx
```bash
npx serve .
```

---

## ✌️ Credits & Dependencies
- [Materialize CSS v1.0.0](https://materializecss.com/)
- [ml5.js v0.12.2](https://ml5js.org/)
