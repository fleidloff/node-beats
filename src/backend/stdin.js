var stdin = process.openStdin();
//stdin.setRawMode( true )
//stdin.resume();
stdin.on("data", function(chunk) {
  //process.exit(0);
  stepSequencer.setTempo(parseInt(chunk));
});
