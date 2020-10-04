import React from 'react'

function Square(prop) {
  function handleClick() {
    if (prop.threatened) {
      prop.setNewCaptured(prop.id)
    } else if (prop.valid) {
      prop.setSelected(prop.id)
      prop.setPlayer1Turn(false)
    }
  }

  return (<div className={prop.square}>
    <div
      className={`${prop.piece} ${prop.threatened ? "threatened" : ""} ${prop.empty ? "empty" : ""} ${prop.captured ? "captured" : ""}`}
      onClick={handleClick}></div>
  </div>)
}

export default Square