# Dependency Catalog & SRI Integrity Policy

**Document Reference:** AIMS-DEP-8.4  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Dependency Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**ISO/IEC 42001 Clause Alignment:** Clause 8.4 (Supplier Governance)  

---

## 1. Inventory of External Dependencies

| Package / Library | Version | Source URL | Purpose | Audit Status |
| :--- | :--- | :--- | :--- | :--- |
| `ml5.js` | `0.12.2` | `https://unpkg.com/ml5@0.12.2/dist/ml5.min.js` | Handpose AI detection model wrapper | **Approved & Pinned** |
| `Materialize CSS` | `1.0.0` | `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css` | UI component layout styling | **Approved & Pinned** |

---

## 2. Version Locking & SRI Security Rules

1. All external dependencies must specify explicit semantic version numbers in HTML script/link tags.
2. Unpinned dependency references (e.g. `@latest`) fail CI automated audit gates.
3. Fallback options are available via interactive simulation mode (`simulateBtn`) if CDN network access fails.

---

**Approved by:**  
*Mohit Sharma, Dependency Owner & Lead Engineer*  
*Date: 15 September 2026*
