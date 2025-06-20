
let songs = [
    { songName: "Ham ke ham", filePath: "1.mp3", coverPath: "cover1.jpg" },
    { songName: "Time of our", filePath: "2.mp3", coverPath: "cover2.jpg" },
    { songName: "Ye ratein", filePath: "3.mp3", coverPath: "cover3.jpg" },
    { songName: "Ardash", filePath: "4.mp3", coverPath: "cover4.jpg" },
    { songName: "Yeda Yung", filePath: "5.mp3", coverPath: "coverimage5.jpg" },
    { songName: "Blue Yung", filePath: "6.mp3", coverPath: "coverimage6.jpg" },
    { songName: "Janetamanna", filePath: "7.mp3", coverPath: "coverimage7.jpg" }
];

let audioElement = new Audio(songs[0].filePath);
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myProgressBar");
let songItems = document.querySelectorAll(".songItem .playBtn");
let currentSongIndex = 0;

// Play/Pause button
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-pause-circle", "fa-play-circle");
    }
});

// Update progress bar
audioElement.addEventListener("timeupdate", () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress;
});

// Seek feature
progressBar.addEventListener("input", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Play song from list
songItems.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (currentSongIndex === index && !audioElement.paused) {
            audioElement.pause();
            element.classList.replace("fa-pause-circle", "fa-play-circle");
        } else {
            audioElement.src = songs[index].filePath;
            audioElement.play();
            currentSongIndex = index;
            masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
            resetAllPlayButtons();
            element.classList.replace("fa-play-circle", "fa-pause-circle");
        }
    });
});

// Reset all play buttons
function resetAllPlayButtons() {
    songItems.forEach((element) => {
        element.classList.replace("fa-pause-circle", "fa-play-circle");
    });
}

// Next button
document.getElementById("nextBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audioElement.src = songs[currentSongIndex].filePath;
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
});

// Previous button
document.getElementById("prevBtn").addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[currentSongIndex].filePath;
    audioElement.play();
    masterPlay.classList.replace("fa-play-circle", "fa-pause-circle");
});
