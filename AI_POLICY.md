# ISO/IEC 42001 AI Policy

**Document Reference:** AIMS-POL-5.2  
**System Identifier:** `AIS-2e3a94ae`  
**System Name:** `ai-hand-detection`  
**Organization / Unit:** Noida Business Unit  
**ISO/IEC 42001 Clause Alignment:** Clause 5.1 (Leadership & Commitment) & Clause 5.2 (AI Policy)  

---

## Policy Ownership & Approval
- **Policy Owner**: Mohit Sharma (System & Compliance Owner)
- **Approved by**: Mohit Sharma (Lead Engineer & Top Management Representative, Noida Business Unit)
- **Approval date**: 2026-09-15
- **Review cycle**: Annual, next review due 2027-09-15

---

## Top Management Policy Statement
Top management of the Noida Business Unit, led by **Mohit Sharma (Top Management Representative & System Owner)**, is formally committed to operating browser-based artificial intelligence applications responsibly, securely, transparently, and ethically in compliance with **ISO/IEC 42001:2023**.

---

## Measurable Commitments
1. **Reliability**: Hand-detection confidence threshold enforced at inference time; pointer-control disengages automatically below the threshold (see [RISK_ASSESSMENT.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/RISK_ASSESSMENT.md) stop conditions).
2. **Transparency**: [README.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/README.md) and in-app notice disclose that detection is client-side, browser-dependent, and may misfire in poor lighting/occlusion.
3. **Privacy**: No camera frames or landmark coordinates are transmitted off-device or persisted; console logging of raw landmarks is prohibited (enforced in [video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/video.js) / [mouse/video.js](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/mouse/video.js)).
4. **Human Control**: AI toggle and explicit camera Start/Stop remain available at all times; no autonomous action beyond the visual overlay/pointer demo.
5. **Continual Improvement**: Policy and controls reviewed at least annually or on any `ml5.js`/model version change.

---

## Communication
This policy is linked from [README.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/README.md) and reviewed with any contributor before their first merged change (see [AWARENESS_COMMUNICATION.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/AWARENESS_COMMUNICATION.md)).

---

**Approved by:**  
*Mohit Sharma, Lead Engineer & Top Management Representative (Noida Business Unit)*  
*Approval Date: 2026-09-15*
