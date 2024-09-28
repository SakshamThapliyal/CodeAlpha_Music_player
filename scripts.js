const songs = [
    {
        title: "Blinding-Lights",
        src: "./music/Blinding-Lights.mp3"
    },
    {
        title: "Starboy",
        src: "./music/Starboy.mp3"
    }
];

let songIndex = 0; 
const audio = document.getElementById('audio'); 
const songTitle = document.getElementById('song-title'); 
const playBtn = document.getElementById('play-btn'); 
const prevBtn = document.getElementById('prev-btn'); 
const nextBtn = document.getElementById('next-btn'); 
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration'); 


function loadSong(song) {
    songTitle.textContent = song.title;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.textContent = '⏸';
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = '▶️';
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevBtn.addEventListener('click', () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
});

nextBtn.addEventListener('click', () => {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;

    progressBar.value = (currentTime / duration) * 100;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;
    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds}`;

    if (duration) {
        let durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = '0' + durationSeconds;
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds}`;
    }
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

loadSong(songs[songIndex]);
