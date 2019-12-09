var StepSequencer = require('step-sequencer');
var player = require('play-sound')(opts = {})

function playerErrorHandler(err) {
	if (err) throw err;
}

const sounds = {
	bd: './Hits/Bass Drum [BD]/E808_BD[short]-01.wav',
	sd: './Hits/Snare Drum [SD]/E808_SD-02.wav',
	ch: './Hits/Closed Hi Hat [CH]/E808_CH-03.wav',
	oh: './Hits/Open Hi Hat [OH]/E808_OH-04.wav',
}

const  hipHop8 = {
	bd: [ 1, 4, 9, 11, 12 ],
	sd: [ 5, 13 ],
	ch: [ 1,2,4,5,7,8,9,10,12,13,15,16 ],
	oh: [ 6, 14]
}

function createPlayers(song, sounds, player) {
	const players = {};

	Object.keys(song).forEach(instrument => {
		players[instrument] = (step) => song[instrument].includes(step) && player.play(sounds[instrument], playerErrorHandler)
	})
	return  players;
}

const players = createPlayers(hipHop8, sounds, player);



// Instantiate a new StepSequencer object
var tempo = 120;
var division = 4;
var sequence = [...(new Array(16)).keys()].map(i => i+1); // range 1-16
var stepSequencer = new StepSequencer(tempo, division, sequence);

sequence.forEach(step => {
	stepSequencer.on(step, (step) => {
		Object.keys(players).forEach(instrument => players[instrument](step))
	})
})


// Begin playing the sequence
stepSequencer.play();	