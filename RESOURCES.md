# ISO/IEC 42001 Resources & Hosting Evidence

**Document Reference:** AIMS-RES-7.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**Resource Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 7.1 (Resources)  

---

## 1. Overview & Resource Architecture

`ai-hand-detection` is a lightweight, zero-backend static web application. It requires zero server-side compute, database storage, or cloud infrastructure subscription costs. All processing occurs locally within the user's web browser environment.

---

## 2. Resource Allocation & Infrastructure Details

| Resource Category | Description & Specification | Hosting / Provider | Responsibility & Ownership | Budget / Cost |
| :--- | :--- | :--- | :--- | :--- |
| **Static Web Hosting** | GitHub Pages / Local Web Server (`python3 -m http.server`) serving static HTML, CSS, JS assets. | GitHub Pages / Local Node | Mohit Sharma (Noida Unit) | \$0 (Open Source / Internal) |
| **AI Inference Engine** | Client-side `ml5.js` (v0.12.2) executing inside browser JavaScript runtime. | Client Web Browser | User Browser DOM | \$0 (Client Compute) |
| **CDN Distribution** | Public CDN distribution for script loading (`unpkg.com`, `cdnjs.cloudflare.com`). | UNPKG / Cloudflare CDN | External CDN (Monitored) | \$0 (Public CDN) |
| **Human Personnel** | System Owner (Mohit Sharma) managing code, governance, dependencies, and CAPA. | Noida Business Unit | Mohit Sharma | Internal Staffing |
| **Development Environment** | Linux Workstation, Node.js runtime (`v20.20.2`), Python (`3.13.5`), Git CLI. | Local Workstation | Mohit Sharma | Internal Infrastructure |

---

## 3. Availability, Integrity & Fallback Assumptions

1. **CDN Outage Fallback**: In the event of a public CDN outage (`unpkg.com` or `cdnjs`), the application gracefully displays an error status badge ("Model Failed to Load. Check internet/CDN connection.") and disables AI switches to prevent broken execution.
2. **Offline Testing Capability**: Local static files can be served via Python or Node HTTP server for offline testing without external dependencies when pre-cached.
3. **Infrastructure Security**: Static asset hosting relies on HTTPS standard encryption to prevent middleman script injection.
