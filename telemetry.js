// telemetry.js - Privacy-preserving, client-side ISO 42001 operational telemetry module
const Telemetry = (() => {
  const STORE_KEY = "aims_telemetry_v1";
  const BASELINE_CONFIDENCE = 0.70; // set from initial calibration testing
  const DRIFT_THRESHOLD = 0.15;
  const WINDOW = 50;

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      return raw ? JSON.parse(raw) : freshState();
    } catch (e) { return freshState(); }
  }

  function freshState() {
    return {
      sessionStart: Date.now(),
      permissionDenials: 0,
      inferenceLoadFailures: 0,
      pointerLockFailures: 0,
      confidenceSamples: [],
      framesTotal: 0,
      framesNoDetection: 0,
      lastAlert: null
    };
  }

  function persist() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
    renderPanel();
  }

  function rollingAvg() {
    if (!state.confidenceSamples || !state.confidenceSamples.length) return null;
    return state.confidenceSamples.reduce((a, b) => a + b, 0) / state.confidenceSamples.length;
  }

  function checkDrift() {
    const avg = rollingAvg();
    if (avg === null) return;
    if (BASELINE_CONFIDENCE - avg > DRIFT_THRESHOLD) {
      state.lastAlert = {
        type: "confidence_drift",
        message: `Rolling avg confidence ${avg.toFixed(2)} is ${(BASELINE_CONFIDENCE - avg).toFixed(2)} below baseline`,
        time: Date.now()
      };
      showAlertBanner(state.lastAlert.message);
    }
  }

  function showAlertBanner(msg) {
    let banner = document.getElementById("telemetry-alert");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "telemetry-alert";
      banner.style.cssText = "position:fixed;top:0;left:0;right:0;background:#b00020;color:#fff;padding:8px;text-align:center;z-index:9999;font:14px sans-serif;";
      document.body.appendChild(banner);
    }
    banner.textContent = "⚠ Monitoring alert: " + msg;
    banner.style.display = "block";
  }

  function renderPanel() {
    const panel = document.getElementById("telemetry-panel");
    if (!panel) return;
    const avg = rollingAvg();
    const detectionRate = state.framesTotal ? (1 - state.framesNoDetection / state.framesTotal) * 100 : null;
    panel.innerHTML = `<strong>Diagnostics Telemetry</strong><br/>
      Permission denials: ${state.permissionDenials}<br/>
      Inference load failures: ${state.inferenceLoadFailures}<br/>
      Pointer-lock failures: ${state.pointerLockFailures}<br/>
      Avg detection confidence (rolling): ${avg !== null ? avg.toFixed(2) : "n/a"}<br/>
      Detection rate: ${detectionRate !== null ? detectionRate.toFixed(1) + "%" : "n/a"}<br/>
      ${state.lastAlert ? `<span style="color:#b00020">Last alert: ${state.lastAlert.message}</span>` : ""}`;
  }

  if (typeof document !== 'undefined') {
    document.addEventListener("DOMContentLoaded", () => renderPanel());
  }

  return {
    recordPermissionDenial() { state.permissionDenials++; persist(); },
    recordInferenceLoadFailure() { state.inferenceLoadFailures++; persist(); },
    recordPointerLockFailure() { state.pointerLockFailures++; persist(); },
    recordFrame(confidence) {
      state.framesTotal++;
      if (confidence === null || confidence === undefined) {
        state.framesNoDetection++;
      } else {
        state.confidenceSamples.push(confidence);
        if (state.confidenceSamples.length > WINDOW) state.confidenceSamples.shift();
        checkDrift();
      }
      persist();
    },
    exportJSON() {
      const dataStr = JSON.stringify(state, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `telemetry-${new Date().toISOString().slice(0,10)}.json`;
      a.click();
    },
    getState() {
      return state;
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Telemetry;
}
