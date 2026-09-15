# Dependency & Supply Chain Governance

## 1. Overview
This document details the external software dependencies utilized by the `ai-hand-detection` application, their integrity mechanisms, version pinning status, and the security review process required before upgrading third-party libraries.

## 2. Dependency Inventory

| Library Name | Pinned Version | Source CDN / Provider | Purpose | License |
| :--- | :--- | :--- | :--- | :--- |
| **ml5.js** | `0.12.2` | `https://unpkg.com/ml5@0.12.2/dist/ml5.min.js` | Machine learning wrapper for MediaPipe Handpose | MIT |
| **Materialize CSS** | `1.0.0` | `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css` | UI components and responsive layout | MIT |
| **Materialize JS** | `1.0.0` | `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js` | UI interactive components | MIT |

## 3. Supply Chain Security Principles

1. **Explicit Version Pinning**: All dependencies included via CDN (`<script>` or `<link>`) must specify exact release tags (e.g. `@0.12.2`) rather than floating tags like `@latest` or `@0.x`.
2. **No Unnecessary Dependencies**: The project maintains zero backend node server dependencies and relies solely on native browser APIs (`getUserMedia`, `HTMLCanvasElement`, `PointerLock API`) and minimal frontend runtime scripts.
3. **Client-Side Execution Verification**: Third-party libraries run purely inside the user's browser sandbox and do not transmit analytics, telemetry, or user data to external tracking endpoints.

## 4. Dependency Review & Update Procedure
Before any dependency version upgrade is committed to production:
1. **Changelog & CVE Audit**: Inspect upstream repository releases and vulnerability databases (e.g. NVD, GitHub Advisory Database) for security flaws.
2. **Privacy Audit**: Verify that the updated version does not introduce remote telemetry, data collection, or external model fetch endpoints beyond standard model weights.
3. **Functional Verification**: Perform manual testing of hand detection, pointer lock, and camera shutdown to confirm backwards compatibility.
4. **Console Cleanliness Check**: Ensure the new version does not output unredacted debug information to the browser console.
