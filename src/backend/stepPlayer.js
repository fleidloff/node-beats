const StepSequencer = require("step-sequencer");
const player = require("play-sound")((opts = {}));

const stepPlayer = {
  sounds: [],

  tempo: 120,

  steps: 16,

  setTempo(tempo) {
    this.tempo = tempo;
    this.stepSequencer && this.stepSequencer.setTempo(tempo);
  },

  playSong(song) {
    this.stop();
    const sequence = [...new Array(this.steps).keys()]; // range 0-15
    this.stepSequencer = new StepSequencer(this.tempo, this.division, sequence);

    sequence.forEach(step => {
      this.stepSequencer.on(step, step => {
        this.play(step + 1, song);
      });
    });

    // Begin playing the sequence
    this.stepSequencer.play();
    this.playing = true;
  },

  stop() {
    this.stepSequencer && this.stepSequencer.stop();
    this.playing = false;
  },

  togglePlayStop(song) {
    this.playing ? this.stop() : this.playSong(song);
  },

  play(step, song) {
    this.sounds.forEach(({ instrument, sound }) => {
      song[instrument] && song[instrument].includes(step) && player.play(sound);
    });
  },

  setSounds(sounds) {
    this.sounds = Object.keys(sounds).map(instrument => ({
      instrument,
      sound: sounds[instrument]
    }));
  }
};

module.exports = stepPlayer;
