import React from 'react'
import { connect } from 'react-redux'
import './Game.scss'
import Ship from './Ship'

const mapDispatchToProps = dispatch => ({
  keyUp(event) {
    dispatch({ type: "KEY_UP", payload: event })
  }
})

const Game = ({
  keyUp,
}) => {
  window.addEventListener("keydown", event => {
    keyUp(event)
  })
  return(
    <div id="game">
      <Ship />
    </div>
  )
}

export default connect(null, mapDispatchToProps)(Game)
