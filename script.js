let startTime, updatedTime, difference;
let running = false, interval;
let laps = [];

const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        startStopBtn.textContent = 'Start';
        running = false;
    }
});

lapBtn.addEventListener('click', () => {
    if (running) {
        laps.push(display.textContent);
        updateLaps();
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    laps = [];
    updateLaps();
});

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let millis = Math.floor((updatedTime % 1000) / 10);
    let seconds = Math.floor((updatedTime / 1000) % 60);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(millis)}`;
}

function updateLaps() {
    lapList.innerHTML = '';
    laps.forEach((lap, index) => {
        let li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
