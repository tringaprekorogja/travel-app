function daysCountdown (tripDate) {
    const now = new Date().getTime();
    const t = tripDate - now;
    const days = Math.floor(t / (1000 * 60 * 60 * 24)) + 1;
    return days;
}

export {daysCountdown}