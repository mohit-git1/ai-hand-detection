# ISO/IEC 42001 Change Control & Release Management

**Document Reference:** AIMS-CHG-6.3  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Change Control Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 6.3 (Planning of Changes)  

---

## 1. Purpose & Scope

This document establishes the formal Change Control and Release Management process for system `AIS-2e3a94ae`. All code modifications, dependency upgrades (`ml5.js`, `Materialize`), model adjustments, browser compatibility updates, and UI changes must adhere to this workflow to preserve AI safety, privacy, and system stability.

---

## 2. Change Control Workflow

```
[Change Request / Defect] ➔ [Impact & Risk Analysis] ➔ [Development & Testing] ➔ [Review & Approval] ➔ [Staging / Deployment] ➔ [Post-Release Verification]
```

1. **Change Initiation**: Any proposed change (bug fix, privacy improvement, dependency bump) is logged as an issue or pull request.
2. **Impact & Risk Assessment**: The Change Owner (Mohit Sharma) evaluates potential impacts on ISO 42001 compliance, privacy, camera controls, pointer stability, and browser compatibility.
3. **Development & Local Testing**: Changes are implemented in a feature branch. Local testing includes:
   - JavaScript syntax compile check (`node -c`).
   - Browser developer console check for zero raw landmark logging.
   - Keyboard navigation audit (`Tab`, `Space`, `Enter`, `Esc`).
   - Camera stop verification (`track.stop()`).
4. **Peer Review & Named Approval**: Every Pull Request requires explicit review and approval by Mohit Sharma (System Owner).
5. **Release Tagging & Staging Deployment**: Approved changes are committed to `master` with descriptive Git commit messages.
6. **Rollback Plan**: If post-deployment testing fails, the release is immediately rolled back via `git revert <commit-hash>`.

---

## 3. Pull Request Checklist Template

Every pull request modifying `ai-hand-detection` must include the following completed checklist:

```markdown
### ISO 42001 Change Approval Checklist
- [ ] **Privacy Check**: Confirmed no `console.log(results)` or raw landmark logging exists.
- [ ] **Camera Check**: Confirmed `track.stop()` is invoked when camera is stopped or tab closed.
- [ ] **Accessibility Check**: Verified keyboard operation (`Tab`, `Space`, `Enter`, `Esc`).
- [ ] **Dependency Check**: Verified external scripts use exact pinned versions (`ml5@0.12.2`).
- [ ] **Testing**: Executed `node -c video.js` and verified zero console errors.
- [ ] **Approved By**: Mohit Sharma (System & Compliance Owner)
```

---

## 4. Historical Change Log Example

| Change ID | Release Date | Summary of Change | Risk Impact | Approver | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **CHG-2026-01** | 15 Sep 2026 | Implemented ISO 42001 risk mitigations, console redaction, privacy banners, and exponential pointer coordinate smoothing. | High (Privacy & Safety) | Mohit Sharma | **Approved & Deployed** |
