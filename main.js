const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

//Music
const songs = [
    {
        name : 'song-1',
        displayName : 'Electric Chill Music',
        artist : 'Artist1'
    },
    {
        name : 'song-2',
        displayName : 'Seven Nation Army',
        artist : 'Artist2'
    },
    {
        name : 'song-3',
        displayName : 'Goodnight, Disco Queen',
        artist : 'Artist3'
    },
    {
        name : 'song-4',
        displayName : 'Front Row',
        artist : 'Artist4'
    },
];

//Check if playing
let isPlaying = false;
//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}
//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

//Play or pause eventListener
playBtn.addEventListener('click', ()=>{
    isPlaying ? pauseSong() : playSong();
})

//Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current song
let songIndex = 0;

//Previous song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next song
function nextSong() {
    songIndex++;
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//On load - select first song
loadSong(songs[songIndex]);

//Update progress bar and time
function updateProgressBar(e) {
    if(isPlaying) {
        const {duration, currentTime} = e.srcElement;
        //update progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        
        //delay switching duration element to avoid NaN
        if(durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

//Set progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = ((clickX / width) * duration);

}

//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);