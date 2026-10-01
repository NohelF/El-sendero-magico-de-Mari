// Web Audio API Procedural Audio Engine for El Sendero de Mari
class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgMusicGain: GainNode | null = null;
  private isPlayingMusic: boolean = false;
  private timerId: any = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.bgMusicGain) {
      this.bgMusicGain.gain.setTargetAtTime(0, this.ctx?.currentTime || 0, 0.1);
    } else if (!muted && this.bgMusicGain && this.isPlayingMusic) {
      this.bgMusicGain.gain.setTargetAtTime(0.08, this.ctx?.currentTime || 0, 0.1);
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Play gentle cozy fantasy background synth arpeggio
  public startAmbientMusic() {
    if (this.isPlayingMusic) return;
    this.initContext();
    if (!this.ctx) return;

    this.isPlayingMusic = true;
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25]; // C4, E4, G4, B4, C5, E5
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic || !this.ctx || this.isMuted) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        const freq = notes[noteIndex % notes.length];
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 2.0);

        noteIndex = (noteIndex + 1) % notes.length;
      } catch (e) {
        // ignore audio errors
      }
    };

    this.timerId = setInterval(playNextNote, 1200);
  }

  public stopAmbientMusic() {
    this.isPlayingMusic = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // Sound Effects
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  public playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [1046.50, 1318.51, 1567.98, 2093.00]; // C6, E6, G6, C7
      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.03, this.ctx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.05 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + idx * 0.05 + 0.25);
      });
    } catch (e) {}
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // Major arpeggio
      notes.forEach((f, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.06, this.ctx!.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + i * 0.08);
        osc.stop(this.ctx!.currentTime + i * 0.08 + 0.4);
      });
    } catch (e) {}
  }

  public playObstacle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }

  public playWheelTick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
