import React, { useState, useEffect } from 'react'
import Square from './Square'

function Game(prop) {
  // const [won, setWon] = useState(false)
  // const [move, setMove] = useState(['', ''])
  const [player1Moves, setPlayer1Moves] = useState([]) // These will be arrays, in the form of 
  const [player2Moves, setPlayer2Moves] = useState([]) // ["piece which can move", ["piece it can take", "piece it can take", "piece it can take"]
  // const [columns, setColumns] = useState(6)
  // const [rows, setRows] = useState(5)
  const [board, setBoard] = useState({}) // An object holding the state of the board
  const [player1Turn, setPlayer1Turn] = useState(true) // Whose turn is it
  const [captured, setCaptured] = useState([]) // Basically a list of captured pieces, slightly more specific than that
  const [empty, setEmpty] = useState([]) // Squares which are empty. Because of the rules of the game, once a square is empty, it is empty until the end of the game.
  // const [moving, setMoving] = useState('')
  const [newCaptured, setNewCaptured] = useState('') // The just-captured piece
  const [threatened, setThreatened] = useState([]) // Alert the player what their options are
  const [selected, setSelected] = useState('') // Which piece the player chose
  const [valid, setValid] = useState([]) // All Player1 pieces with valid moves

  const columns = 6 // Down the road I might let the board be bigger
  const rows = 5

    // generate arrays for the rows and columns.
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
    for (let i = 0; i < rows; i++) // for every row
      for (let j = 0; j < columns; j++) // for ever column
        newBoard[i.toString() + j.toString()] = (j % 2 === i % 2 ? 1 : -1) // Builds two diagonal grids, 1's and -1's, to represent player 1 pieces and player 2 pieces
    return newBoard
  }

  function updateBoard() {
    let updatedBoard = createBoard() // get a fresh board
    captured.map(position => updatedBoard[position] = updatedBoard[position] * -1) // If a piece has been captured, flip it.
    empty.map(space => updatedBoard[space] = 0) // If a square is empty, its value is 0
    setBoard(updatedBoard)
  }

  function populatePlayerMoves(a, b, set) { // Checks your pieces to opponent pieces, and sets the list of moves.
    updateBoard() // Make sure board is up to date.
    let moves = []
    for (const piece in board) { // Note: Piece will be the key, not the value.
      if (board[piece] === a) { // For every one of my pieces on the board...
        let possibleMoves = []
        const [r, c] = piece // Break the key into row and column
        const i = parseInt(r) //Make them numbers for math
        const j = parseInt(c)
        if (board[(i - 1).toString() + c] === b) { // If the piece below belongs to the opponent...
          possibleMoves.push((i - 1).toString() + c) // ... then this is a valid move
        }
        if (board[(i + 1).toString() + c] === b) { // If the piece above belongs to the opponent...
          possibleMoves.push((i + 1).toString() + c)
        }
        if (board[r + (j - 1).toString()] === b) { // If the piece above belongs to the opponent...
          possibleMoves.push(r + (j - 1).toString())
        }
        if (board[r + (j + 1).toString()] === b) { // If the piece above belongs to the opponent...
          possibleMoves.push(r + (j + 1).toString())
        }
        if (possibleMoves.length > 0) { // If the piece has any valid moves...
          moves.push([piece, possibleMoves]) // ... add it to the local scope moves list.
        }
      }
    } // Local list is now complete, pass it to the state.
    set(moves) // this is the function we were passed to set the specific player
  }

  function easyAI() {
    //Returns a random move from the player2 move list
    const [piece, moves] = player2Moves[Math.floor(Math.random() * player2Moves.length)]
    const move = moves[Math.floor(Math.random() * moves.length)]
    return [piece, move]
  }

  function makeMove(moveArr) { // Expects an array with two values, the key for the attacking piece and the key for the losing piece.
    setEmpty([...empty, moveArr[0]]) // The attacker leaves its square which is now empty forever.
    setNewCaptured(moveArr[1]) // The defending square is now captured which triggers a somewhat complicated thing.
  }

  function handleStart() { //janice this is the one that's not working
    populatePlayerMoves(1, -1, setPlayer1Moves) // I want this line to completely finish
    setValid(player1Moves.map(moves => moves[0])) // Before this line runs
  }

  useEffect(() => { // top half is human player's turn, bottom half is computer player's turn.
    if (player1Turn) {
      populatePlayerMoves(1, -1, setPlayer1Moves)
      setValid(player1Moves.map(moves => moves[0])) // This emulates the function I can't get working above, and then waits for player input.
    } else {
      populatePlayerMoves(-1, 1, setPlayer2Moves)
      makeMove(easyAI) // this part will get more complicated as we introduce more levels of AI
      // console.log("computer turn")
      setPlayer1Turn(true)
    }
  }, [player1Turn])

  useEffect(() => {
    setThreatened([]) // A convenient place to reset the threatened pieces.
    if (newCaptured) {
      if (captured.includes(newCaptured)) { // This is the slightly tricky bit. If the same square goes back and forth between players...
        const newList = captured.filter(position => position !== newCaptured) // ... 
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
