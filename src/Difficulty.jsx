import React from 'react';

function Difficulty(prop) {
  return (<div className="Difficulty">
    <p>Easy mode.</p>
    <button onClick={() => prop.set(0)}>Easy</button>
    <p>Medium - Still a work in progress.</p>
    <button onClick={() => prop.set(1)} disabled={true}>Medium</button>
    <p>Hard - Still a work in progress.</p>
    <button onClick={() => prop.set(2)} disabled={true}>Hard</button>
    <p>2-player mode - Still a work in progress.</p>
    <button onClick={() => prop.set(3)} disabled={true}>Two Player</button>
  </div>)
}

export default Difficulty
