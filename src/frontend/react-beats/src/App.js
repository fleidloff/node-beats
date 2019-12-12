import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [song, setSong] = useState({ bd: [] });

  useEffect(() => {
    async function run() {
      const updatedSong = await postData("/events", { action: "getSong" });
      setSong(updatedSong);
    }

    run();
  }, []);

  async function toggleStep(step) {
    let updateSong = song;
    if (updateSong.bd.includes(step)) {
      updateSong = { ...song, bd: song.bd.filter(item => item !== step) };
    } else {
      updateSong = { ...song, bd: [...song.bd, step] };
    }

    const updatedSong = await postData("/events", {
      action: "setInstrument",
      payload: { instrument: "bd", steps: updateSong.bd }
    });
    setSong(updatedSong);
  }

  function togglePlay() {
    postData("/events", { action: "togglePlay" });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={togglePlay}>play/ stop</button>
        {[...new Array(16).keys()].map(step => (
          <Step
            key={step}
            which={step + 1}
            active={song.bd.includes(step + 1)}
            onClick={() => toggleStep(step + 1)}
          />
        ))}
      </header>
    </div>
  );
}

function Step({ which, active = false, onClick }) {
  return (
    <div onClick={onClick} className={`Step${active && "--active"}`}>
      {active ? which : " -- "}
    </div>
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
