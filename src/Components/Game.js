import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import './Game.scss'
import Ship from './Ship'
import Missile from './Missile'
import Asteroid from './Asteroid'
import LivesCounter from './LivesCounter'
import GameOver from './GameOver'
import Score from './ScoreCounter'
import UFO from './UFO'

const mapStateToProps = state => ({
  asteroids: state.game.asteroids,
  missiles: state.game.missiles,
  numberOfLives: state.game.numberOfLives,
  score: state.game.score,
  time: state.game.time,
  ufos: state.game.ufos,
})

const mapDispatchToProps = dispatch => ({

})

let gameLoopInterval

const Game = ({
  asteroidEventLoop,
  asteroids,
  keyUp,
  missileEventLoop,
  missiles,
  numberOfLives,
  score,
  time,
  ufos
}) => {
  const dispatch = useDispatch()
  useEffect(() => {

    if (!gameLoopInterval) {
      window.addEventListener("keydown", event => {
        dispatch({ type: "KEY_UP", payload: event })
      })
      gameLoopInterval = setInterval(() => {
        dispatch({
          type: "UPDATE_CURRENT_TIME",
        })
      }, 50)
    }


    if (time % 100 === 0) {
      dispatch({
        type: "MISSILE_EVENT_LOOP",
        payload: null,
      })
    }

    if (time % 1000 === 0) {
      dispatch({
        type: "ASTEROID_EVENT_LOOP",
        payload: null,
      })
    }
  }, [dispatch,time])

  if (numberOfLives === 0) {
    return <GameOver />
  }

  return(
    <div id="game">
      <Score score={ score }/>
      <LivesCounter lives={ numberOfLives } />
      <Ship />
      { ufos.map((ufo, index) => ufo.active ? <UFO ufo={ ufo } key={ index } /> : null) }
      { missiles.map((missile, index) => <Missile missile={ missile } key={ index } />) }
      { asteroids.map((asteroid, index) => <Asteroid asteroid={ asteroid } key={ index } />) }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
