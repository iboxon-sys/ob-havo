/**
 * Weather Sound Engine (Web Audio API Synthesizer)
 * Generates procedural audio soundscapes for Rain, Storm, Wind, Snow, and Sunny weather.
 */

let audioCtx: AudioContext | null = null;
let currentWeatherType: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy' | 'fog' | 'mist' | null = null;
let isMuted = true;
let masterGainNode: GainNode | null = null;

// Sound Nodes
let noiseBufferNode: AudioBufferSourceNode | null = null;
let noiseFilterNode: BiquadFilterNode | null = null;
let noiseGainNode: GainNode | null = null;
let lfoNode: OscillatorNode | null = null;
let lfoGainNode: GainNode | null = null;
let thunderInterval: number | null = null;
let chimeInterval: number | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGainNode = audioCtx.createGain();
    masterGainNode.gain.value = 0.0;
    masterGainNode.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function createWhiteNoiseBuffer(ctx: AudioContext, durationSeconds = 3): AudioBuffer {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Pink noise filter approximation
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
  }
  return buffer;
}

export function initAudioEngine(): void {
  getAudioContext();
}

export function setMuted(muted: boolean): boolean {
  isMuted = muted;
  const ctx = getAudioContext();
  if (masterGainNode) {
    const targetGain = isMuted ? 0.0 : 0.28;
    masterGainNode.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.2);
  }
  if (!isMuted && currentWeatherType) {
    playWeatherSound(currentWeatherType);
  }
  return isMuted;
}

export function toggleMute(): boolean {
  return setMuted(!isMuted);
}

export function isAudioMuted(): boolean {
  return isMuted;
}

export function stopAllSounds(): void {
  const ctx = audioCtx;
  if (!ctx) return;

  if (thunderInterval !== null) {
    clearInterval(thunderInterval);
    thunderInterval = null;
  }
  if (chimeInterval !== null) {
    clearInterval(chimeInterval);
    chimeInterval = null;
  }

  if (noiseBufferNode) {
    try { noiseBufferNode.stop(); } catch {}
    noiseBufferNode.disconnect();
    noiseBufferNode = null;
  }
  if (lfoNode) {
    try { lfoNode.stop(); } catch {}
    lfoNode.disconnect();
    lfoNode = null;
  }
  if (noiseGainNode) {
    noiseGainNode.disconnect();
    noiseGainNode = null;
  }
  if (noiseFilterNode) {
    noiseFilterNode.disconnect();
    noiseFilterNode = null;
  }
}

