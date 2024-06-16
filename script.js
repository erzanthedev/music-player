const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

function toggleMusic(event) {
  if (event.target.classList.contains("fa-play")) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function playMusic() {
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
}

function pauseMusic() {
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
}

// Event Listener
playBtn.addEventListener("click", toggleMusic);
