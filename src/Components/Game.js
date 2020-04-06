import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import './Game.scss'
import Ship from './Ship'
import Missile from './Missile'
import Asteroid from './Asteroid'

const mapStateToProps = state => ({
  missiles: state.game.missiles,
  asteroids: state.game.asteroids,
})

const mapDispatchToProps = dispatch => ({
  keyUp(event) {
    dispatch({ type: "KEY_UP", payload: event })
  },

  missileEventLoop() {
    dispatch({ type: "MISSILE_EVENT_LOOP", payload: null })
  },

  asteroidEventLoop() {
    dispatch({ type: "ASTEROID_EVENT_LOOP", payload: null })
  },

})

const Game = ({
  keyUp,
  missiles,
  asteroids,
  updateAsteroidPosition,
  missileEventLoop,
  asteroidEventLoop,
}) => {
  useEffect(() => {
    window.addEventListener("keydown", event => {
      keyUp(event)
    })

    setInterval(() => {
      missileEventLoop()
    }, 100)

    setInterval(() => {
      asteroidEventLoop()
    }, 1000)
  }, [])

  return(
    <div id="game">
      <Ship />
      { missiles.map((missile, index) => <Missile missile={ missile } key={ index } />) }
      { asteroids.map((asteroid, index) => <Asteroid asteroid={ asteroid } key={ index } />) }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
