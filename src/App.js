import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import Difficulty from './Difficulty'
import Game from './Game';
import Instructions from './Instructions'
import './App.css';

function App() {
  // const [ack, setAck] = useState(true); // Player acknowledges they've read the rules
  const [difficulty, setDifficulty] = useState(-1)

  return (
    <div className="App">
      <Route exact path="/">
        <Instructions />
      </Route>
      <Route path="/game">
        {difficulty >= 0 ? null : <Difficulty set={setDifficulty} />}
        <Game difficulty={difficulty} />
      </Route>
    </div>
  );
}

export default App;
