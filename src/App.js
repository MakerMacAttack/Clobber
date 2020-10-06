import React, { useState } from 'react';
import Difficulty from './Difficulty'
import Game from './Game';
import Instructions from './Instructions'
import './App.css';

function App() {
  const [ack, setAck] = useState(true); // Player acknowledges they've read the rules
  const [difficulty, setDifficulty] = useState(-1)

  return (
    <div className="App">
      {/* Okay so obviously now I know I can just use a router to make the instructions go away */}
      {ack ? <Instructions ack={setAck} /> : null} 
      {difficulty >= 0 ? null : <Difficulty set={setDifficulty} />}
      <Game difficulty={difficulty} />
    </div>
  );
}

export default App;
