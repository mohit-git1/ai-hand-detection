# ISO/IEC 42001 Change Control & Release Procedure

**Document Reference:** AIMS-CHG-6.3  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Change Control Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**ISO/IEC 42001 Clause Alignment:** Clause 6.3 (Planning of Changes)  

---

## 1. Change Management Principles & Objectives

When changes are determined to be necessary for the AI Management System (AIMS) or the `ai-hand-detection` software, they shall be carried out in a planned manner considering:

1. The purpose of the changes and their potential consequences.
2. The integrity of the AI Management System and software guardrails.
3. The availability of resources ([RESOURCES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RESOURCES.md)).
4. The allocation or reallocation of responsibilities and authorities.

---

## 2. Protected Branch Policy & Pull Request Workflow

All code and documentation modifications MUST follow strict version-control discipline:

1. **Branch Protection**: The `main` branch is protected. Direct commits to `main` are strictly prohibited.
2. **Feature Branch Naming**: All changes must be developed in feature branches (e.g. `feature/risk-mitigation`, `fix/camera-cleanup`, `policy/update-2026`).
3. **Mandatory Pull Request (PR)**: Merges to `main` require a Pull Request using the official [.github/PULL_REQUEST_TEMPLATE.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/PULL_REQUEST_TEMPLATE.md).
4. **Peer / Lead Engineer Review**: Every PR requires explicit review and approval by **Mohit Sharma** or designated compliance reviewer before merge.
5. **CI Quality Gates**: Automated continuous integration checks ([.github/workflows/ci.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/ci.yml)) must pass 100% prior to merging:
   - Static security check (`console.log` landmark exposure audit).
   - Version pinning validation (`ml5.js` pinned to `0.12.2`).
   - HTML syntax & link integrity verification.

---

## 3. Dependency & Model Version Change Governance

External libraries and AI models (e.g. `ml5.js`) represent supply-chain changes and follow an elevated change workflow:

```
[Dependency Change Proposed] ➔ [Security & SRI Review] ➔ [Offline Fallback Validation] ➔ [Staging Test] ➔ [Lead Approval] ➔ [Release Tagging]
```

1. **Evaluation**: Assess security advisories, license compatibility, and privacy impacts of proposed package version updates.
2. **Fallback Verification**: Confirm system operates gracefully if CDN is unreachable.
3. **Version Locking**: Update explicit version numbers in `index.html`, `mouse/index.html`, and [DEPENDENCIES.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/DEPENDENCIES.md).

---

## 4. Release Approval & Changelog Record

Prior to publishing any production release:
1. Complete the Pre-Release Verification Checklist in [OPERATIONAL_RUNBOOK.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/OPERATIONAL_RUNBOOK.md).
2. Update [CHANGELOG.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CHANGELOG.md) with version details, changed components, risk assessments, and approver identity.
3. Tag the release in git (`git tag -a vX.Y.Z`).

---

**Formally Approved by:**  
*Mohit Sharma, Change Control Owner & Lead Engineer*  
*Date: 15 September 2026*
