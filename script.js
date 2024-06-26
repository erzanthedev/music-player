const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music Array/Database
const songs = [
  {
    name: "anyone-justin", // Will be used for img and audio src
    displayName: "Anyone",
    artist: "Justin Bieber",
    photoType: "jpeg",
  },

  {
    name: "commas-ayra", // Will be used for img and audio src
    displayName: "Commas",
    artist: "Ayra Starr",
    photoType: "jpeg",
  },

  {
    name: "gojehovah-stevierizo", // Will be used for img and audio src
    displayName: "Go Jehovah",
    artist: "Stevie Rizo",
    photoType: "jpeg",
  },

  {
    name: "jacinto-1", // Will be used for img and audio src
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
    photoType: "jpg",
  },

  {
    name: "jacinto-2", // Will be used for img and audio src
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
    photoType: "jpg",
  },

  {
    name: "jacinto-3", // Will be used for img and audio src
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
    photoType: "jpg",
  },

  {
    name: "lovemejeje-tems", // Will be used for img and audio src
    displayName: "Love Me JeJe",
    artist: "Tems",
    photoType: "jpeg",
  },

  {
    name: "madeforme-munilong", // Will be used for img and audio src
    displayName: "Made For Me",
    artist: "Muni Long",
    photoType: "jpeg",
  },

  {
    name: "metric-1", // Will be used for img and audio src
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
    photoType: "jpg",
  },
];

// Check if Music is playing
let isPlaying = false;

// Play Music
function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause Music
function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Event Listener
playBtn.addEventListener("click", () =>
  isPlaying ? pauseMusic() : playMusic(),
);

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.${song.photoType}`;
}

// Current Song Index
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic();
}

// Update Prgress Bar and Time
function updateProgressBar(event) {
  if (isPlaying) {
    const { currentTime, duration } = event.srcElement;
    // Update Progress Bar Width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // calculate display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}: ${currentSeconds}`;
  }
}

// Setting Progress Bar
function setProgressBar(event) {
  const barWidth = event.srcElement.clientWidth;
  const clickX = event.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / barWidth) * duration;
}

// Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
