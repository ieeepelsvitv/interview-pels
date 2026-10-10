// Subtle tactical audio feedback (Web Audio API)
let audioEnabled = true;
let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      audioCtx = new AC();
    }
    if (audioCtx.state === 'suspended') void audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

// Browsers block audio until the first user interaction — unlock it once.
if (typeof window !== 'undefined') {
  const unlock = () => {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') void ctx.resume();
  };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}

export function setAudioEnabled(enabled: boolean) {
  audioEnabled = enabled;
}

export function isAudioEnabled() {
  return audioEnabled;
}

/** ✅ Correct entry: bright rising chime (C5 → E5 → G5) */
export function playSuccess() {
  if (!audioEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.0001, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.08, now + i * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.09 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.3);
    });
  } catch {
    /* audio unavailable */
  }
}

/** ❌ Incorrect entry: clear descending double-beep (mid-range = audible on any speaker) */
export function playError() {
  if (!audioEnabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;

    const beep = (start: number, freq: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square'; // harmonics-rich → cuts through small speakers
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.012);
      gain.gain.setValueAtTime(0.09, start + dur - 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + dur + 0.02);
    };

    beep(now, 440, 0.12);         // beep 1 (A4)
    beep(now + 0.16, 311.13, 0.2); // beep 2, lower (D#4) → unmistakable "wrong" tone
  } catch {
    /* audio unavailable */
  }
}