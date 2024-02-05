const video = document.getElementById("video");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
// Play & pause video
const toggleVideoStatus = function () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
const updatePlayIcon = function () {
  if (video.paused) {
    playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};
// Update progress & timestamp
const updateProgress = function () {};
// Set video time to progress
const setVideoProgress = function () {};
// Stop video
const stopVideo = function () {};
// Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
playButton.addEventListener("click", toggleVideoStatus);
stopButton.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
