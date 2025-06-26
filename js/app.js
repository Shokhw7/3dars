const playBtn = document.querySelector("#play");
const forwardBtn = document.querySelector("#forward");
const backwardBtn = document.querySelector("#backward");
const progressContainer = document.querySelector(".progress-container");
const progressEL = document.querySelector(".progress");
const volumeChanger = document.querySelector("#volume-change"); 
const volumeEl = document.querySelector("#volume");
const audio = document.querySelector("audio");
const container = document.querySelector(".container");
const cover = document.getElementById("cover")
const musicTitle = document.getElementById("music-title")
const durationEl = document.getElementById("duration")
const currentTimeEl = document.getElementById("current-time")
const downloadEl = document.getElementById("download")

function timer(time){
    setTimeout(() => {
        pause
    }, time);
}

function speedRate(speed){
    audio.playbackRate = speed;
}
function muteSong(){

}
audio.addEventListener("loadeddata", () => {
    const duration = audio.duration;
    const minutes = String((duration -(duration % 60)) / 60);
    const seconds = String(parseInt(duration % 60));
    let time = `${+minutes < 10 ? `${minutes.padStart(2, 0)}` : minutes}:${
        +seconds < 10 ? `${seconds.padStart(2,0)}` : seconds
    }`;

    durationEl.textContent = time;
    currentTimeEl.textContent = time;
    audio.playbackRate = 1;
});
const songs = [
    "Arctic Monkeys - 505",
    "Weeknd - Blinding Lights",
    "Arctic Monkeys - i wanna be yours (speed up)",
    "Chezile - Beanie",
    "Don_Miguelo_-_Y_Que_Fue_(musmore.org)",
    "Kali Uchis - Telepatía",
    "Kendrick Lamar - HUMBLE",
    "Mac Demarco - Chamber of Reflection",
    "Kali Uchis - Moonlight",
    "Kendrick Lamar - meet the grahams",
    "Kendrick Lamar - Not Like Us",
    "Suki Waterhouse - Good Looking",
    "Grover Washington, Jr. - Just The Two Of Us (feat. Bill Withers)",
    "Malcolm Todd - Chest Pain (I Love)",
    "dark red"
]

let currentPlayingSong = 2;

function changeSong(current){
    audio.src = `./audios/${songs[current]}.mp3`;
    downloadEl.href = `./audios/${songs[current]}.mp3`;
    cover.src = `../images/${songs[current]}.png`;
    musicTitle.textContent = songs[current];
}
changeSong(currentPlayingSong);

audio.volume = volumeChanger.value / 100;
volumeEl.textContent = volumeChanger.value;

function play() {
    audio.play();
    container.classList.add("play");
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function nextSong(){
    if(currentPlayingSong < songs.length - 1){
        currentPlayingSong++;
    }else{
        currentPlayingSong = 0
    }
    changeSong(currentPlayingSong);
    play()
}

function prevSong(){
    if(currentPlayingSong > 0){
        currentPlayingSong--;
    }else{
        currentPlayingSong = songs.length - 1
    }
    changeSong(currentPlayingSong);
    play()
}

function pause() {
    audio.pause();
    container.classList.remove("play");
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

function musicPlay() {
    const isPlaying = container.classList.contains("play");
    if (isPlaying) pause();
    else play();
}

function progress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;

    const minutes = String(Math.floor(currentTime / 60)).padStart(2, '0');
    const seconds = String(Math.floor(currentTime % 60)).padStart(2, '0');
    
    const p = (currentTime / duration) * 100;
    progressEL.style.width = `${p}%`;
    
    currentTimeEl.textContent = `${minutes}:${seconds}`;
    
    if (!isNaN(duration)) {
        const durMinutes = String(Math.floor(duration / 60)).padStart(2, '0');
        const durSeconds = String(Math.floor(duration % 60)).padStart(2, '0');
        durationEl.textContent = `${durMinutes}:${durSeconds}`;
    }
}

function changeTime(e) {
    const p = (e.offsetX / this.clientWidth) * 100;
    const currentTime = (audio.duration / 100) * p;
    audio.currentTime = currentTime;
}

function volumechange(){
    audio.volume = +volumeChanger.value / 100;
    volumeEl.textContent = +volumeChanger.value;
}
const muteBtn = document.querySelector("#mute-btn");

muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted
        ? '<i class="fa-solid fa-volume-high"></i> Unmute'
        : '<i class="fa-solid fa-volume-xmark"></i> Mute';
});


playBtn.addEventListener("click", musicPlay);
audio.addEventListener("timeupdate", progress);
progressContainer.addEventListener("click", changeTime);
volumeChanger.addEventListener("input", () => {
    audio.volume = volumeChanger.value / 100;
    volumeEl.textContent = volumeChanger.value;
});
audio.addEventListener("ended", nextSong);
backwardBtn.addEventListener("click", prevSong);
forwardBtn.addEventListener("click", nextSong)


const loopBtn = document.getElementById("loop-btn");
const shuffleBtn = document.getElementById("shuffle-btn");
const back10Btn = document.getElementById("back-10");
const forward10Btn = document.getElementById("forward-10");

let isLooping = false;
let isShuffle = false;

// 🔁 Loop tugmasi
loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopBtn.style.background = isLooping ? "green" : "";
});

// 🔀 Shuffle tugmasi
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.style.background = isShuffle ? "green" : "";
});

// ⏩ / ⏪ 10 soniyaga o‘zgartirish
forward10Btn.addEventListener("click", () => {
    audio.currentTime += 10;
});
back10Btn.addEventListener("click", () => {
    audio.currentTime -= 10;
});

function nextSong() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentPlayingSong);
        currentPlayingSong = randomIndex;
    } else {
        currentPlayingSong = (currentPlayingSong + 1) % songs.length;
    }
    changeSong(currentPlayingSong);
    play();
}
