// Toggle Dark Mode
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-toggle i");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    
    // swap the icon
    if (document.body.classList.contains("dark-mode")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
})

// Displaying the playlist
const playlistBtn = document.querySelector(".fa-bars").parentElement;
const playlist = document.getElementById("list");

playlistBtn.addEventListener("click", () => {
    playlist.classList.toggle("active");
});

// Closing the playlist
const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => {
    if (playlist.classList.contains("active")) {
        playlist.classList.remove("active");
        playlist.classList.add("closing");

        // remove closing class after animation finishes
        setTimeout(() => {
            playlist.classList.remove("closing");
        }, 300); 
    }
})

// Choosing a Song
const cover_photo = document.getElementById("cover-photo");
const audio = document.querySelector("audio");
const song_title = document.getElementById("song-title");
const song_artist = document.getElementById("artist");
let currentSongIndex = 0
const songs = [
    {
        title: "Burdah",
        artist: "Mesut Kurtis",
        src: "music/Burdah.mp3",
        cover: "images/burdah.jfif"
    },
    {
        title: "The Tune of Hope",
        artist: "Abdou Salam",
        src: "music/The tune of hope.m4a",
        cover: "images/hope.jfif"
    },
    {
        title: "Kamin",
        artist: "Emin ft. JONY",
        src: "music/KAMIN.mp3",
        cover: "images/kamin.jfif"
    }
]

const loadSong = (index) => {
    const song = songs[index];
    cover_photo.src = song.cover;
    audio.src = song.src;
    song_title.innerText = song.title;
    song_artist.innerText = song.artist;
}
loadSong(currentSongIndex);

// Update the Playlist
const musicList = document.getElementById("playlist-songs")
songs.forEach((song, index) => {
    const list = document.createElement('li');
    list.className = "list-song"
    list.textContent = song.title + " - " + song.artist;
    musicList.appendChild(list)

    list.addEventListener("click", () => {
        loadSong(index);
        audio.play()
        document.querySelectorAll(".list-song").forEach(item=> {
            item.classList.remove("bold");
        });
            
        list.classList.add("bold");
    })
})


// Progress Bar
const progressBar = document.getElementById("progress");
const songDuration = document.getElementById("duration")
const current_time = document.getElementById("current-time");
audio.onloadedmetadata = function() {
    progressBar.max = audio.duration; 
    progressBar.value = 0;
}
audio.ontimeupdate = function() {
    progressBar.value = song.currentTime; 
    current_time.innerText = formatTime(song.currentTime);
    songDuration.innerText = formatTime(song.duration);
}
const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60); // how many full minutes
    const secs = Math.floor(seconds % 60); // remaining seconds
    return `${mins}:${secs < 10 ? "0" + secs : secs}`; // combine as "2:05"
}
        

// Playing a song
const playBtn = document.querySelector(".play-pause-btns");
const playBtnIcon = document.querySelector(".play-pause-btns i");
let isPlaying = false;

const togglePlay = () => {
    if (isPlaying) {
        audio.pause();
        playBtnIcon.classList.remove("fa-pause");
        playBtnIcon.classList.add("fa-play");
        isPlaying = false;
    } else {
        isPlaying = true;
        audio.play()
        console.log("playing successfully"); // does this show?
        playBtnIcon.classList.remove("fa-play");
        playBtnIcon.classList.add("fa-pause");
        // Seeking
        progressBar.addEventListener("input", () => {
            audio.play();
            audio.currentTime = progressBar.value;
            playBtnIcon.classList.remove("fa-play");
            playBtnIcon.classList.add("fa-pause");
        })
    }
}
playBtn.addEventListener("click", togglePlay);
    

// Next and Previous Buttons
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");

function forwardBtn () {
    currentSongIndex += 1;
    if (currentSongIndex >= songs.length) {
        console.log("forward worked")
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play();
    }
}
forward.addEventListener("click", forwardBtn)

const backwardBtn = () => {
    currentSongIndex -= 1;
    if (currentSongIndex < 0) {
        console.log("backward worked")
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audio.play()
    }
}
backward.addEventListener("click", backwardBtn)

// Shuffle Button
let isShuffle = false;
const shuffleBtn = document.querySelector(".shuffle");
shuffleBtn.addEventListener("click", () => {
    console.log("shuffle clicked")
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active");
})

// Repeat Button
let isRepeat = false;
const repeatBtn = document.querySelector(".repeat")
repeatBtn.addEventListener("click", () => {
    console.log("repeat clicked");
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle("active");
})


audio.addEventListener("ended", () => {

    progressBar.value = 0;
    current_time.innerText = "0:00"; // set timer to default
    playBtnIcon.classList.remove("fa-pause");
    playBtnIcon.classList.add("fa-play"); 

    if (isShuffle) {
        console.log("shuffle activated");
        currentSongIndex = Math.floor(Math.random() * songs.length);
        loadSong(currentSongIndex);
        audio.play();
        playBtnIcon.classList.remove("fa-play");
        playBtnIcon.classList.add("fa-pause");
    } // shuffle playlist

    if (isRepeat) {
        console.log("repeat activated");
        audio.currentTime = 0;
        audio.play();
        playBtnIcon.classList.remove("fa-play");
        playBtnIcon.classList.add("fa-pause");
    } else {
        forwardBtn
    } // repeat song
})

// Volume Button
const volumeBtn = document.getElementById("volume");
const volumeBar = document.querySelector(".volume-bar");

volumeBtn.addEventListener("click", () => {
    if (volumeBar.style.display === "block") {
        volumeBar.style.display = "none";
    } else {
        volumeBar.style.display = "block";
    }
})
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
})


