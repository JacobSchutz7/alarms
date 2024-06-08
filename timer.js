document.addEventListener('DOMContentLoaded', function() {
    const timers = [
        { seconds: 120, isRunning: false },
        { seconds: 300, isRunning: false },
        { seconds: 600, isRunning: false }
    ];
    
    function updateDisplay(displayId, seconds) {
        const display = document.getElementById(displayId);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        display.textContent = 
            `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
    
    function stopTimer(index) {
        if (!timers[index].isRunning) return;
        timers[index].isRunning = false;
        clearInterval(timers[index].timerId);
    }
    
    function resetTimer(index) {
        stopTimer(index);
        timers[index].seconds = timers[index].originalSeconds; // Reset to original value
        updateDisplay(`timer-display${index + 1}`, timers[index].seconds); // Update display
    }

    function startTimer(index) {
        if (timers[index].isRunning) return;
        timers[index].isRunning = true;
        timers[index].originalSeconds = timers[index].seconds; // Store original value
        timers[index].timerId = setInterval(() => {
            if (timers[index].seconds > 0) {
                timers[index].seconds--;
                updateDisplay(`timer-display${index + 1}`, timers[index].seconds);
            } else {
                stopTimer(index);
                playAudio();
            }
        }, 1000);
    }
    
    function playAudio() {
        const audio = new Audio('mixkit-retro-game-emergency-alarm-1000.wav');
        audio.addEventListener('loadedmetadata', () => {
            if (audio.duration > 7) {
                audio.currentTime = 0;
                setTimeout(() => {
                    audio.pause();
                }, 7000); 
            } else {
                console.log('Audio file is too short.');
            }
        });
    }
    
    for (let i = 0; i < timers.length; i++) {
        (function(index) {
            document.getElementById(`start-button${index + 1}`).addEventListener('click', () => startTimer(index));
            document.getElementById(`stop-button${index + 1}`).addEventListener('click', () => stopTimer(index));
            document.getElementById(`reset-button${index + 1}`).addEventListener('click', () => resetTimer(index));
    
            updateDisplay(`timer-display${index + 1}`, timers[index].seconds);
        })(i);
    }
});