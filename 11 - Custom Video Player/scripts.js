const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const playBtn = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function playPause() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}

	if (playBtn.textContent === '►') {
		playBtn.textContent = '❚ ❚';
	} else {
		playBtn.textContent = '►';
	}
}

function skip() {
	let skipAmount = this.dataset.skip;
	video.currentTime += parseFloat(skipAmount);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
}

// Hook up the event listeners
playBtn.addEventListener('click', playPause);
video.addEventListener('click', playPause);
video.addEventListener('timeupdate', handleProgress);

for (let skipBtn of skipButtons) {
	skipBtn.addEventListener('click', skip);
}

for (let range of ranges) {
	range.addEventListener('change', handleRangeUpdate);
}

for (let range of ranges) {
  range.addEventListener('mousemove', handleRangeUpdate);
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); //if mousedown is true, run the function
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
