import React, { useState, useEffect } from 'react';
import Game from './Game';
import Instructions from './Instructions'
import './App.css';

function App() {
  const [ack, setAck] = useState(true);

  return (
    <div className="App">
      {ack ? <Instructions ack={setAck} /> : null}
      <Game difficulty={0} />
    </div>
  );
}

export default App;
