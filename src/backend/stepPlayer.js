const player = require("play-sound")((opts = {}));

const stepPlayer = {
  sounds: [],

  play(step, song) {
    this.getSounds().forEach(({ instrument, sound  }) => {
      song[instrument] &&
        song[instrument].includes(step) &&
        player.play(sound);
    });
  },

  getSounds() { return  this.sounds },

  setSounds(sounds) {
    this.sounds = Object.keys(sounds).map(instrument => ({
      instrument,
      sound: sounds[instrument]
    }));
  }
};

module.exports = stepPlayer;
