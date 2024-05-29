// script2.js
let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1000 / 60); // update every 1/60th of a second
    }
}

function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function reset() {
    isRunning = false;
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    display.textContent = '00:00:00';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    display.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
