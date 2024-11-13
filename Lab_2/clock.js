function updateClock() {
    const now = new Date();

    const days = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth()+1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateString = `${days}.${month}.${year}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const actualDate = `${dateString}, ${timeString}`;

    document.getElementById("clock").textContent = actualDate;
}

setInterval(updateClock, 1000);
updateClock();