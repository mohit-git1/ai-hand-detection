# ISO/IEC 42001 AIMS Scope Statement

**Document Reference:** AIMS-DOC-4.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**System & Compliance Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 4.4 (AI Management System Scope)  

---

## 1. Business Unit & Organizational Context

This Scope Statement formally defines the boundaries, applicability, interfaces, and governance framework of the Artificial Intelligence Management System (AIMS) established under **ISO/IEC 42001:2023** for the `ai-hand-detection` web application (System ID: `AIS-2e3a94ae`).

The **Noida Business Unit** owns, operates, and maintains `ai-hand-detection` as a client-side static web application utilizing `ml5.js` (built on MediaPipe Handpose) for real-time hand landmark visualization and simulated pointer interaction.

---

## 2. In-Scope System Processes & Components

The AIMS scope encompasses the complete operational lifecycle (design, development, testing, deployment, dependency governance, monitoring, and risk management) of:
1. **Client-Side Camera Capture**: Local browser-based camera capture using `navigator.mediaDevices.getUserMedia` API.
2. **Local ml5.js Handpose Inference**: Real-time client-side machine learning inference running inside the browser JavaScript engine.
3. **Landmark Geometry Visualization**: Client-side canvas overlay rendering of hand bounding boxes, finger joints, and palm base points ([index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html) and [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js)).
4. **Middle-Finger Pointer Control Interaction**: Client-side pointer demonstration mapping middle-finger landmark coordinates to a simulated on-screen pointer ([mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html) and [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js)).

---

## 3. External Dependency Scope

The AIMS scope includes oversight of external third-party software dependencies required by the application:
- **ml5.js Library**: `ml5.js` version `0.12.2` loaded externally via static CDN (`https://unpkg.com/ml5@0.12.2/dist/ml5.min.js`).
- **Materialize CSS Framework**: `Materialize CSS` version `1.0.0` loaded externally via static CDN (`https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css`).
- **UNPKG Content Delivery Network**: `unpkg.com` static distribution infrastructure.

---

## 4. Formally Justified Exclusions

Under ISO/IEC 42001 Clause 4.4, the following exclusions are formally declared and technical justifications recorded:
1. **Server-Side Model Training & Data Center Infrastructure**: Justified because processing occurs 100% client-side within the user's browser sandbox environment. No server-side training hardware, model weights training pipeline, or backend compute infrastructure is owned or operated.
2. **Biometric Data Storage & Database Retention Protocols**: Justified because camera video frames and hand landmark coordinates exist transiently in browser JavaScript heap memory and are immediately overwritten on subsequent frame iterations; zero raw imagery or landmark vectors are written to local storage, cookies, or remote databases.
