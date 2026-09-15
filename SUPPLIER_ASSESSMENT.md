# ISO/IEC 42001 Supplier Assessment & Dependency Controls

**Document Reference:** AIMS-SUP-8.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Supplier Assessment Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 8.4 & Annex A.10 (Supplier Relationships)  

---

## 1. Overview & Supplier Governance Scope

System `AIS-2e3a94ae` relies on external third-party software libraries and content delivery networks (CDNs). Under ISO/IEC 42001 Clause 8.4, all third-party AI components and hosting infrastructure must be assessed, documented, version-pinned, and monitored.

---

## 2. Supplier & Dependency Assessment Register

| Dependency / Supplier | Exact Pinned Version | CDN Provider / URL | License & Terms | Privacy & Security Risk Assessment | Availability & Fallback Strategy | Responsible Owner | Approval Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ml5.js** (open-source library) | `0.12.2` | UNPKG (`https://unpkg.com/ml5@0.12.2/dist/ml5.min.js`) | MIT License | **Low Risk**: Purely client-side JS library wrapping MediaPipe Handpose. Collects zero telemetry. | **Fallback**: UI displays CDN connection error notice; local fallback script can be served if CDN un-available. | Mohit Sharma | **Approved** |
| **Materialize CSS** (UI framework) | `1.0.0` | cdnjs (`https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css`) | MIT License | **Low Risk**: Static CSS layout library. Zero data capture or network execution. | **Fallback**: Basic HTML native fallback styling. | Mohit Sharma | **Approved** |
| **UNPKG CDN** (NPM CDN delivery) | N/A (Infrastructure) | `https://unpkg.com/` | Public CDN Terms | **Low Risk**: Public static asset delivery network. High global availability via Cloudflare network. | **Fallback**: Local self-hosting of `ml5.min.js` script in project `/vendor` directory if UNPKG fails. | Mohit Sharma | **Approved** |

---

## 3. Dependency Pinning & Integrity Rules

1. **Strict Version Pinning**: All script tags must specify explicit exact versions (e.g. `ml5@0.12.2`). Using un-versioned or floating tags (e.g. `@latest`, `@0.x`) is strictly prohibited.
2. **No Unvetted External Calls**: Client-side scripts must execute locally inside browser DOM memory without initiating unexpected cross-origin API data exports.
3. **Third-Party Review Cadence**: Dependencies shall be reviewed semi-annually by Mohit Sharma for CVE vulnerabilities, license updates, or breaking changes.
