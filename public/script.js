const socket = io();

// Role selection
const shareBtn = document.getElementById("share-btn");
const viewBtn = document.getElementById("view-btn");
const shareScreenDiv = document.getElementById("share-screen");
const viewScreenDiv = document.getElementById("view-screen");
const startShareBtn = document.getElementById("start-share");
const screenVideo = document.getElementById("screen-video");

// Show "Share Screen" section
shareBtn.addEventListener("click", () => {
    document.getElementById("role-selection").style.display = "none";
    shareScreenDiv.style.display = "block";
});

// Show "View Screen" section
viewBtn.addEventListener("click", () => {
    document.getElementById("role-selection").style.display = "none";
    viewScreenDiv.style.display = "block";
});

// Start Screen Sharing
startShareBtn.addEventListener("click", async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
        });

        const videoTrack = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(videoTrack);

        let lastFrameHash = null; // Store the hash of the last frame to detect changes
        const captureInterval = 500; // Capture every 500ms (2 frames per second)

        setInterval(async () => {
            const bitmap = await imageCapture.grabFrame();
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(bitmap, 0, 0);

            const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: 0.6 }); // Compress
            const buffer = await blob.arrayBuffer();

            // Generate a hash for the current frame
            const currentFrameHash = await crypto.subtle.digest("SHA-256", buffer);

            // Compare hash with the last frame to detect changes
            if (!lastFrameHash || !arrayBufferEqual(lastFrameHash, currentFrameHash)) {
                socket.emit("share_screen", buffer); // Send only if the frame has changed
                lastFrameHash = currentFrameHash; // Update last frame hash
            }
        }, captureInterval);
    } catch (err) {
        console.error("Error sharing screen:", err);
    }
});

// Helper function to compare ArrayBuffers
function arrayBufferEqual(buf1, buf2) {
    if (buf1.byteLength !== buf2.byteLength) return false;
    const view1 = new Uint8Array(buf1);
    const view2 = new Uint8Array(buf2);
    for (let i = 0; i < buf1.byteLength; i++) {
        if (view1[i] !== view2[i]) return false;
    }
    return true;
}


// Receive and display screen on the viewer
socket.on("view_screen", (streamData) => {
    const blob = new Blob([streamData], { type: "image/jpeg" });
    const url = URL.createObjectURL(blob);

    // Update video source for each frame
    screenVideo.src = url;

    console.emit("share_screen", buffer);
    console.log("Frame sent", buffer.byteLength);
});
