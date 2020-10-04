import React, { useState, useEffect } from 'react'
import Square from './Square'

function Game(prop) {
  const [won, setWon] = useState(false)
  const [move, setMove] = useState(['', ''])
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  const [columns, setColumns] = useState(6)
  const [rows, setRows] = useState(5)
  // const [board, setBoard] = useState(createBoard())
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [captured, setCaptured] = useState([])
  const [empty, setEmpty] = useState([])
  const [moving, setMoving] = useState('')
  const [newCaptured, setNewCaptured] = useState('')
  const [threatened, setThreatened] = useState([])
  const [selected, setSelected] = useState('')

  let row = []
  for (let i = 0; i < rows; i++) {
    row.push(i)
  }
  const column = []
  for (let i = 0; i < columns; i++) {
    column.push(i)
  }

  function checkOpp(position) {
    
  }

  useEffect(() => {
    setThreatened([])
    if (newCaptured) {
      if (captured.includes(newCaptured)) { // ask someone to help fix this with rest operator
        const idx = captured.findIndex(newCaptured)
        const newList = [...captured.slice(0, idx), ...captured.slice(idx + 1, captured.length)]
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
      const threatenedArray = [up, down, left, right]
      threatenedArray.filter(checkOpp)
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
                  setMoving={setMoving}
                  setNewCaptured={setNewCaptured}
                  empty={empty.includes(id)}
                  captured={captured.includes(id)}
                  selected={id === selected}
                  // valid={} Y'know what we will worry about this later.
                  setSelected={setSelected}
                  threatened={threatened.includes(id)}
                />)
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Game
