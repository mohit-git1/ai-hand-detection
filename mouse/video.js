// Production diagnostics check (Opt-in safe debug logging)
window.DEBUG_LOGGING = window.DEBUG_LOGGING || false;

function safeLog(message) {
    if (window.DEBUG_LOGGING) {
        // Redact any raw coordinates, frames, or biometric vectors; log only safe status string/count
        console.log(`[Diagnostic] ${message}`);
    }
}

const video = document.getElementById("video");
const c1 = document.getElementById('c1');
const ctx1 = c1.getContext('2d');
const loadingText = document.getElementById("loadingText");
const statusRegion = document.getElementById("statusRegion");
const aiCheckbox = document.getElementById("ai");
const fpsInput = document.getElementById("fps");
const borderInput = document.getElementById("border");

var mediaStream = null;
var cameraAvailable = false;
var aiEnabled = false;
var fps = 33; // ~30 FPS default
var border = 200; // mouse border padding

// Coordinate smoothing state
var smoothedX = 0.5;
var smoothedY = 0.5;
var alpha = 0.25; // smoothing factor (0 to 1)
var handDetectedState = false;

document.addEventListener("DOMContentLoaded", function () {
    if (aiCheckbox) aiCheckbox.addEventListener("change", toggleAi);
    if (fpsInput) fpsInput.addEventListener("input", changeFps);
    if (borderInput) borderInput.addEventListener("input", changeBorder);

    const startCamBtn = document.getElementById("startCamBtn");
    const stopCamBtn = document.getElementById("stopCamBtn");
    const exitPointerBtn = document.getElementById("exitPointerBtn");

    if (startCamBtn) startCamBtn.addEventListener("click", startCamera);
    if (stopCamBtn) stopCamBtn.addEventListener("click", stopCamera);
    if (exitPointerBtn) exitPointerBtn.addEventListener("click", exitPointerMode);

    document.addEventListener("pointerlockchange", lockCheck);
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            exitPointerMode();
        }
    });
});

window.addEventListener("beforeunload", function () {
    stopCamera();
});

function startCamera() {
    if (cameraAvailable && mediaStream) {
        safeLog("Camera already active");
        return;
    }

    const constraints = {
        audio: false,
        video: { facingMode: "user" }
    };

    updateStatus("Requesting camera access...", "status-searching");

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            mediaStream = stream;
            cameraAvailable = true;
            video.srcObject = stream;
            safeLog("Camera stream started");
            updateStatus("Camera Active. Ready for pointer demo.", "status-active");
            if (aiCheckbox && modelIsLoaded) {
                aiCheckbox.disabled = false;
            }
        })
        .catch(function (err) {
            cameraAvailable = false;
            safeLog("Camera access denied or unavailable");
            if (typeof Telemetry !== 'undefined') Telemetry.recordPermissionDenial();
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                updateStatus("Camera access denied. Grant permission to use demo.", "status-stopped");
            } else {
                updateStatus("Camera unavailable or disconnected.", "status-stopped");
            }
            if (aiCheckbox) aiCheckbox.disabled = true;
        });
}

function stopCamera() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
        mediaStream = null;
    }
    cameraAvailable = false;
    video.srcObject = null;
    exitPointerMode();
    ctx1.clearRect(0, 0, c1.width, c1.height);
    updateStatus("Camera Stopped / Off", "status-stopped");
    safeLog("Camera hardware released");
}

function toggleAi() {
    let enabled = aiCheckbox ? aiCheckbox.checked : false;
    aiEnabled = enabled;

    if (enabled) {
        if (!cameraAvailable) {
            startCamera();
        }
        try {
            c1.requestPointerLock();
            updateStatus("Pointer Demo Active (Press ESC to exit)", "status-active");
        } catch (e) {
            if (typeof Telemetry !== 'undefined') Telemetry.recordPointerLockFailure();
            safeLog("Pointer lock request failed");
        }
    } else {
        exitPointerMode();
    }
}

function exitPointerMode() {
    aiEnabled = false;
    if (aiCheckbox) aiCheckbox.checked = false;
    if (document.pointerLockElement === c1) {
        document.exitPointerLock();
    }
    setFakeMouse(0, 0, false); // hide fake mouse
    updateStatus(cameraAvailable ? "Camera Active (Pointer Stopped)" : "Pointer Mode Stopped", cameraAvailable ? "status-active" : "status-stopped");
    safeLog("Exit pointer mode executed");
}

function lockCheck() {
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
        if (document.pointerLockElement !== c1 && aiEnabled) {
            if (typeof Telemetry !== 'undefined') Telemetry.recordPointerLockFailure();
            safeLog("Pointer lock lost - auto disabling pointer mode");
            exitPointerMode();
        }
    }
}

function changeFps() {
    if (fpsInput) {
        fps = 1000 / parseInt(fpsInput.value, 10);
    }
}

function changeBorder() {
    if (borderInput) {
        border = parseInt(borderInput.value, 10);
    }
}

function updateStatus(text, statusClass) {
    if (loadingText) loadingText.style.display = "none";
    if (statusRegion) {
        statusRegion.innerText = text;
        statusRegion.className = `status-badge ${statusClass}`;
    }
}

