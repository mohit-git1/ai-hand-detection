# Controls Verification & Evidence Guide

## 1. Overview
This document provides specific step-by-step procedures to verify that all 10 GovernXOne ISO/IEC 42001 risk controls have been successfully implemented and are operational in the `ai-hand-detection` codebase.

## 2. Control Verification Matrix

### Control 1: Console Exposure Removal & Safe Diagnostics
- **Verification Procedure**:
  1. Open the browser Developer Tools (`F12` or `Ctrl+Shift+I`) and switch to the **Console** tab.
  2. Navigate to `http://localhost:8000` and start the camera / AI detection.
  3. Observe console output while moving your hand in front of the camera.
- **Expected Outcome**: Zero output of handpose landmark arrays, coordinate matrices, raw camera frames, or biometric vectors.

### Control 2: Camera Privacy & Stream Release
- **Verification Procedure**:
  1. Load the page; verify the Privacy & Camera Notice modal appears before camera streaming begins.
  2. Click **Start Camera** and verify the webcam indicator light turns ON.
  3. Click **Stop Camera** (or toggle AI off).
- **Expected Outcome**: The webcam indicator light turns OFF immediately, confirming `MediaStreamTrack.stop()` was invoked.

### Control 3: Intended-Use & Prohibited-Use Restrictions Notice
- **Verification Procedure**:
  1. Inspect the main landing page ([index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/index.html)), pointer page ([mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html)), and [README.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/README.md).
- **Expected Outcome**: Prominent notice displayed explicitly stating intended interactive/demo use and prohibiting authentication, profiling, surveillance, medical, or employment decisions.

### Control 4: AI-Output Safeguards & Pointer Control
- **Verification Procedure**:
  1. In pointer mode ([mouse/index.html](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/index.html)), toggle AI ON.
  2. Press `Esc` key or click the prominent **Exit Pointer Mode** button.
- **Expected Outcome**: Pointer lock releases instantly, fake cursor disappears, and AI toggle automatically resets to OFF.

### Control 5: Unreliable Detection Handling
- **Verification Procedure**:
  1. Cover the webcam lens or remove your hand from the field of view.
- **Expected Outcome**: UI status badge transitions to "No Hand Detected / Searching...", preventing stale landmark projections or cursor leaps.

### Control 6: Performance & Reliability Validation Plan
- **Verification Procedure**:
  1. Review [TESTING.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/TESTING.md).
- **Expected Outcome**: Comprehensive test matrix covering lighting, occlusion, background clutter, devices, and expected error states.

### Control 7: Accessibility & Keyboard Operations
- **Verification Procedure**:
  1. Disconnect mouse or use keyboard-only (`Tab`, `Shift+Tab`, `Space`, `Enter`).
  2. Navigate through camera controls, AI switches, and modal buttons.
- **Expected Outcome**: All buttons receive clear visual focus outline and can be triggered via keyboard. Screen reader live status region announces updates.

### Control 8: Dependency Supply Chain Controls
- **Verification Procedure**:
  1. Review [DEPENDENCIES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/DEPENDENCIES.md) and inspect CDN tags in `index.html`.
- **Expected Outcome**: All external CDN scripts feature pinned versions (`ml5@0.12.2`, `materialize@1.0.0`) with documented update governance.

### Control 9: Governance & Risk Documentation
- **Verification Procedure**:
  1. Inspect [GOVERNANCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/GOVERNANCE.md).
- **Expected Outcome**: Contains risk register mapping Risk → Control → Verification Method → Status.

### Control 10: Evidence Documentation
- **Verification Procedure**:
  1. Review this document ([VERIFICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/VERIFICATION.md)).
- **Expected Outcome**: Clear manual and automated inspection steps for all implemented safety mechanisms.
