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
const audio = document.getElementsByTagName("audio");
const song_title = document.getElementById("song-title");
const song_artist = document.getElementById("artist");

const songs = [
    {
        title: "Burdah",
        artist: "Mesut Kurtis",
        src: "music/Burdah(128k).mp3",
        cover: "images/burdah.jfif"
    },
    {
        title: "The Tune of Hope",
        artist: "Abdou Salam",
        src: "music/The tune of hope.m4a",
        cover: "images/hope.jfif"
    }
]


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




