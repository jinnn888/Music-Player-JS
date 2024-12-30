const playPauseBtn = document.querySelector('#play-pause-btn');
const songCover = document.querySelector('#song-cover');
const songArtist = document.querySelector('#song-artist');
const songTitle = document.querySelector('#song-title');
const audio = document.querySelector('#audio');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progressBar = document.querySelector('#progressBar');
const songLists = document.querySelector('#song-lists');

const songs = [
	{
		title: 'Super Natural',
		image: './assets/images/new-album.png',
		artist: 'NewJeans',
		music: './assets/audio/nj-hurt.mp3'

	},
	{
		title: 'Bubblegum',
		image: './assets/images/new-album.png',
		artist: 'NewJeans',
		music: './assets/audio/nj-hurt.mp3'


	},
	{
		title: 'Hurt',
		image: './assets/images/hurt.jpeg',
		artist: 'NewJeans',
		music: './assets/audio/nj-hurt.mp3'
	}

];

let songIndex = 0;
loadSong(songIndex)

function loadSong(index) {
	const song = songs[index];
	songTitle.textContent = song.title;
	songArtist.textContent = song.artist;
	songCover.src = song.image;
	audio.src = song.music;

}

playPauseBtn.addEventListener('click', handlePlayEvent)
prevBtn.addEventListener('click', playPrevSong)
nextBtn.addEventListener('click', playNextSong)

function handlePlayEvent() {
	const currentImage = playPauseBtn.querySelector('img')
	if (audio.paused) {
		playSong();
	} else {
		pauseSong();
	}
}

function playSong() {
	playPauseBtn.classList.remove('fa-play');
	playPauseBtn.classList.add('fa-pause');
	audio.play(); 
}

function pauseSong() {
	playPauseBtn.classList.remove('fa-pause');
	playPauseBtn.classList.add('fa-play');
	audio.pause(); 
}

function playNextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songIndex)
}

function playPrevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songIndex)

}
function updateProgress() {
	const progress = (audio.currentTime / audio.duration) * 100;
	if (isNaN(progress)) {
		progressBar.value = 0;
	} else {
		progressBar.value = progress;
	}

	const value = progressBar.value;
	const max = progressBar.max;

  // Calculate the percentage of the range that has been covered
	const percent = (value / max) * 100;

  // Update the background of the track
	progressBar.style.background = `linear-gradient(to right, #665c54 ${percent}%, #fbf1c7 ${percent}%)`;
}



audio.addEventListener('timeupdate', updateProgress)
progressBar.addEventListener('input', () => {
	const updatedTime = (progressBar.value / 100) * audio.duration;
	audio.currentTime = updatedTime;


})


songs.forEach((song, index) => {
	songLists.innerHTML += `<p id='song-${index}' class='text-white' style='color: #ebdbb2;'>${song.title}</p>`
})

for (let i = 0; i < songs.length; i++) {
	const song = document.querySelector(`#song-${i}`)


	song.addEventListener('click', function() {
		loadSong(i)
	})
}