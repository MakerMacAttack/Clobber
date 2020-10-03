import React, { useState, useEffect } from 'react'
import Square from './Square'
import Board from './Board'

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

  const displays = ["Square Images/White Red.png", "Square Images/White None.png", "Square Images/White Blue.png", "Square Images/Black Red.png", "Square Images/Black None.png", "Square Images/Black Blue.png"]
  // const difficulties = ["easy", "medium", "hard", "2player"]

  return <Board />
}

export default Game
