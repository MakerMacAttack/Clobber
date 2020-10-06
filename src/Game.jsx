import React, { useState, useEffect } from 'react'
import Square from './Square'

function Game(prop) {
  // const [won, setWon] = useState(false)
  // const [move, setMove] = useState(['', ''])
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  // const [columns, setColumns] = useState(6)
  // const [rows, setRows] = useState(5)
  const [board, setBoard] = useState({})
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [captured, setCaptured] = useState([])
  const [empty, setEmpty] = useState([])
  // const [moving, setMoving] = useState('')
  const [newCaptured, setNewCaptured] = useState('')
  const [threatened, setThreatened] = useState([])
  const [selected, setSelected] = useState('')
  const [valid, setValid] = useState([])

  const columns = 6
  const rows = 5

  let row = []
  for (let i = 0; i < rows; i++) {
    row.push(i)
  }
  const column = []
  for (let i = 0; i < columns; i++) {
    column.push(i)
  }

  function createBoard() {
    let newBoard = {}
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        newBoard[i.toString() + j.toString()] = (j % 2 === i % 2 ? 1 : -1) // This should work and it's better
    return newBoard
  }

  function updateBoard() {
    let updatedBoard = createBoard()
    captured.map(position => updatedBoard[position] = updatedBoard[position] * -1)
    empty.map(space => updatedBoard[space] = 0)
    setBoard(updatedBoard)
  }

  function populatePlayerMoves(a, b, set) { // expects the number of the player you're checking, the number of the opposite, and the function to set the current player's moves
    updateBoard()
    let moves = []
    for (const piece in board) { // Note: Piece will be the key, not the value.
      if (board[piece] === a) {
        let possibleMoves = []
        const [r, c] = piece // Break the key into row and column
        const i = parseInt(r) //Make them numbers for math
        const j = parseInt(c)
        if (board[(i - 1).toString() + c] === b) { // If the piece below belongs to the opponent
          possibleMoves.push((i - 1).toString() + c)
        }
        if (board[(i + 1).toString() + c] === b) { // If the piece above belongs to the opponent
          possibleMoves.push((i + 1).toString() + c)
        }
        if (board[r + (j - 1).toString()] === b) { // If the piece above belongs to the opponent
          possibleMoves.push(r + (j - 1).toString())
        }
        if (board[r + (j + 1).toString()] === b) { // If the piece above belongs to the opponent
          possibleMoves.push(r + (j + 1).toString())
        }
        if (possibleMoves.length > 0) {
          moves.push([piece, possibleMoves])
        }
      }
    }
    set(moves) // this is the function we were passed to set the specific player
  }

  function easyAI() {
    //Returns a random move from the player2 move list
    const [piece, moves] = player2Moves[Math.floor(Math.random() * player2Moves.length)]
    const move = moves[Math.floor(Math.random() * moves.length)]
    return [piece, move]
  }

  function makeMove(moveArr) {
    setEmpty([...empty, moveArr[0]])
    setNewCaptured(moveArr[1])
  }

  function handleStart() { //janice this is the one that's not working
    populatePlayerMoves(1, -1, setPlayer1Moves) // I want this line to completely finish
    setValid(player1Moves.map(moves => moves[0])) // Before this line runs
  }

  useEffect(() => {
    if (player1Turn) {
      populatePlayerMoves(1, -1, setPlayer1Moves)
      setValid(player1Moves.map(moves => moves[0]))
    } else {
      populatePlayerMoves(-1, 1, setPlayer2Moves)
      makeMove(easyAI) // this part will get more complicated as we introduce more levels of AI
      // console.log("computer turn")
      setPlayer1Turn(true)
    }
  }, [player1Turn])

  useEffect(() => {
    setThreatened([])
    if (newCaptured) {
      if (captured.includes(newCaptured)) { // ask someone to help fix this with rest operator
        const newList = captured.filter(position => position !== newCaptured)
        setCaptured(newList)
      } else {
        setCaptured([...captured, newCaptured])
      }
      setNewCaptured('')
      setEmpty([...empty, selected])
      setSelected('')
    }
  }, [newCaptured])

  useEffect(() => {
    if (selected) {
      const i = parseInt(selected.charAt(0))
      const j = parseInt(selected.charAt(1))
      const up = (i + 1).toString() + j.toString()
      const down = (i - 1).toString() + j.toString()
      const left = i.toString() + (j - 1).toString()
      const right = i.toString() + (j + 1).toString()
      const possibleVictims = [up, down, left, right]
      const threatenedArray = possibleVictims.filter(position => (captured.includes(position) === captured.includes(selected)))
      setThreatened(threatenedArray)
    }
  }, [selected])

  return (
    <div className="board">
      {row.map(r => {
        return (
          <div className="row" key={r}>
            {column.map(c => {
              const id = r.toString() + c.toString()
              return (
                <Square
                  key={id}
                  id={id}
                  square={(c % 2 === r % 2) ? "white" : "black"}
                  piece={(c % 2 === r % 2) ? "blue" : "red"}
                  setEmpty={setEmpty}
                  // setMoving={setMoving}
                  setNewCaptured={setNewCaptured}
                  setPlayer1Turn={setPlayer1Turn}
                  empty={empty.includes(id)}
                  captured={captured.includes(id)}
                  selected={id === selected}
                  valid={valid.includes(id)}
                  setSelected={setSelected}
                  threatened={threatened.includes(id)}
                />)
            })}
          </div>
        )
      })}
      <button onClick={handleStart}>Start</button>
    </div>
  )
}

export default Game
