# ISO/IEC 42001 Supplier Assessment & Dependency Controls

**Document Reference:** AIMS-SUP-8.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Supplier Assessment Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 8.4 & Annex A.10 (Supplier Relationships)  

---

## 1. Supplier & Dependency Assessment Overview

System `AIS-2e3a94ae` relies on external third-party software libraries and content delivery networks (CDNs). Under ISO/IEC 42001 Clause 8.4, all third-party AI components and hosting infrastructure must be assessed, documented, version-pinned, and monitored for availability and security risks.

---

## 2. Supplier & Dependency Governance Register

| Dependency / Supplier | Exact Pinned Version | CDN Source URL | License Check | Privacy & Security Risk Assessment | Fallback Decision & Action | Responsible Owner | Approval Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ml5.js** (Open-Source Library) | `0.12.2` | `https://unpkg.com/ml5@0.12.2/dist/ml5.min.js` | MIT License (Verified) | **Low Risk**: Client-side JS library wrapping MediaPipe Handpose. Collects zero user telemetry. | **Fallback Decision**: If `unpkg.com` or `ml5.js` CDN becomes unavailable, switch application script tag to local self-hosted file at `/vendor/ml5.min.js`. | Mohit Sharma | **Approved** |
| **Materialize CSS** (UI Framework) | `1.0.0` | `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css` | MIT License (Verified) | **Low Risk**: Static CSS layout framework. Zero data capture or network execution. | **Fallback Decision**: Native browser HTML fallback styling if `cdnjs` is unreachable. | Mohit Sharma | **Approved** |
| **UNPKG CDN** (NPM CDN Infrastructure) | Infrastructure | `https://unpkg.com/` | Public CDN Terms | **Low Risk**: High-availability static file distribution network built on Cloudflare edge. | **Fallback Decision**: Local self-hosting of static vendor scripts inside `/vendor/` directory. | Mohit Sharma | **Approved** |

---

## 3. Dependency Pinning & Fallback Rules

1. **Strict Version Pinning**: All script tags must specify explicit exact versions (`ml5@0.12.2`). Using unpinned or floating release tags (e.g. `@latest`, `@0.x`) is strictly prohibited.
2. **Local Self-Hosting Fallback Procedure**: If script tag `onerror` triggers due to CDN outage, the application updates UI status to "CDN Unavailable" and allows administrators to switch script sources to local copy `/vendor/ml5.min.js`.
3. **Semi-Annual Review Cadence**: Mohit Sharma conducts semi-annual security, license, and CVE reviews for all third-party dependencies (Next review: **15 March 2027**).