export function playWeatherSound(type: 'sunny' | 'rain' | 'storm' | 'snow' | 'wind' | 'cloudy' | 'fog' | 'mist'): void {
  currentWeatherType = type;
  if (isMuted) return;

  const ctx = getAudioContext();
  stopAllSounds();

  if (!masterGainNode) return;

  if (type === 'rain' || type === 'storm') {
    // Rain/Storm: Pink noise with lowpass filter
    const noiseBuffer = createWhiteNoiseBuffer(ctx, 4);
    noiseBufferNode = ctx.createBufferSource();
    noiseBufferNode.buffer = noiseBuffer;
    noiseBufferNode.loop = true;

    noiseFilterNode = ctx.createBiquadFilter();
    noiseFilterNode.type = 'lowpass';
    noiseFilterNode.frequency.value = type === 'storm' ? 1200 : 850;

    noiseGainNode = ctx.createGain();
    noiseGainNode.gain.value = type === 'storm' ? 0.45 : 0.35;

    noiseBufferNode.connect(noiseFilterNode);
    noiseFilterNode.connect(noiseGainNode);
    noiseGainNode.connect(masterGainNode);
    noiseBufferNode.start();

    if (type === 'storm') {
      // Periodic Thunder Rumble
      thunderInterval = window.setInterval(() => {
        if (isMuted || !masterGainNode) return;
        triggerThunderRumble(ctx, masterGainNode);
      }, 7000);
    }
  } else if (type === 'wind') {
    // Wind: Modulated bandpass noise
    const noiseBuffer = createWhiteNoiseBuffer(ctx, 4);
    noiseBufferNode = ctx.createBufferSource();
    noiseBufferNode.buffer = noiseBuffer;
    noiseBufferNode.loop = true;

    noiseFilterNode = ctx.createBiquadFilter();
    noiseFilterNode.type = 'bandpass';
    noiseFilterNode.frequency.value = 400;
    noiseFilterNode.Q.value = 2.5;

    noiseGainNode = ctx.createGain();
    noiseGainNode.gain.value = 0.3;

    // LFO to modulate filter frequency
    lfoNode = ctx.createOscillator();
    lfoNode.type = 'sine';
    lfoNode.frequency.value = 0.18; // Slow gust modulation

    lfoGainNode = ctx.createGain();
    lfoGainNode.gain.value = 250;

    lfoNode.connect(lfoGainNode);
    lfoGainNode.connect(noiseFilterNode.frequency);

    noiseBufferNode.connect(noiseFilterNode);
    noiseFilterNode.connect(noiseGainNode);
    noiseGainNode.connect(masterGainNode);

    lfoNode.start();
    noiseBufferNode.start();
  } else if (type === 'snow' || type === 'cloudy' || type === 'fog' || type === 'mist') {
    // Soft gentle breeze & atmospheric pad
    const noiseBuffer = createWhiteNoiseBuffer(ctx, 4);
    noiseBufferNode = ctx.createBufferSource();
    noiseBufferNode.buffer = noiseBuffer;
    noiseBufferNode.loop = true;

    noiseFilterNode = ctx.createBiquadFilter();
    noiseFilterNode.type = 'lowpass';
    noiseFilterNode.frequency.value = (type === 'fog' || type === 'mist') ? 350 : 450;

    noiseGainNode = ctx.createGain();
    noiseGainNode.gain.value = (type === 'fog' || type === 'mist') ? 0.2 : 0.15;

    noiseBufferNode.connect(noiseFilterNode);
    noiseFilterNode.connect(noiseGainNode);
    noiseGainNode.connect(masterGainNode);
    noiseBufferNode.start();
  } else if (type === 'sunny') {
    // Soft warm summer ambient chime pad & natural bird chirping soundscape
    playWarmAmbientChime(ctx, masterGainNode);
    triggerBirdChirpPattern(ctx, masterGainNode);

    chimeInterval = window.setInterval(() => {
      if (isMuted || !masterGainNode) return;
      playWarmAmbientChime(ctx, masterGainNode);
      if (Math.random() > 0.2) {
        triggerBirdChirpPattern(ctx, masterGainNode);
      }
    }, 4500);
  }
}

function triggerThunderRumble(ctx: AudioContext, destination: AudioNode): void {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(65, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(25, ctx.currentTime + 2.5);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 180;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(destination);

  osc.start();
  osc.stop(ctx.currentTime + 2.9);
}

function triggerBirdChirpPattern(ctx: AudioContext, destination: AudioNode): void {
  const now = ctx.currentTime;
  const chirpCount = 2 + Math.floor(Math.random() * 3);
  const baseFreq = 2800 + Math.random() * 1200;

  for (let i = 0; i < chirpCount; i++) {
    const startTime = now + i * (0.12 + Math.random() * 0.08);
    const duration = 0.08 + Math.random() * 0.06;

    const osc = ctx.createOscillator();
    osc.type = 'sine';

    osc.frequency.setValueAtTime(baseFreq, startTime);
    osc.frequency.linearRampToValueAtTime(baseFreq + 1100 + Math.random() * 600, startTime + duration * 0.4);
    osc.frequency.linearRampToValueAtTime(baseFreq - 300, startTime + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.06 + Math.random() * 0.03, startTime + duration * 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }
}

function playWarmAmbientChime(ctx: AudioContext, destination: AudioNode): void {
  const frequencies = [329.63, 440.00, 554.37, 659.25]; // E4, A4, C#5, E5
  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const gain = ctx.createGain();
    const startTime = ctx.currentTime + idx * 0.18;
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(startTime);
    osc.stop(startTime + 3.3);
  });
}
