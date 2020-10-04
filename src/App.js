import React, { useState, useEffect } from 'react';
import Difficulty from './Difficulty'
import Game from './Game';
import Instructions from './Instructions'
import './App.css';

function App() {
  const [ack, setAck] = useState(true);
  const [difficulty, setDifficulty] = useState(-1)

  return (
    <div className="App">
      {ack ? <Instructions ack={setAck} /> : null}
      {difficulty >= 0 ? null : <Difficulty set={setDifficulty} />}
      <Game difficulty={difficulty} />
    </div>
  );
}

export default App;
