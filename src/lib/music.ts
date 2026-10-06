// Generative ambient space soundtrack via Web Audio (no asset needed, loops seamlessly).
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let started = false;
let timer: number | null = null;

const CHORDS = [
  [146.83, 220, 277.18, 329.63], // D
  [130.81, 196, 246.94, 329.63], // C maj7-ish
  [116.54, 174.61, 233.08, 293.66], // Bb
  [130.81, 196, 261.63, 311.13], // Cm-ish
];

function playChord(i: number) {
  if (!ctx || !master) return;
  const now = ctx.currentTime;
  CHORDS[i % CHORDS.length].forEach((f, n) => {
    [0, 4].forEach((detune) => {
      const o = ctx!.createOscillator();
      const g = ctx!.createGain();
      o.type = n === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      o.detune.value = detune * (n % 2 ? 1 : -1);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.05 / (n + 1), now + 3);
      g.gain.linearRampToValueAtTime(0, now + 9);
      o.connect(g).connect(master!);
      o.start(now);
      o.stop(now + 9.2);
    });
  });
  // sparkle
  const s = ctx.createOscillator();
  const sg = ctx.createGain();
  s.type = "sine";
  s.frequency.value = CHORDS[i % 4][2] * 4;
  sg.gain.setValueAtTime(0, now + 1.5);
  sg.gain.linearRampToValueAtTime(0.015, now + 1.6);
  sg.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);
  s.connect(sg).connect(master);
  s.start(now + 1.5);
  s.stop(now + 5);
}

export async function startMusic(): Promise<boolean> {
  try {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = 0.9;
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.45;
      const fb = ctx.createGain();
      fb.gain.value = 0.35;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 2200;
      master.connect(lp);
      lp.connect(ctx.destination);
      lp.connect(delay).connect(fb).connect(delay);
      delay.connect(ctx.destination);
    }
    if (ctx.state === "suspended") await ctx.resume();
    if (ctx.state !== "running") return false;
    if (!started) {
      started = true;
      let i = 0;
      playChord(i++);
      timer = window.setInterval(() => playChord(i++), 7000);
    }
    master!.gain.setTargetAtTime(0.9, ctx.currentTime, 0.4);
    return true;
  } catch {
    return false;
  }
}

export function stopMusic() {
  if (ctx && master) master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
}

export function isMusicRunning() {
  return !!ctx && ctx.state === "running" && started;
}

export function _cleanup() {
  if (timer) clearInterval(timer);
}
