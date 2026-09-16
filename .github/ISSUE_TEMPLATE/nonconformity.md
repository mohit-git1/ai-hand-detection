name: AI Nonconformity / Safety Incident Report
description: Log an AI nonconformity, camera access failure, privacy defect, or safety hazard into the CAPA workflow.
title: "[NONCONFORMITY]: "
labels: ["nonconformity", "ISO-42001", "CAPA"]
assignees:
  - mohit-git1
body:
  - type: markdown
    attributes:
      value: |
        Use this issue template to report an AI nonconformity, unexpected inference behavior, privacy concern, camera stream leak, or pointer control hazard for tracking in the ISO 42001 CAPA Register ([CAPA.md](file:///home/emy88/Documents/Emerge-AI/governxone_testing/ai-hand-detection/CAPA.md)).
  - type: dropdown
    id: severity
    attributes:
      label: Severity Level
      options:
        - High (Privacy leak, unreleased hardware stream, erratic pointer safety hazard)
        - Medium (Camera access failure retry loop, status update failure, FPS lag)
        - Low (Minor UI alignment issue, disclaimer typo)
    validations:
      required: true
  - type: textarea
    id: description
    attributes:
      label: Problem Description & Expected vs Actual Behavior
      description: Describe what occurred and why it violates system safety or ISO 42001 requirements.
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      placeholder: |
        1. Open index.html
        2. Click Start Camera...
  - type: textarea
    id: root_cause
    attributes:
      label: Initial Root Cause Hypothesis (5 Whys)
      description: Optional initial root cause analysis.
