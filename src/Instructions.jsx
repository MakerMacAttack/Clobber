import React from 'react'
import { Link } from 'react-router-dom';

function Instructions(prop) {
  
  return (
    <div>
      <p>The only winning move is not to play. No just kidding. The only legal move is to capture. You must move one of your pieces adjacent (not diagonal) onto a square occupied by an opponent's piece. This eliminates the opponents piece. You cannot move onto an empty square or one occupied by another of your own pieces.</p>
      <p>You win if your opponent's turn starts and they have no valid moves. You lose if your turn starts and you have no valid moves.</p>
      <Link to="/game">I understand</Link>
    </div>
  )
}

export default Instructions
