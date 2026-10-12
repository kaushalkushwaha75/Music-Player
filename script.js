/* -----------------------------------------
   🔍 SEARCH FUNCTIONALITY
----------------------------------------- */
const searchBar = document.getElementById("searchBar");
const cards = document.querySelectorAll(".card");
const playerSong = document.querySelector(".playing-song");
const playerBtn = document.querySelector(".player-play");

let currentAudio = null;

// Search filter
searchBar.addEventListener("keyup", () => {
  const value = searchBar.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector(".song-title").innerText.toLowerCase();
    const artist = card.querySelector(".song-artist").innerText.toLowerCase();

    card.style.display = (title.includes(value) || artist.includes(value))
      ? "flex"
      : "none";
  });
});


/* -----------------------------------------
   🎵 LOAD SAVED SONG (Player Page Only)
----------------------------------------- */
const savedSong = JSON.parse(localStorage.getItem("currentSong"));

if (savedSong) {
  const playTitle = document.getElementById("play-title");
  const playArtist = document.getElementById("play-artist");
  const playCover = document.getElementById("play-cover");
  const playAudio = document.getElementById("play-audio");

  if (playTitle) playTitle.textContent = savedSong.title;
  if (playArtist) playArtist.textContent = savedSong.artist;
  if (playCover) playCover.src = savedSong.cover;
  if (playAudio) playAudio.src = savedSong.src;
}


/* -----------------------------------------
   ▶ PLAYER PAGE CONTROLS
----------------------------------------- */
const audioPlayer = document.getElementById("play-audio");
const toggleBtn = document.getElementById("play-toggle");

if (toggleBtn && audioPlayer) {
  toggleBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      toggleBtn.textContent = "⏸";
    } else {
      audioPlayer.pause();
      toggleBtn.textContent = "▶";
    }
  });

  audioPlayer.addEventListener("ended", () => {
    toggleBtn.textContent = "▶";
  });
}

// Back button (player.html → main)
const backBtn = document.getElementById("backBtn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "music.html";
  });
}


/* -----------------------------------------
   🎶 CARD PLAY/PAUSE CONTROLS (Main Page)
----------------------------------------- */
cards.forEach(card => {
  const btn = card.querySelector(".play-btn");
  const audio = card.querySelector(".audio");

  btn.addEventListener("click", () => {
    const title = card.querySelector(".song-title").innerText;
    const artist = card.querySelector(".song-artist").innerText;

    // Stop previously playing song
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      document.querySelectorAll(".play-btn").forEach(b => b.textContent = "▶");
    }

    // Update mini-player title
    playerSong.textContent = `${title} - ${artist}`;
    currentAudio = audio;

    // Toggle play/pause
    if (audio.paused) {
      audio.play();
      btn.textContent = "⏸";
      playerBtn.textContent = "⏸";
    } else {
      audio.pause();
      btn.textContent = "▶";
      playerBtn.textContent = "▶";
    }
  });
});


/* -----------------------------------------
   🎛 MINI PLAYER PLAY/PAUSE
----------------------------------------- */
playerBtn.addEventListener("click", () => {
  if (!currentAudio) return;

  if (currentAudio.paused) {
    currentAudio.play();
    playerBtn.textContent = "⏸";
  } else {
    currentAudio.pause();
    playerBtn.textContent = "▶";
  }
});


/* -----------------------------------------
   🔘 BOTTOM NAVIGATION BUTTONS
----------------------------------------- */

// Home → Scroll top
document.getElementById("homeBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Search → focus input
document.getElementById("searchBtn").addEventListener("click", () => {
  searchBar.focus();
});

// Library → scroll to library
document.getElementById("libraryBtn").addEventListener("click", () => {
  document.getElementById("musicLibrary").scrollIntoView({
    behavior: "smooth"
  });
});
