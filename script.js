let stopwatchInterval;
let startTime;
let pausedTime = 0;
let isRunning = false;
let lapCount = 1;

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime() - pausedTime;
        stopwatchInterval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

function pauseStopwatch() {
    clearInterval(stopwatchInterval);
    pausedTime = new Date().getTime() - startTime;
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    document.getElementById('display').innerText = '00:00:00';
    isRunning = false;
    lapCount = 1;
    pausedTime = 0;
    document.getElementById('lapList').innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = getFormattedTime(new Date().getTime() - startTime);
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${lapCount}: ${lapTime}`;
        document.getElementById('lapList').appendChild(lapItem);

        
        const lapInfo = document.getElementById('lapInfo');
        lapInfo.innerText = `Lap ${lapCount}: ${lapTime}`;
        lapInfo.style.display = 'block'; 

        lapCount++;
    }
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = getFormattedTime(elapsedTime);
    document.getElementById('display').innerText = formattedTime;
}

function getFormattedTime(elapsedTime) {
    if (typeof elapsedTime !== 'number' || isNaN(elapsedTime)) {
        return '00:00:00';
    }

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    const formattedMinutes = padTime(minutes);
    const formattedSeconds = padTime(seconds);
    const formattedMilliseconds = padTime(milliseconds);

    return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}
