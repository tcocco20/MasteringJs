const video = document.getElementById("video") as HTMLVideoElement;
const playButton = document.getElementById("play") as HTMLButtonElement;
const stopButton = document.getElementById("stop") as HTMLButtonElement;
const progress = document.getElementById("progress") as HTMLInputElement;
const timestamp = document.getElementById("timestamp") as HTMLSpanElement;

// Play & pause video
const toggleVideoStatus = (): void => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayIcon = (): void => {
  if (video.paused) {
    playButton.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    playButton.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};

// Update progress & timestamp
const updateProgress = (): void => {};

// Set video time to progress
const setVideoProgress = (): void => {};

// Stop video
const stopVideo = (): void => {};

// Event listeners

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

playButton.addEventListener("click", toggleVideoStatus);

stopButton.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
