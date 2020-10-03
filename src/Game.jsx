import React, { useState, useEffect } from 'react'
import Square from './Square'

function Game(prop) {
  [won, setWon] = useState('false')
  [move, setMove] = useState(['', ''])
  [player1Moves, setPlayer1Moves] = useState([])
  [player2Moves, setPlayer2Moves] = useState([])
  [difficulty, setDifficulty] = useState(difficulty[prop.difficulty])
  [columns, setColumns] = useState(6)
  [rows, setRows] = useState(5)
  [board, setBoard] = useState(createBoard())
  [player1Turn, setPlayer1Turn] = useState(true)

  const displays = ["Square Images/White Red.png", "Square Images/White None.png", "Square Images/White Blue.png", "Square Images/Black Red.png", "Square Images/Black None.png", "Square Images/Black Blue.png"]
  const difficulty = ["easy", "medium", "hard", "2player"]

  return (
    <div class="board">
      {() => {for (let i = 0; i < rows; i++) {
        <div class="Row">
          {() => {
            for (let j = 0; j < columns; j++) {
              <Square src={i % 2 === j % 2 ? displays[2] : displays[3]}/>
          }}}
        </div>}
      }}
    </div>
  )
}
