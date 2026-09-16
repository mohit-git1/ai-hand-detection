# ISO/IEC 42001 Third-Party Supplier Assessment & Governance

**Document Reference:** AIMS-SUP-8.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Supplier Governance Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**ISO/IEC 42001 Clause Alignment:** Clause 8.4 & Annex A.10 (Supplier Relationships)  

---

## 1. Supplier Governance Framework

The Noida Business Unit evaluates, manages, and audits third-party AI libraries, script delivery networks (CDNs), and open-source suppliers used by `ai-hand-detection` to mitigate supply-chain security, privacy, and availability risks.

---

## 2. Supplier Evaluation & Risk Register

| Supplier / Asset | Service Provided | Dependency Type | Pinning & Security Control | Supplier Risk | Fallback Procedure | Review Cadence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`unpkg.com` (npm CDN)** | Hosting and delivery of `ml5.js` v0.12.2 library bundle | External Content Delivery Network (CDN) | Exact URL version pinning (`ml5@0.12.2`); HTTPS transport enforcement; automated dependency scan ([.github/workflows/dependency-scan.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/dependency-scan.yml)) | **Low** | Local fallback script pattern; UI status update to "Model Load Delay" | Annual |
| **`ml5.js` Project (ITP @ NYU)** | Open-source browser computer vision library wrapper around MediaPipe Handpose | Open-source AI model library | Pinned version 0.12.2; pre-release code audit verifying zero telemetry transmission to external servers | **Low** | Interactive simulation mode pattern (`video.js:193`) requiring zero external model loads | Annual |
| **`cdnjs.cloudflare.com`** | Materialize CSS framework stylesheet delivery | External CDN | Version-pinned URL (`materialize/1.0.0/css/materialize.min.css`) | **Low** | Local CSS fallback styles in [style.css](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/style.css) | Annual |

---

## 3. Dependency Review & Change Gate

1. **No Floating Tags**: External script URLs referencing `latest` or unversioned endpoints are strictly prohibited in HTML files.
2. **Periodic Vulnerability Scan**: Weekly automated workflow checks for reported vulnerabilities or integrity issues in external CDN packages.
3. **Contract / Terms Review**: Confirm that unpkg and CDN terms of service do not collect or inspect client-side canvas data.

---

**Approved by:**  
*Mohit Sharma, Supplier Governance Owner & Lead Engineer*  
*Date: 15 September 2026*
