const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let seconds = 0;
let timerInterval = null;

function updateTimer() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timerDisplay.textContent = minutes > 0 ? `${minutes}min ${remainingSeconds}s` : `${remainingSeconds}s`;
}

startButton.addEventListener('click', () => {
    if(timerInterval) return;
    timerInterval = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval=null;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval=null;
    seconds = 0;
    updateTimer();
});