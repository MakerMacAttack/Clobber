import React from 'react'

function Square(prop) {
  return (<div class={prop.square}>
    <div class={prop.piece}></div>
  </div>)
}

export default Square