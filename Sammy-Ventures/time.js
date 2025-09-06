function updateClock() {
  const now = new Date(); // Get current computer time
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Corrected line below
  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

// Run immediately
updateClock();

// Update every second
setInterval(updateClock, 1000);

// Songs playlist (your real filenames)
const songs = [
  "songs/Wizard-Chan-Spirit.mp3",
  "songs/Sia_-Unstoppable_CeeNaija.com.mp3",
  "songs/Kunmie-Ft-Simi-and-Mabel-Arike-(TrendyBeatz.com).mp3"
];

let currentSong = 0;
const player = document.getElementById("musicPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Load first song
player.src = songs[currentSong];

// Play/Pause button control
playPauseBtn.addEventListener("click", () => {
  if (player.paused) {
    player.play();
    playPauseBtn.textContent = "⏸ Pause";
  } else {
    player.pause();
    playPauseBtn.textContent = "▶ Play";
  }
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  player.src = songs[currentSong];
  player.play();
  playPauseBtn.textContent = "⏸ Pause";
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  player.src = songs[currentSong];
  player.play();
  playPauseBtn.textContent = "⏸ Pause";
});

// Auto move to next when song ends
player.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  player.src = songs[currentSong];
  player.play();
});