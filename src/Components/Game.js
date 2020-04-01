import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Game.scss'
import Ship from './Ship'
import Missile from './Missile'

const mapStateToProps = state => ({
  missiles: state.game.missiles,
})

const mapDispatchToProps = dispatch => ({
  keyUp(event) {
    dispatch({ type: "KEY_UP", payload: event })
  },

  updateMissilePosition() {
    dispatch({ type: "UPDATE_MISSILE_POSITION", payload: null })
  }
})

const Game = ({
  keyUp,
  missiles,
  updateMissilePosition,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", event => {
      keyUp(event)
    })
    setInterval(() => {
      updateMissilePosition("UPDATE_MISSILE_POSITION")
    }, 10)
  }, [])

  return(
    <div id="game">
      <Ship />
      { missiles.map((missile, index) => <Missile missile={ missile } key={ index } />) }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
