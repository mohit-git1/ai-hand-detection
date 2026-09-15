// Production diagnostics check (Opt-in safe diagnostics)
window.ENABLE_DIAGNOSTICS = window.ENABLE_DIAGNOSTICS || false;

function safeLog(message) {
    if (window.ENABLE_DIAGNOSTICS) {
        // Redact any raw coordinates, frames, or biometric vectors
        console.log(`[AI-Hand-Detection Diagnostic] ${message}`);
    }
}

const video = document.getElementById("video");
const c1 = document.getElementById('c1');
const ctx1 = c1.getContext('2d');
const loadingText = document.getElementById("loadingText");
const statusRegion = document.getElementById("statusRegion");
const aiCheckbox = document.getElementById("ai");
const fpsInput = document.getElementById("fps");

var mediaStream = null;
var cameraAvailable = false;
var aiEnabled = false;
var fps = 33; // ~30 FPS default
var isSimulating = false;
var handDetectedState = false;

document.addEventListener("DOMContentLoaded", function () {
    if (aiCheckbox) aiCheckbox.addEventListener("change", toggleAi);
    if (fpsInput) fpsInput.addEventListener("input", changeFps);

    const startCamBtn = document.getElementById("startCamBtn");
    const stopCamBtn = document.getElementById("stopCamBtn");
    const simulateBtn = document.getElementById("simulateBtn");

    if (startCamBtn) startCamBtn.addEventListener("click", startCamera);
    if (stopCamBtn) stopCamBtn.addEventListener("click", stopCamera);
    if (simulateBtn) simulateBtn.addEventListener("click", toggleSimulate);
});

// Clean up camera resource when leaving page
window.addEventListener("beforeunload", function () {
    stopCamera();
});

function startCamera() {
    if (cameraAvailable && mediaStream) {
        safeLog("Camera already running");
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
            safeLog("Camera stream started successfully");
            updateStatus("Camera Active. System Ready.", "status-active");
            if (aiCheckbox && modelIsLoaded) {
                aiCheckbox.disabled = false;
            }
        })
        .catch(function (err) {
            cameraAvailable = false;
            safeLog("Camera permission denied or camera unavailable");
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
                updateStatus("Camera access denied. Please grant permission in browser.", "status-stopped");
            } else {
                updateStatus("Camera unavailable or disconnected.", "status-stopped");
            }
            if (aiCheckbox) aiCheckbox.disabled = true;
        });
}

function stopCamera() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
        mediaStream = null;
    }
    cameraAvailable = false;
    video.srcObject = null;
    if (aiCheckbox) {
        aiCheckbox.checked = false;
        aiCheckbox.disabled = true;
    }
    aiEnabled = false;
    isSimulating = false;
    handDetectedState = false;
    ctx1.clearRect(0, 0, c1.width, c1.height);
    updateStatus("Camera Stopped / Off", "status-stopped");
    safeLog("Camera hardware stopped cleanly");
}

function toggleAi() {
    aiEnabled = aiCheckbox ? aiCheckbox.checked : false;
    if (aiEnabled && !cameraAvailable && !isSimulating) {
        startCamera();
    }
    safeLog(`AI processing toggled: ${aiEnabled}`);
}

function changeFps() {
    if (fpsInput) {
        fps = 1000 / parseInt(fpsInput.value, 10);
    }
}

function toggleSimulate() {
    isSimulating = !isSimulating;
    if (isSimulating) {
        stopCamera();
        aiEnabled = true;
        if (aiCheckbox) {
            aiCheckbox.checked = true;
            aiCheckbox.disabled = false;
        }
        updateStatus("Simulated Hand Pattern Active (Non-Camera Mode)", "status-active");
    } else {
        aiEnabled = false;
        if (aiCheckbox) aiCheckbox.checked = false;
        ctx1.clearRect(0, 0, c1.width, c1.height);
        updateStatus("Simulation stopped", "status-stopped");
    }
}

function updateStatus(text, statusClass) {
    if (loadingText) loadingText.style.display = "none";
    if (statusRegion) {
        statusRegion.innerText = text;
        statusRegion.className = `status-badge ${statusClass}`;
    }
}

window.onload = function () {
    timerCallback();
};

function timerCallback() {
    if (isReady()) {
        setResolution();
        if (cameraAvailable && video.readyState === video.HAVE_ENOUGH_DATA) {
            ctx1.drawImage(video, 0, 0, c1.width, c1.height);
        }

        if (isSimulating) {
            drawSimulatedHand();
        } else if (aiEnabled && cameraAvailable) {
            ai();
        }
    }
    setTimeout(timerCallback, fps);
}

function isReady() {
    if (modelIsLoaded) {
        if (aiCheckbox && (cameraAvailable || isSimulating)) {
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

function drawSimulatedHand() {
    ctx1.fillStyle = "#1e1e1e";
    ctx1.fillRect(0, 0, c1.width, c1.height);

    ctx1.strokeStyle = "#00bcd4";
    ctx1.lineWidth = 2;
    ctx1.strokeRect(20, 20, c1.width - 40, c1.height - 40);

    const t = Date.now() / 500;
    const centerX = c1.width / 2 + Math.sin(t) * 80;
    const centerY = c1.height / 2 + Math.cos(t) * 40;

    // Draw simulated bounding box
    ctx1.strokeStyle = "green";
    ctx1.lineWidth = 2;
    ctx1.strokeRect(centerX - 60, centerY - 80, 120, 160);

    // Draw simulated fingers
    ctx1.strokeStyle = "red";
    ctx1.beginPath();
    ctx1.moveTo(centerX, centerY);
    ctx1.lineTo(centerX - 30, centerY - 60);
    ctx1.lineTo(centerX, centerY - 70);
    ctx1.lineTo(centerX + 30, centerY - 60);
    ctx1.stroke();

    // Draw simulated landmarks
    for (let i = -2; i <= 2; i++) {
        ctx1.beginPath();
        ctx1.arc(centerX + i * 20, centerY - 40, 4, 0, 2 * Math.PI);
        ctx1.fillStyle = "blue";
        ctx1.fill();
    }

    updateStatus("Simulated Hand Tracking (Active)", "status-active");
}

function ai() {
    if (!modelIsLoaded || !aiEnabled) return;

    handpose.predict(c1, results => {
        // Redacted raw production console logging per GovernXOne finding
        safeLog(results && results.length > 0 ? `Detected ${results.length} hand(s)` : "No hand detected");

        if (!results || results.length === 0) {
            handDetectedState = false;
            updateStatus("AI Active: Searching for hand (No hand detected)...", "status-searching");
            return;
        }

        handDetectedState = true;
        updateStatus(`AI Active: Hand Detected (${results.length})`, "status-active");

        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            if (!element.boundingBox) continue;

            // Render bounding box
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

            // Render finger annotations
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

            // Finger landmarks
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