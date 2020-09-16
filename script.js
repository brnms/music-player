const musicContainer = document.getElementById('music-container');
const musicLyrics = document.getElementById('music-lyrics');
const lyrics = document.getElementById('lyrics');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
let songs = ['Eluveitie - Breathe', 'summer', 'Nightwish - Pan'];

// Keep track of song
let songIndex = 2;


lyricsTxt = '';
if(songIndex == 0){
    lyricsTxt = `
    Blind and beset<br>
They lurch towards pale void<br>
A ghostly host of exiled souls<br>
They've haunted us<br>
For they cannot see<br>
And burned the ones<br>
Who set them free<br><br>

I've yearned for you<br>
I've yearned for way too long<br><br>

I'm coming home<br>
Home again<br>
I'm now born again<br>
I lunge into you<br>
And I'll breathe again<br>
I'm coming home<br><br>

Behold, I have fought my fight, I've run my race<br>
I will be gone, I will be reborn<br>
Into the dark, into the rock<br>
Bright sun of the night, I'm coming home<br><br>

Home, home again<br>
I'm now born again<br>
I lunge into you<br>
And I'll breathe again<br>
I'm coming home<br><br>

Forsaken!<br><br>

Everything that was became what is<br>
And what withers and dies is but alike the larva in its cocoon<br><br>

I'm coming home<br>
Home again<br>
I'm now born again<br>
I lunge into you<br>
And I'll breathe again<br>
I'm coming home<br>
Home again<br>
I'm now born again<br>
I lunge into you<br>
And I'll breathe again<br>
I'm coming home<br><br>

Tigerne nemeson tigerne moníon<br>
Anson carantos arevoset ver roccíā<br>
Vediíomos cixset sī ambi bitun in esíās moníobi<br>
Sucelle ater argíī trē esíās moníūs wa<br>
Ad nemesā ad antumnon
    `
}

if(songIndex == 2){
    lyricsTxt = `
    Once there was a silent canvas<br>
    Sleeping stories unimagined<br>
    Birth of what if's, hope and wonder<br>
    Winds will be named, words will shelter<br><br>
    
    Then, something wicked their way came<br>
    Showed a way to the Great Escape<br>
    Evoke the worlds, sparked the brain<br>
    An ape in awe before a door<br><br>
    
    To labyrinth<br>
    To Keystone Earth<br>
    To fallen stars<br>
    To there and back<br><br>
    
    We're the writers<br>
    Of another way to be<br>
    We're the writers<br>
    Of whatever we cry home<br><br>
    
    A moment alone<br>
    With unbeknown<br>
    Reset the world<br>
    Imagine home<br>
    A primal need<br>
    To touch the stars<br>
    Only way there<br>
    To enter<br>
    Imagine music, dance, illusion<br>
    Tales of Dust, of man in the moon<br>
    The Sea Lady, Snow, Glass, Apples<br>
    It is stories that built cathedrals<br><br>
    
    To lose yourself<br>
    To find who you are<br>
    Follow your tale, remember your name<br>
    Enter the woods<br>
    Tir na Nog<br>
    And bring back the Good<br><br>
    
    A pale blue theatre stage<br>
    A feast of beautiful tragedy, wonderful fantasy<br>
    The play is yours to write<br>
    Yours to live<br>
    Ready the night by a playwright<br><br>
    `
}

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update songs details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`; 
}

// Play song

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    showLyrics()
    audio.play()
}
// Pause song

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    musicLyrics.style.opacity = '0'
    audio.pause()
}

// Previous song
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    showLyrics()
    playSong();
}
// Previous song
function nextSong() {
    songIndex++;

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    showLyrics()
    playSong();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Show lyrics
function showLyrics() {
musicLyrics.style.opacity = '1'
   lyrics.innerHTML = lyricsTxt
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);~

// Song ends
audio.addEventListener('ended', nextSong);