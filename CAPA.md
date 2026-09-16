# ISO/IEC 42001 Corrective Action & Nonconformity (CAPA) Register & Procedure

**Document Reference:** AIMS-CAP-10.1  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Business Unit:** Noida Business Unit  
**CAPA Process Owner:** Mohit Sharma (`mohit.sharma@noida.example.com`)  
**Effective Date:** 15 September 2026  
**ISO/IEC 42001 Clause Alignment:** Clause 10.1 (Nonconformity & Corrective Action)  

---

## 1. CAPA Issue Management Workflow

When an AI-related defect, privacy concern, hand-detection failure, camera access failure, or mouse-control hazard is identified or reported, the Noida Business Unit enforces a formal 5-step Corrective and Preventive Action (CAPA) workflow:

```
[1. Issue Intake & Logging] ➔ [2. Root Cause Analysis (5 Whys)] ➔ [3. Corrective Action Plan] ➔ [4. Implementation & Verification] ➔ [5. Closure Approval & Effectiveness Check]
```

1. **Issue Intake & Logging**: Any AI defect, privacy concern, camera access retry failure, or pointer hazard is logged in the CAPA Register with a unique ID, severity level, and assigned owner (Mohit Sharma). GitHub issue templates ([.github/ISSUE_TEMPLATE/nonconformity.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/ISSUE_TEMPLATE/nonconformity.md)) are used for intake.
2. **Root Cause Analysis (5 Whys)**: The assigned owner conducts a formal root-cause investigation using the "5 Whys" methodology to identify systemic root causes rather than superficial symptoms.
3. **Corrective Action Plan**: A detailed remediation plan is developed specifying code fixes, documentation updates, assigned responsibilities, and target due dates.
4. **Implementation & Verification**: Fixes are developed and tested under change control ([CHANGE_CONTROL.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CHANGE_CONTROL.md)). Post-fix verification confirms the issue is resolved.
5. **Closure Approval & Effectiveness Check**: Mohit Sharma approves formal closure. An effectiveness evaluation is conducted after 14 days to confirm zero recurrence.

---

## 2. Nonconformity Register

| CAPA ID | Date Logged | Nonconformity Description | Severity | Root Cause (5 Whys Summary) | Corrective Action Taken | Status | Target / Closure Date |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CAPA-2026-01** | 15 Sep 2026 | Raw prediction object logging (`console.log(results)`) in `video.js:93` & `mouse/video.js:139` | High | Lack of automated static code inspection gate before release | Removed raw `console.log`, implemented safe `safeLog()` opt-in string wrapper, added CI audit check | **Closed & Verified** | 15 Sep 2026 |
| **CAPA-2026-02** | 15 Sep 2026 | Camera permission retry loop handling in `video.js:28-35` not logged to telemetry | Medium | Failure events were handled in catch block without persistent telemetry invocation | Added `Telemetry.recordPermissionDenial()` and retry tracking to telemetry module | **Closed & Verified** | 15 Sep 2026 |
| **CAPA-2026-03** | 15 Sep 2026 | Physical webcam LED remains lit after clicking Stop Camera | High | `video.srcObject = null` was set without invoking `MediaStreamTrack.stop()` | Added explicit track stop loop iterating `mediaStream.getTracks().forEach(t => t.stop())` | **Closed & Verified** | 15 Sep 2026 |

---

## 3. Worked Corrective Action Record (CAPA-2026-01)

### Problem Description
GovernXOne identified production console logging of raw handpose inference prediction objects (`console.log(results)`) at `video.js:93` and `mouse/video.js:139`, as well as erratic middle-finger pointer movement jitter and unreleased physical camera stream tracks.

### Root-Cause Analysis (5 Whys Methodology)
1. *Why were raw handpose prediction objects logged in production?* ➔ Debugging statements were left inside `handpose.predict()` callbacks during initial development.
2. *Why were debugging statements retained in production files?* ➔ The development pipeline lacked an automated pre-release code inspection check.
3. *Why was there no automated code inspection check?* ➔ Release procedures did not enforce document control or static syntax/grep check rules.
4. *Why did pointer jitter occur?* ➔ Middle-finger landmark coordinates were mapped directly to canvas coordinates without filtering or smoothing algorithms.
5. *Why was the camera stream not released on stop?* ➔ `getUserMedia` stream tracks were set to `video.srcObject` but `MediaStreamTrack.stop()` was not invoked when the user toggled the camera off.

### Corrective Action Implementation
1. **Redacted Console Exposure**: Completely removed raw `console.log(results)` calls in [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js) and [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js). Created safe `window.DEBUG_LOGGING` opt-in wrapper (count-only logging, zero landmark coordinates).
2. **Implemented Physical Stream Shutdown**: Added `stopCamera()` function iterating `mediaStream.getTracks().forEach(track => track.stop())` when user toggles camera off or unloads window.
3. **Implemented Coordinate Smoothing**: Added exponential coordinate smoothing (`alpha = 0.25`) to eliminate middle-finger pointer jitter.
4. **Automated Pre-Release Verification**: Updated operational runbook ([OPERATIONAL_RUNBOOK.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/OPERATIONAL_RUNBOOK.md)) with mandatory `grep -n "console.log"` pre-release audit rules and GitHub Actions CI workflow ([.github/workflows/ci.yml](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/.github/workflows/ci.yml)).

---

**Formally Approved by:**  
*Mohit Sharma, CAPA Owner & Lead Engineer*  
*Date: 15 September 2026*
