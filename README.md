# 🤖 ai-hand-detection

## 👋 About this project
`ai-hand-detection` is an interactive browser-based hand detection and landmark visualization web application. It uses client-side machine learning via `ml5.js` (MediaPipe Handpose) to track hand landmarks directly within the user's browser.

---

## 🔒 Governance, Privacy & AI Safety Controls

This codebase has been updated in alignment with **ISO/IEC 42001 AI Management System** risk assessment recommendations:

### 1. Intended Use
- **Permitted Purposes:** Interactive hand landmark visualization, computer vision demonstration, and simulated pointer interaction.
- **Prohibited Uses:** Identity verification, authentication, physical/digital access control, profiling, surveillance, medical/health assessment, employment decisions, or any other consequential decision-making system.

### 2. Privacy & Camera Security
- **100% Client-Side Processing:** All camera frames and hand landmarks are processed inside the browser memory. Zero imagery or landmark data is saved, stored, or transmitted across the network.
- **Hardware Release:** Explicit camera start/stop controls ensure that physical camera streams are cleanly closed when disabled or when navigating away.
- **Zero Console Exposure:** Raw inference results, landmark vectors, and device parameters are not logged in production builds.

### 3. Governance Documentation
- 📄 [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md) — Risk register, data flow, model limitations, and incident handling policy.
- 📦 [DEPENDENCIES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/DEPENDENCIES.md) — Pinned third-party dependencies (`ml5.js 0.12.2`, `Materialize 1.0.0`) and supply chain governance.
- 🧪 [TESTING.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/TESTING.md) — Validation plan for lighting, occlusion, background clutter, devices, and failure handling.
- ✅ [VERIFICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/VERIFICATION.md) — Step-by-step verification procedures for each implemented safety control.

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
