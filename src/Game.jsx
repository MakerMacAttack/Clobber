import React, { useState, useEffect } from 'react'
import Square from './Square'

function Game(prop) {
  // const [won, setWon] = useState('false')
  // const [move, setMove] = useState(['', ''])
  // const [player1Moves, setPlayer1Moves] = useState([])
  // const [player2Moves, setPlayer2Moves] = useState([])
  // const [difficulty, setDifficulty] = useState(difficulties[prop.difficulty])
  const [columns, setColumns] = useState(6)
  const [rows, setRows] = useState(5)
  // const [board, setBoard] = useState(createBoard())
  // const [player1Turn, setPlayer1Turn] = useState(true)

  // const difficulties = ["easy", "medium", "hard", "2player"]
  let row = []
  for (let i = 1; i <= rows; i++) {
    row.push(i)
  }
  const column = []
  for (let i = 1; i <= columns; i++) {
    column.push(i)
  }

  return (
    <div class="board">
      {row.map(r => {
        return (
          <div class="row">
            {column.map(c => <Square square={(c % 2 === r % 2) ? "white" : "black"} piece={(c % 2 === r % 2) ? "blue" : "red"} />)}
          </div>
        )
      })}
    </div>
  )
}

export default Game
