// Settings panel
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const musicToggle = document.getElementById('music-toggle');
const soundToggle = document.getElementById('sound-toggle');
const bgMusic = document.getElementById('bg-music');
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');
const musicVolume = document.getElementById('music-volume');
const soundVolume = document.getElementById('sound-volume');
const musicVolumeValue = document.getElementById('music-volume-value');
const soundVolumeValue = document.getElementById('sound-volume-value');

// Initialize settings from localStorage
let musicEnabled = localStorage.getItem('musicEnabled') === 'true';
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false'; // Default true
let musicVolumeLevel = parseInt(localStorage.getItem('musicVolume')) || 50; // Default 50%
let soundVolumeLevel = parseInt(localStorage.getItem('soundVolume')) || 50; // Default 50%

// Apply saved settings
musicToggle.checked = musicEnabled;
soundToggle.checked = soundEnabled;
musicVolume.value = musicVolumeLevel;
soundVolume.value = soundVolumeLevel;
musicVolumeValue.textContent = musicVolumeLevel + '%';
soundVolumeValue.textContent = soundVolumeLevel + '%';

// Apply volume settings
bgMusic.volume = musicVolumeLevel / 100;
hoverSound.volume = soundVolumeLevel / 100;
clickSound.volume = soundVolumeLevel / 100;

// If music was enabled, try to play it
if (musicEnabled) {
    bgMusic.play().catch(e => {
        console.log("Autoplay prevented:", e);
        musicToggle.checked = false;
        musicEnabled = false;
        localStorage.setItem('musicEnabled', 'false');
    });
}

// Toggle settings panel
settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.toggle('active');
    playSound(clickSound);
});

// Close settings panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && e.target !== settingsToggle) {
        settingsPanel.classList.remove('active');
    }
});

// Music toggle
musicToggle.addEventListener('change', () => {
    musicEnabled = musicToggle.checked;
    localStorage.setItem('musicEnabled', musicEnabled);

    if (musicEnabled) {
        bgMusic.play().catch(e => {
            console.log("Autoplay prevented:", e);
            musicToggle.checked = false;
            musicEnabled = false;
            localStorage.setItem('musicEnabled', 'false');
        });
    } else {
        bgMusic.pause();
    }

    playSound(clickSound);
});

// Sound effects toggle
soundToggle.addEventListener('change', () => {
    soundEnabled = soundToggle.checked;
    localStorage.setItem('soundEnabled', soundEnabled);

    if (soundEnabled) {
        playSound(clickSound);
    }
});

// Music volume control
musicVolume.addEventListener('input', () => {
    musicVolumeLevel = parseInt(musicVolume.value);
    musicVolumeValue.textContent = musicVolumeLevel + '%';
    bgMusic.volume = musicVolumeLevel / 100;
    localStorage.setItem('musicVolume', musicVolumeLevel);
});

// Sound effects volume control
soundVolume.addEventListener('input', () => {
    soundVolumeLevel = parseInt(soundVolume.value);
    soundVolumeValue.textContent = soundVolumeLevel + '%';
    hoverSound.volume = soundVolumeLevel / 100;
    clickSound.volume = soundVolumeLevel / 100;
    localStorage.setItem('soundVolume', soundVolumeLevel);

    // Play a sample sound when adjusting volume
    if (soundEnabled) {
        playSound(clickSound);
    }
});

// Function to play sound effects
function playSound(sound) {
    if (soundEnabled && sound) {
        // Reset the audio to the beginning
        sound.currentTime = 0;
        sound.play().catch(e => console.log("Sound play prevented:", e));
    }
}

// Add hover sound effects to buttons and interactive elements
const interactiveElements = document.querySelectorAll('button, .quiz-option, .species-card, .food-web-item, .conservation-project, .settings-btn, .switch, .child-button');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        playSound(hoverSound);
    });

    element.addEventListener('click', () => {
        playSound(clickSound);
    });
});
