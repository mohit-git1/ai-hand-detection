# Release & Governance Changelog

All notable changes to the `ai-hand-detection` software, AI models, third-party dependencies, and ISO 42001 governance controls are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2026-09-15

### Added
- **ISO 42001 Governance Framework**: Comprehensive AIMS compliance suite covering Leadership, AI Policy, Risk Treatment, Resources, Competence, Communication, Document Control, Management Review, Internal Audit, and CAPA procedures.
- **Client Telemetry Diagnostics**: Added [telemetry.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/telemetry.js) providing privacy-preserving metrics tracking for permission denials, inference load failures, detection rates, rolling confidence averages, and local JSON export capability.
- **Automated CI Workflows**: Added GitHub Actions workflows for static compliance validation ([.github/workflows/ci.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/ci.yml)) and dependency vulnerability checks ([.github/workflows/dependency-scan.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/dependency-scan.yml)).
- **Container Provisioning**: Added [Dockerfile](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/Dockerfile) and [nginx.conf](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/nginx.conf) with Content-Security-Policy security headers for static container deployments.
- **Automated Compliance Verification Script**: Added [scripts/audit_check.sh](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/scripts/audit_check.sh) for automated repository validation.

### Changed
- **Redacted Console Exposures**: Completely removed raw landmark prediction logging (`console.log(results)`) in `video.js` and `mouse/video.js`. Created safe `window.DEBUG_LOGGING` opt-in mechanism emitting count-only diagnostic strings.
- **Stream Cleanup**: Hardened `stopCamera()` implementation to ensure `MediaStreamTrack.stop()` executes cleanly upon user toggles or page unload (`beforeunload`).
- **Coordinate Smoothing**: Added exponential coordinate smoothing (`alpha = 0.25`) in `mouse/video.js` to prevent pointer cursor jump jitter.

### Security
- Version-pinned third-party CDN scripts (`ml5.js@0.12.2`, `materialize@1.0.0`).
- Implemented static verification checks blocking production logging of landmark coordinates.

---

## [1.0.0] - 2026-01-10

### Added
- Initial release of client-side `ai-hand-detection` interactive web app using `ml5.js` handpose model.
- Hand pointer demo sub-module in `mouse/index.html`.
- Canvas rendering and video stream integration.
