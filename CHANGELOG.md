# Changelog

All notable changes to the `ai-hand-detection` application (System ID: `AIS-2e3a94ae`) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) AI Management System standards.

## [1.2.0] - 2026-09-15

### Added
- Implemented client-side operational telemetry module ([telemetry.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/telemetry.js)) tracking permission denials, inference load failures, pointer lock losses, and rolling average confidence.
- Added DOM telemetry diagnostics panel (`<div id="telemetry-panel">`) and "Export Diagnostics JSON" button to `index.html` and `mouse/index.html`.
- Attached sample telemetry export evidence ([telemetry-sample.json](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/telemetry-sample.json)).
- Added Clause 8.2 Operational Risk Assessment table mapping telemetry signals to DOM alert banners (`telemetry-alert`).
- Added Role-Based Competency Matrix, Training Curricula, and Completed Training Records to [COMPETENCE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/COMPETENCE.md).
- Added Personnel Awareness Training Material and Onboarding Process Checklist to [AWARENESS_COMMUNICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AWARENESS_COMMUNICATION.md).
- Added Resource Determination Methodology and Capacity Planning to [RESOURCES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RESOURCES.md).

### Security & Privacy
- Enforced complete redaction of raw prediction objects (`results`) and landmark matrices in production JavaScript console.
- Bound `window.DEBUG_LOGGING` wrapper (`safeLog`) for count-only status string logging.

### Fixed
- Fixed middle-finger pointer movement jitter by implementing exponential coordinate smoothing (`alpha = 0.25`).
- Fixed physical webcam stream release by invoking `mediaStream.getTracks().forEach(t => t.stop())` on camera stop and window unload.

## [1.1.0] - 2026-09-15

### Added
- Formally established ISO/IEC 42001 AIMS documentation framework ([AIMS_SCOPE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AIMS_SCOPE.md), [AI_POLICY.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AI_POLICY.md), [RISK_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RISK_ASSESSMENT.md), [CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md)).
- Added explicit Start Camera, Stop Camera, and Exit Pointer Mode buttons to user interface.
- Added non-camera "Simulate Hand Pattern" mode for accessibility compliance.
- Added ISO 42001 governance footer navigation links across all pages.

## [1.0.0] - 2021-04-08

### Added
- Initial open-source release of `ai-hand-detection` visualizer and `mouse` control sub-module using `ml5.js` handpose.