function setFakeMouse(x, y, visible = true) {
    let cMouse = document.getElementById("mouse");
    if (!cMouse) return;
    let ctxMouse = cMouse.getContext("2d");

    cMouse.width = window.innerWidth;
    cMouse.height = window.innerHeight;

    if (!visible || !aiEnabled) {
        ctxMouse.clearRect(0, 0, cMouse.width, cMouse.height);
        return;
    }

    // Apply exponential smoothing to reduce jitter
    smoothedX = smoothedX + alpha * (x - smoothedX);
    smoothedY = smoothedY + alpha * (y - smoothedY);

    let screenX = cMouse.width * smoothedX;
    screenX = cMouse.width - screenX; // mirror horizontally
    let screenY = cMouse.height * smoothedY;

    let img = new Image();
    img.src = "pointer.png";
    img.onload = function () {
        ctxMouse.clearRect(0, 0, cMouse.width, cMouse.height);
        ctxMouse.drawImage(img, screenX, screenY, img.width * 0.5, img.height * 0.5);
    };
}

// Draw boundary box for pointer area
function setBorder() {
    ctx1.beginPath();
    ctx1.strokeStyle = "yellow";
    ctx1.lineWidth = 2;
    ctx1.rect(border / 2, border / 2, c1.width - border, c1.height - border);
    ctx1.stroke();
}

window.onload = function () {
    timerCallback();
};

function timerCallback() {
    if (isReady()) {
        setResolution();
        if (cameraAvailable && video.readyState === video.HAVE_ENOUGH_DATA) {
            ctx1.drawImage(video, 0, 0, c1.width, c1.height);
            setBorder();
            if (aiEnabled) {
                lockCheck();
                ai();
            }
        }
    }
    setTimeout(timerCallback, fps);
}

function isReady() {
    if (modelIsLoaded) {
        if (aiCheckbox && cameraAvailable) {
            aiCheckbox.disabled = false;
        }
        return true;
    } else {
        return false;
    }
}

function setResolution() {
    if (video.videoWidth > 0 && video.videoHeight > 0) {
        if (window.innerWidth < video.videoWidth) {
            c1.width = window.innerWidth * 0.9;
            let factor = c1.width / video.videoWidth;
            c1.height = video.videoHeight * factor;
        } else if (window.innerHeight < video.videoHeight) {
            c1.height = window.innerHeight * 0.50;
            let factor = c1.height / video.videoHeight;
            c1.width = video.videoWidth * factor;
        } else {
            c1.width = video.videoWidth;
            c1.height = video.videoHeight;
        }
    } else {
        c1.width = 640;
        c1.height = 480;
    }
}

function ai() {
    if (!modelIsLoaded || !aiEnabled) return;

    handpose.predict(c1, results => {
        safeLog(results && results.length > 0 ? `Pointer Demo: Detected ${results.length} hand(s)` : "Pointer Demo: No hand");

        if (!results || results.length === 0) {
            if (typeof Telemetry !== 'undefined') Telemetry.recordFrame(null);
            handDetectedState = false;
            setFakeMouse(0, 0, false);
            updateStatus("Pointer Active: Searching for hand...", "status-searching");
            return;
        }

        const confidence = (results[0] && typeof results[0].handInViewConfidence === 'number') ? results[0].handInViewConfidence : 0.85;
        if (typeof Telemetry !== 'undefined') Telemetry.recordFrame(confidence);

        handDetectedState = true;
        updateStatus("Pointer Active: Hand Tracking Live", "status-active");

        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            if (!element.boundingBox) continue;

            // Draw bounding box
            ctx1.beginPath();
            ctx1.strokeStyle = "green";
            ctx1.lineWidth = 2;
            ctx1.rect(
                element.boundingBox.topLeft[0],
                element.boundingBox.topLeft[1],
                element.boundingBox.bottomRight[0] - element.boundingBox.topLeft[0],
                element.boundingBox.bottomRight[1] - element.boundingBox.topLeft[1]
            );
            ctx1.stroke();

            // Draw finger lines
            const annotations = ["thumb", "indexFinger", "middleFinger", "ringFinger", "pinky"];
            ctx1.strokeStyle = "red";
            ctx1.lineWidth = 2;

            annotations.forEach(fingerKey => {
                const finger = element.annotations[fingerKey];
                if (finger && finger.length > 0) {
                    ctx1.beginPath();
                    ctx1.moveTo(finger[0][0], finger[0][1]);
                    for (let i = 1; i < finger.length; i++) {
                        ctx1.lineTo(finger[i][0], finger[i][1]);
                    }
                    ctx1.stroke();
                }
            });

            // Calculate mouse pointer location based on middle finger base point
            const middleFinger = element.annotations.middleFinger;
            if (middleFinger && middleFinger.length > 0) {
                let normX = (middleFinger[0][0] - border / 2) / (c1.width - border);
                let normY = (middleFinger[0][1] - border / 2) / (c1.height - border);

                // Clamp values within bounds [0, 1]
                normX = Math.max(0, Math.min(1, normX));
                normY = Math.max(0, Math.min(1, normY));

                if (aiEnabled) {
                    setFakeMouse(normX, normY, true);
                }
            }

            // Palm base
            const palmBase = element.annotations.palmBase;
            if (palmBase) {
                for (let i = 0; i < palmBase.length; i++) {
                    ctx1.beginPath();
                    ctx1.strokeStyle = "blue";
                    ctx1.arc(palmBase[i][0], palmBase[i][1], 8, 0, 2 * Math.PI);
                    ctx1.stroke();
                }
            }

            // Landmarks
            const landmarks = element.landmarks;
            if (landmarks) {
                for (let i = 0; i < landmarks.length; i++) {
                    ctx1.beginPath();
                    ctx1.fillStyle = "#0056b3";
                    ctx1.arc(landmarks[i][0], landmarks[i][1], 3, 0, 2 * Math.PI);
                    ctx1.fill();
                }
            }
        }
    });
}