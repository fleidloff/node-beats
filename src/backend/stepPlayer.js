const StepSequencer = require("step-sequencer");
const player = require("play-sound")((opts = {}));

const stepPlayer = {
  sounds: [],

  tempo: 120,

  steps: 16,

  playSong(song) {
    const sequence = [...new Array(this.steps).keys()]; // range 0-15
    const stepSequencer = new StepSequencer(this.tempo, this.division, sequence);

    sequence.forEach(step => {
      stepSequencer.on(step, step => {
        this.play(step + 1, song);
      });
    });

    // Begin playing the sequence
    stepSequencer.play();
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
