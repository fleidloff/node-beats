const stepPlayer = require("./stepPlayer");
const express = require("express");

function playerErrorHandler(err) {
  if (err) throw err;
}

const sounds = {
  bd: "Hits/Bass Drum [BD]/E808_BD[short]-01.wav",
  sd: "Hits/Snare Drum [SD]/E808_SD-02.wav",
  ch: "Hits/Closed Hi Hat [CH]/E808_CH-03.wav",
  oh: "Hits/Open Hi Hat [OH]/E808_OH-04.wav"
};

stepPlayer.setSounds(sounds);

const song = {
  bd: [1, 4, 9, 11, 12],
  sd: [5, 13],
  ch: [1, 2, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16],
  oh: [6, 14]
};

//stepPlayer.playSong(song);

// ======================================
const app = express();
app.use(express.json());

app.route("/togglePlay").all((req, res, next) => {
  stepPlayer.togglePlayStop(song);
  res.status(201).end();
});
app
  .route("/events")
  .get(function(req, res, next) {
    res.json({});
  })
  .post(function(req, res, next) {
    const { action, payload } = req.body;

    switch (action) {
      case "togglePlay":
        stepPlayer.togglePlayStop(song);
        res.status(201).end();
        break;
      case "getSong":
        res.json(song);
        break;
      case "setInstrument":
        song[payload.instrument] = payload.steps;
        res.status(201).end();
        break;
      default:
        res.json({});
    }
  });

const port = 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// todo:
// * add more beats
// * add fills
// * add variation
// * add web interface to control everything
// * add sound selection
// * add terminal interface
// * add shuffle / swing
