const player = require("play-sound")((opts = {}));

const stepPlayer = {
  sounds: [],

  play(step, song) {
    this.sounds.forEach(({ instrument, sound  }) => {
      song[instrument] &&
        song[instrument].includes(step) &&
        player.play(sound);
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
