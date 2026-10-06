import gameMusicUrl from './game.mp3';

// Initialize audio immediately so the browser preloads it during the loading screen
const audio = typeof window !== "undefined" ? new Audio(gameMusicUrl) : null;
let audioLoadedPromise = Promise.resolve();

if (audio) {
  audio.loop = true;
  audio.volume = 0.5;
  audio.preload = "auto";
  
  audioLoadedPromise = new Promise((resolve) => {
    if (audio.readyState >= 3) {
      resolve();
    } else {
      audio.addEventListener("canplaythrough", () => resolve(), { once: true });
      audio.addEventListener("error", () => resolve(), { once: true }); // Don't block forever on error
    }
  });
}

export function waitForAudioLoad(): Promise<void> {
  return audioLoadedPromise;
}

let isIntendedToPlay = false;

export async function startMusic(): Promise<boolean> {
  try {
    if (audio) {
      await audio.play();
    }
    isIntendedToPlay = true;
    return true;
  } catch {
    return false;
  }
}

export function stopMusic() {
  if (audio) {
    audio.pause();
  }
  isIntendedToPlay = false;
}

export function pauseMusic() {
  if (audio) {
    audio.pause();
  }
}

export function resumeMusic() {
  if (audio && isIntendedToPlay) {
    audio.play().catch(() => {});
  }
}

export function isMusicRunning() {
  return audio ? !audio.paused : false;
}

export function _cleanup() {
  stopMusic();
}
