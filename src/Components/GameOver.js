import React from 'react'
import { useDispatch } from 'react-redux'
import './GameOver.scss'

const GameOver = () => {
  const dispatch = useDispatch()
  return(
    <div id="over">
      <h1>Game Over</h1>
      <button
        onClick={ () => {
          dispatch({
            type: "NEW_GAME",
            payload: null,
          })
        }}
      >New Game
      </button>
    </div>
  )
}

export default GameOver
