var video = document.getElementById("video");
var playButton = document.getElementById("play");
var stopButton = document.getElementById("stop");
var progress = document.getElementById("progress");
var timestamp = document.getElementById("timestamp");
// Play & pause video
var toggleVideoStatus = function () {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
};
var updatePlayIcon = function () {
    if (video.paused) {
        playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    }
    else {
        playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
};
// Update progress & timestamp
var updateProgress = function () {
    progress.value = "" + (video.currentTime / video.duration) * 100;
    // Get minutes
    var mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = "0" + String(mins);
    }
    // Get seconds
    var secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = "0" + String(secs);
    }
    timestamp.innerHTML = "".concat(mins, ":").concat(secs);
};
// Set video time to progress
var setVideoProgress = function () {
    video.currentTime = (+progress.value * video.duration) / 100;
};
// Stop video
var stopVideo = function () { };
// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", toggleVideoStatus);
stopButton.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
