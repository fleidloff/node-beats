const StepSequencer = require("step-sequencer");
const stepPlayer = require('./stepPlayer');

function playerErrorHandler(err) {
  if (err) throw err;
}

const sounds = {
  bd: "Hits/Bass Drum [BD]/E808_BD[short]-01.wav",
  sd: "Hits/Snare Drum [SD]/E808_SD-02.wav",
  ch: "Hits/Closed Hi Hat [CH]/E808_CH-03.wav",
  oh: "Hits/Open Hi Hat [OH]/E808_OH-04.wav"
};

const hipHop8 = {
  bd: [1, 4, 9, 11, 12],
  sd: [5, 13],
  ch: [1, 2, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16],
  oh: [6, 14]
};

stepPlayer.setSounds(sounds);

// Instantiate a new StepSequencer object
const tempo = 120;
const division = 4;
const sequence = [...new Array(16).keys()]; // range 0-15
const stepSequencer = new StepSequencer(tempo, division, sequence);

sequence.forEach(step => {
  stepSequencer.on(step, step => {
    stepPlayer.play(step + 1,hipHop8)
  });
});

// Begin playing the sequence
stepSequencer.play();

var stdin = process.openStdin();
//stdin.setRawMode( true )
//stdin.resume();
stdin.on("data", function(chunk) {
  //process.exit(0);
  stepSequencer.setTempo(parseInt(chunk));
});

// todo:
// * add more beats
// * add fills
// * add variation
// * add web interface to control everything
// * add sound selection
// * add terminal interface
// * add shuffle / swing
