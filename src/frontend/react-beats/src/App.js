import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [song, setSong] = useState({ bd: [] });
  const [playing, setPlaying] = useState(false);
  const [instrument, setInstrument] = useState("bd");

  useEffect(() => {
    async function run() {
      const updatedSong = await postData("/events", { action: "getSong" });
      setSong(updatedSong);
    }

    run();
  }, []);

  async function toggleStep(step) {
    let updateSong = song;
    if (updateSong[instrument].includes(step)) {
      updateSong = { ...song, [instrument]: song[instrument].filter(item => item !== step) };
    } else {
      updateSong = { ...song, [instrument]: [...song[instrument], step] };
    }
    setSong(updateSong);

    const updatedSong = await postData("/events", {
      action: "setInstrument",
      payload: { instrument, steps: updateSong[instrument] }
    });
    setSong(updatedSong);
  }

  async function togglePlay() {
    const response = await postData("/events", { action: "togglePlay" });
    setPlaying(response.playing);
  }

  return (
    <div className="App">
      <div className="Grid-container">
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Button
          active={playing}
          onClick={() => togglePlay()}
          label={playing ? "S" : "P"}
        />
       
        {[...new Array(16).keys()].map(step => (
          <Step
            key={step}
            which={step + 1}
            active={song[instrument].includes(step + 1)}
            onClick={() => toggleStep(step + 1)}
          />
        ))}
        <Button
          active={instrument === "bd"}
          onClick={() => setInstrument("bd")}
          label="bd"
        />
        <Button
          active={instrument === "sd"}
          onClick={() => setInstrument("sd")}
          label="sd"
        />
        <Button
          active={instrument === "ch"}
          onClick={() => setInstrument("ch")}
          label="ch"
        />
        <Button
          active={instrument === "oh"}
          onClick={() => setInstrument("oh")}
          label="oh"
        />
      </div>
    </div>
  );
}

function Button({ onClick, label, active }) {
  return (
    <div onClick={onClick} className={`Button${active ? " Button--active" : ""}`}>
      {label}
    </div>
  );
}

function Placeholder() {
  return (
    <div className="Placeholder" />
  );
}

function Step({ which, active = false, onClick }) {
  return (
    <div onClick={onClick} className={`Step${active ? " Step--active" : ""}`} />
  );
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  if (response.status === 200) {
    return await response.json(); // parses JSON response into native JavaScript objects
  }
  return response;
}

export default App;
