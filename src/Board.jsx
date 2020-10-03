import React from 'react'
import Square from './Square'

function Board() {
  const row = [0, 1, 2, 3, 4]
  const column = [0, 1, 2, 3, 4, 5]
  return (
    <div class="board">
      {row.map(r => {
        return (
          <div class="row">
            {column.map(c => <Square src={(c % 2 === r % 2) ? "/whiteblue.png" : "/SquareImages/Black-Red.png"} />)}
          </div>
        )
      })}
    </div>
  )
}

export default Board