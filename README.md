# Table of Contents

- [Introduction](#introduction)

  - [Components](#components)

    - [Game](#game)
    - [Asteroid](#asteroid)
    - [Game Over](#game-over)
    - [Level Counter](#level-counter)
    - [Lives Counter](#lives-counter)
    - [Main Menu](#main-menu)
    - [Ship Missile](#ship-missile)
    - [Next Level](#next-level)
    - [Score Counter](#score-counter)
    - [Ship](#ship)
    - [UFO](#ufo)
    - [UFO Missile](#ufo-missile)

  - [Game Reducers](#game-reducers)
  - [Sagas Key Bindings](#sagas-key-bindings)
  - [Utils](#utils)

    - [Collision Detection](#collision-detection)
    - [Asteroid Collision Detection](#asteroid-collision-detection)
    - [Ship Coordinates](#ship-coordinates)
    - [Randomized UFO Coordinates](#randomized-ufo-coordinates)

  - [Config](#config)

# Introduction

Used Redux to handle state and Sagas to handle side effects. Implemented collision detection between asteroids, missiles, and ufos. Ensured collisions would result in predictable behavior that included ship destruction, score counting, life count reduction, game over, new level, etc.

## Components

### Game

```javascript
import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import './Game.scss'
import Ship from './Ship'
import Missile from './Missile'
import Asteroid from './Asteroid'
import LivesCounter from './LivesCounter'
import NextLevel from './NextLevel'
import GameOver from './GameOver'
import Score from './ScoreCounter'
import UFO from './UFO'
import UFOMissile from './UFOMissile'
import LevelCounter from './LevelCounter'
import MainMenu from './MainMenu'

const mapStateToProps = state => ({
  asteroids: state.game.asteroids,
  missiles: state.game.missiles,
  ufoMissiles: state.game.ufoMissiles,
  numberOfLives: state.game.numberOfLives,
  score: state.game.score,
  time: state.game.time,
  ufos: state.game.ufos,
  level: state.game.level,
})

let gameLoopInterval

const Game = ({
  asteroidEventLoop,
  asteroids,
  keyUp,
  level,
  missileEventLoop,
  missiles,
  numberOfLives,
  score,
  time,
  ufos,
  ufoMissiles,
  mainMenu
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

    if (time % 500 === 0) {
      dispatch ({
        type: "UFO_EVENT_LOOP",
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

  if (asteroids.length === 0 && ufos.length === 0) {
    return <NextLevel />
  }

  return(
    <div id="game">
      <Score score={ score }/>
      <LivesCounter lives={ numberOfLives } />
      <LevelCounter level={ level } />
      <Ship />
      { ufos.map((ufo, index) => ufo.active ? <UFO ufo={ ufo } key={ index } /> : null) }
      { missiles.map((missile, index) => <Missile missile={ missile } key={ index } />) }
      { asteroids.map((asteroid, index) => <Asteroid asteroid={ asteroid } key={ index } />) }
      { ufoMissiles.map((ufoMissile, index) => <UFOMissile ufoMissile={ ufoMissile} key={ index } />) }
    </div>
  )
}

export default connect(mapStateToProps, null)(Game)
```

### Asteroid

```javascript
import React from 'react'
import "./Asteroid.scss"
import { ASTEROID_SIZE_INDEX } from '../Config'

const Asteroid = ({
  asteroid,

}) => {
  return(
    <div
      className={`asteroid ${asteroid.size}`}
      style={{
        width: ASTEROID_SIZE_INDEX[asteroid.size],
        height: ASTEROID_SIZE_INDEX[asteroid.size],
        left: asteroid.coordinates[0],
        top: asteroid.coordinates[1],
        transform:`rotate(${asteroid.rotation}deg)`
      }}
    ></div>

  )
}

export default Asteroid
```

### Game Over

```javascript
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
```

### Level Counter

```javascript
import React from 'react'
import './LevelCounter.scss'

const LevelCounter = ({
  level
}) => {
  return(
    <div className="levelCounter">Level: { level }</div>
  )
}

export default LevelCounter
```

### Lives Counter

```javascript
import React from 'react'
import "./LivesCounter.scss"
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  numberOfLives: state.game.numberOfLives
})

export const LivesCounter = ({
  numberOfLives,
}) => {
  return(
    <div id="lives">Lives: { numberOfLives }</div>
  )
}

export default connect(mapStateToProps, null)(LivesCounter)
```

### Main Menu

```javascript
import React from 'react'

const MainMenu = () => {
  return(
    <div>
      <div>Main Menu</div>
      <button>New Game</button>
    </div>
  )
}

export default MainMenu
```

### Ship Missile

```javascript
import React from 'react'
import './Missile.scss'

const Missile = ({
  missile,
}) => {
  return(
    <div
      className="missile"
      style={{
        left: missile.coordinates[0],
        top: missile.coordinates[1],
        transform:`rotate(${missile.rotation}deg)`
      }}
    ></div>
  )
}

export default Missile
```

### Next Level

```javascript
import React from 'react'
import { useDispatch } from 'react-redux'

const NextLevel = () => {
  const dispatch = useDispatch()
  return(
    <div className="next">Next Level
      <button
        onClick={ () => {
          dispatch({
            type: "NEXT_LEVEL",
            payload: null,
          })
        }}
      >Next Level
      </button>
    </div>
  )
}

export default NextLevel
```

### Score Counter

```javascript
import React from 'react'
import './ScoreCounter.scss'

const Score = ({
  score
}) => {
  return(
    <div id="score">Score: { score }</div>
  )
}

export default Score
```

### Ship

```javascript
import React from 'react'
import  './Ship.scss'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  shipCoordinates: state.game.shipCoordinates,
  shipRotation: state.game.shipRotation,
})

const mapDispatchToProps = null

const Ship = ({
  shipCoordinates,
  shipRotation,
}) => {
  const [ x, y ] = shipCoordinates
  return(
    <div
      style={{
        left: x,
        top: y,
        transform:`rotate(${shipRotation}deg)`
      }}
      id="ship">
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Ship)
```

### UFO

```javascript
import React from 'react'
import './UFO.scss'

const UFO = ({
  ufo
}) => {
  return(
    <div
      style= {{
        left: ufo.coordinates[0],
        top: ufo.coordinates[1],

      }}
      className="ufo">ufo</div>
  )
}
export default UFO
```

### UFO Missile

```javascript
import React from 'react'
import './UFO.scss'

const UFO = ({
  ufo
}) => {
  return(
    <div
      style= {{
        left: ufo.coordinates[0],
        top: ufo.coordinates[1],

      }}
      className="ufo">ufo</div>
  )
}
export default UFO
```

## Game Reducers

```javascript
import { newX, newY } from '../Utils/coordinates'
import {
  detectShipCollisions,
  detectMissileCollisions,
  detectMissileCollisionsWithUFOs,
  detectShipCollisionsWithUFO,
  detectUFOMissileCollisionsWithShip
} from '../Utils/detectCollisions'
import { getNewUFOState } from '../Utils/UFOCoordinates'
import { ASTEROID_SIZE_INDEX, asteroidsByLevel, ufosByLevel } from '../Config'

let MISSILE_COUNTER = 0
let UFO_MISSILE_COUNTER = 0
const SHIP_SIZE = 30
const MISSILE_SIZE = 5

function newGame (level = 1, score = 0, numberOfLives = 2) {
  return {
    level,
    ufos: ufosByLevel(level),
    shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
    shipRotation: 0,
    numberOfLives,
    time: 0,
    score,
    missiles: [],
    ufoMissiles: [],
    asteroids: asteroidsByLevel(level)
  }
}

const initialState = newGame()

export default (state = initialState, action) => {
  let missileCollisions,
    shipCollisions,
    ufoCollisions,
    shipUFOCollisions,
    ufoMissileCollisionsWithShip

  switch (action.type) {
    case "ARROW_UP":
      shipCollisions = detectShipCollisions(state.shipCoordinates, state.asteroids)
      ufoMissileCollisionsWithShip =  detectUFOMissileCollisionsWithShip(state.ufoMissiles, state.shipCoordinates)
      shipUFOCollisions = detectShipCollisionsWithUFO(state.shipCoordinates, state.ufos)
      if (shipCollisions.shipDidCollide || shipUFOCollisions.shipDidCollide || ufoMissileCollisionsWithShip.shipDidCollide) {
        return {
          ...state,
          shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
          asteroids: [
            ...state.asteroids.filter(asteroid => !shipCollisions.asteroid.includes(asteroid.id)),
            ...shipCollisions.newAsteroids,
          ],
          ufoMissiles: [
            ...state.ufoMissiles.filter((ufoMissile) => !ufoMissileCollisionsWithShip.missile.includes(ufoMissile.id))
          ],
          numberOfLives: Math.max(
            shipCollisions.shipDidCollide || shipUFOCollisions.shipDidCollide ?
              state.numberOfLives-1 :
              state.numberOfLives, 0),
          ufos: [
            ...state.ufos.filter((ufo) => !shipUFOCollisions.ufo.includes((ufo.id)))
          ]
        }
      } else {
        return {
          ...state,
          shipCoordinates: [
            newX(state.shipCoordinates[0], state.shipRotation, SHIP_SIZE),
            newY(state.shipCoordinates[1], state.shipRotation, SHIP_SIZE),
          ],
        }
      }

    case "ARROW_RIGHT":
      return {
        ...state,
        shipRotation: (state.shipRotation+30 === 360) ? 0 : state.shipRotation+30,
      }

    case "ARROW_LEFT":
      return {
        ...state,
        shipRotation: (state.shipRotation-30 === -30) ? 330 : state.shipRotation-30,
      }

    case "SPACE_BAR":
      return {
        ...state,
        missiles: [
          ...state.missiles,
          {
            id: MISSILE_COUNTER++,
            coordinates: [
              ...state.shipCoordinates,
            ],
            rotation: state.shipRotation
          }
        ]
      }

      case "MISSILE_EVENT_LOOP":
        ufoCollisions = detectMissileCollisionsWithUFOs(state.missiles, state.ufos)
        missileCollisions = detectMissileCollisions(state.missiles, state.asteroids)
        return {
          ...state,
          missiles: (
            state.missiles
              .filter((missile) => !missileCollisions.missile.includes(missile.id) )
              .filter((missile) => !ufoCollisions.missile.includes(missile.id) )
              .map((missile) => {
                return {
                  ...missile,
                  coordinates: [
                    newX(missile.coordinates[0], missile.rotation, MISSILE_SIZE),
                    newY(missile.coordinates[1], missile.rotation, MISSILE_SIZE),
                  ],
                }
              })
          ),
          asteroids: [
            ...state.asteroids.filter((asteroid) => !missileCollisions.asteroid.includes(asteroid.id)),
            ...missileCollisions.newAsteroids,
          ],

          ufos: [
            ...state.ufos.filter((ufo) => !ufoCollisions.ufo.includes(ufo.id))
          ],
          score: state.score + missileCollisions.points + ufoCollisions.points,
        }

      case "ASTEROID_EVENT_LOOP":
        missileCollisions = detectMissileCollisions(state.missiles, state.asteroids)
        shipCollisions = detectShipCollisions(state.shipCoordinates, state.asteroids)
        return {
          ...state,
          shipCoordinates: shipCollisions.shipDidCollide
            ? [window.innerWidth/2, window.innerHeight/2]
            : state.shipCoordinates,
          asteroids: (
            [
              ...state.asteroids
                .filter((asteroid) => !missileCollisions.asteroid.includes(asteroid.id))
                .filter((asteroid) => !shipCollisions.asteroid.includes(asteroid.id))
                .map((asteroid) => {
                  return {
                    ...asteroid,
                    coordinates: [
                      newX(asteroid.coordinates[0], asteroid.rotation, ASTEROID_SIZE_INDEX[asteroid.size]),
                      newY(asteroid.coordinates[1], asteroid.rotation, ASTEROID_SIZE_INDEX[asteroid.size]),
                    ],
                  }
                }),
              ...missileCollisions.newAsteroids,
              ...shipCollisions.newAsteroids,
            ]
          ),
          missiles: state.missiles.filter((missile) => !missileCollisions.missile.includes(missile.id)),
          numberOfLives: Math.max(shipCollisions.shipDidCollide ? state.numberOfLives-1 : state.numberOfLives, 0),
          score: missileCollisions.missileDidCollide ? state.score+10 : state.score,
        }

    case "NEW_GAME":
      return newGame(state.level)

    case "NEXT_LEVEL":
      return newGame(state.level+1, state.score, state.numberOfLives)

    case "UPDATE_CURRENT_TIME":
      return {
        ...state,
        time: state.time + 50,
        ufos: state.ufos.map((ufo) => {
          return {
            ...ufo,
            active: state.time + 50 >= ufo.startTime
          }
        })
      }

    case "UFO_EVENT_LOOP":
      shipCollisions = detectShipCollisionsWithUFO(state.shipCoordinates, state.ufos)
      ufoMissileCollisionsWithShip = detectUFOMissileCollisionsWithShip(state.ufoMissiles, state.shipCoordinates)
      const newUfoMissiles = state.ufoMissiles
        .filter((ufoMissile) => !ufoMissileCollisionsWithShip.missile.includes(ufoMissile.id))
        .map((ufoMissile) => {
          return {
            ...ufoMissile,
            coordinates: [
              ufoMissile.coordinates[0],
              ufoMissile.coordinates[1] + 20
            ]
          }
        })

      const newUFOs = (
        state.ufos
          .filter((ufo) => !shipCollisions.ufo.includes(ufo.id))
          .map((ufo) => {
            if (!ufo.active) return ufo

            const moveUFO = getNewUFOState()

            if (moveUFO.fireMissile) {
              newUfoMissiles.push({
                id: UFO_MISSILE_COUNTER++,
                coordinates: ufo.coordinates,
                rotation: ufo.rotation,
              })
            }

            return {
              ...ufo,
              coordinates: [
                Math.max(ufo.coordinates[0] + moveUFO.horizontalIncrementAmount, 0),
                Math.max(ufo.coordinates[1] + moveUFO.verticalIncrementAmount, 0)
              ]
            }
          })
      )

      return {
        ...state,
        ufos: newUFOs,
        numberOfLives: Math.max(shipCollisions.shipDidCollide ? state.numberOfLives-1 : state.numberOfLives, 0),
        shipCoordinates: shipCollisions.shipDidCollide || ufoMissileCollisionsWithShip.shipDidCollide
          ? [window.innerWidth/2, window.innerHeight/2]
          : state.shipCoordinates,
        ufoMissiles: newUfoMissiles
      }

    default: return state
  }
}
```

## Sagas Key Bindings

```javascript
import { call, put, takeLatest } from 'redux-saga/effects'

function* handleKey ({ payload }) {
  const keyPressed = payload.code
  switch (keyPressed) {
    case "ArrowLeft":
      yield put({ type: "ARROW_LEFT", payload: null })
      break

    case "ArrowRight":
      yield put({ type: "ARROW_RIGHT", payload: null })
      break

    case "ArrowUp":
      yield put({ type: "ARROW_UP", payload: null })
      break

    case "Space":
      yield put ({ type: "SPACE_BAR", payload: null })
      break
  }

}

export default function* () {
  yield takeLatest("KEY_UP", handleKey)

}
```

## Utils

### Collision Detection

```javascript
import createAsteroidsFromCollision from './createAsteroidsFromCollision'
import { ASTEROID_SIZE_INDEX } from '../Config'


function detectCollisions(collectionA, collectionB, onDetect, size) {
  const itemACollisions = []
  const itemBCollisions = []

  collectionA.forEach((itemA) => {
    collectionB.forEach((itemB) => {
      size = size || ASTEROID_SIZE_INDEX[itemB.size]

      if (
        itemA.coordinates[0] >= itemB.coordinates[0] &&
        itemA.coordinates[0] <= itemB.coordinates[0]+ size &&
        itemA.coordinates[1] >= itemB.coordinates[1] &&
        itemA.coordinates[1] <= itemB.coordinates[1]+ size
      ) {
        if (typeof onDetect === "function") {
          onDetect(itemA, itemB)
        }
        itemACollisions.push(itemA.id)
        itemBCollisions.push(itemB.id)

      }
    } )
  } )
  return { collectionA: itemACollisions, collectionB: itemBCollisions }
}

function calculatePointsFromCollision(size) {
  if (size === "large") {
    return 30
  } else if (size === "medium") {
    return 20
  } else if (size === "small") {
    return 10
  }
}

export function detectMissileCollisionsWithUFOs(missiles, ufos) {
  let points = 0
  const collisions = detectCollisions(missiles, ufos, (missile, ufo) => {
    points = points + 50
  }, 50)

  return {
    ufo: collisions.collectionB,
    missile: collisions.collectionA,
    points,
  }
}

export function detectMissileCollisions(missiles, asteroids) {
  const newAsteroids = []
  let points = 0
  const collisions = detectCollisions(missiles, asteroids, (missile, asteroid) => {
    points = points+calculatePointsFromCollision(asteroid.size)
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    asteroid: collisions.collectionB,
    missile: collisions.collectionA,
    newAsteroids,
    points,
  }
}

export function detectUFOMissileCollisionsWithShip(ufoMissiles, shipCoordinates) {
  const collisions = detectCollisions([{ id: "ship", coordinates: shipCoordinates }], ufoMissiles, null, 20 )
  return {
    shipDidCollide: !!collisions.collectionB.length,
    missile: collisions.collectionA,
  }
}

export function detectShipCollisions(shipCoordinates, asteroids) {
  const newAsteroids = []
  const collisions = detectCollisions([{ id: "ship", coordinates: shipCoordinates }], asteroids, (ship, asteroid) => {
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    shipDidCollide: !!collisions.collectionA.length,
    asteroid: collisions.collectionB,
    newAsteroids,
  }
}

export function detectShipCollisionsWithUFO(shipCoordinates, ufos) {
  const collisions = detectCollisions([{ id: "ship", coordinates: shipCoordinates }], ufos, null, 50)

  return {
    shipDidCollide: !!collisions.collectionA.length,
    ufo: collisions.collectionB,
  }
}

export function haveAsteroidCoordinatesBeenTaken(newAsteroidCoordinates, asteroids) {
  const collisions = detectCollisions([{ id: "newAsteroid", coordinates: newAsteroidCoordinates }], asteroids, null, 50 )

  return !!collisions.collectionA.length
}
```

### Asteroid Collision Detection

```javascript
import createAsteroidsFromCollision from './createAsteroidsFromCollision'
import { ASTEROID_SIZE_INDEX } from '../Config'


function detectCollisions(collectionA, collectionB, onDetect, size) {
  const itemACollisions = []
  const itemBCollisions = []

  collectionA.forEach((itemA) => {
    collectionB.forEach((itemB) => {
      size = size || ASTEROID_SIZE_INDEX[itemB.size]

      if (
        itemA.coordinates[0] >= itemB.coordinates[0] &&
        itemA.coordinates[0] <= itemB.coordinates[0]+ size &&
        itemA.coordinates[1] >= itemB.coordinates[1] &&
        itemA.coordinates[1] <= itemB.coordinates[1]+ size
      ) {
        if (typeof onDetect === "function") {
          onDetect(itemA, itemB)
        }
        itemACollisions.push(itemA.id)
        itemBCollisions.push(itemB.id)

      }
    } )
  } )
  return { collectionA: itemACollisions, collectionB: itemBCollisions }
}

export function detectMissileCollisions(missiles, asteroids) {
  const newAsteroids = []
  let points = 0
  const collisions = detectCollisions(missiles, asteroids, (missile, asteroid) => {
    points = points+calculatePointsFromCollision(asteroid.size)
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    asteroid: collisions.collectionB,
    missile: collisions.collectionA,
    newAsteroids,
    points,
  }
}

export function detectShipCollisions(shipCoordinates, asteroids) {
  const newAsteroids = []
  const collisions = detectCollisions([{ id: "ship", coordinates: shipCoordinates }], asteroids, (ship, asteroid) => {
    createAsteroidsFromCollision(asteroid)
      .forEach((newAsteroid) => {
        newAsteroids.push(newAsteroid)
      })
  })
  return {
    shipDidCollide: !!collisions.collectionA.length,
    asteroid: collisions.collectionB,
    newAsteroids,
  }
}

export function haveAsteroidCoordinatesBeenTaken(newAsteroidCoordinates, asteroids) {
  const collisions = detectCollisions([{ id: "newAsteroid", coordinates: newAsteroidCoordinates }], asteroids, null, 50 )

  return !!collisions.collectionA.length
}
```

### Ship Coordinates

```javascript
const INCREMENT_AMOUNT = 30

export function newX(x, rotation) {
  const isLeftOfYAxis = rotation > 180
  const isBelowXAxis = rotation > 90 && rotation <= 270

  // since we simply want to observe this degree's rotation within it's quadrant,
  // we can modify the original degree until it is within 90\. this allows us to see
  // how close we are to completing this quadrant (i.e. 30 is to 90 as 120 is to 180)
  let modifiedRotation = rotation
  while(modifiedRotation > 90) {
    modifiedRotation = modifiedRotation - 90
  }

  let value = INCREMENT_AMOUNT * (modifiedRotation / 90)

  //  if we are below the x axis, we'll want to invert our percentage so that we are
  // decrementing, rather than incrementing (i.e. .66 becomes .33)
  if (isBelowXAxis) {
    value = INCREMENT_AMOUNT - value
  }

  if (isLeftOfYAxis) {
    // apply second inversion for left side of Y axis, basicaly undoing first one
    value = INCREMENT_AMOUNT - value

    // negate value (since all values left of Y axis are negative)
    value = value * -1
  }

  const newValue = x + value
  if (newValue <= 0) {
    return window.innerWidth-1
  } else if (newValue >= window.innerWidth) {
    return 1
  }
  return newValue
}

export function newY(y, rotation) {
  const isLeftOfYAxis = rotation > 180
  const isBelowXAxis = rotation > 90 && rotation <= 270

  // since we simply want to observe this degree's rotation within it's quadrant,
  // we can modify the original degree until it is within 90\. this allows us to see
  // how close we are to completing this quadrant (i.e. 30 is to 90 as 120 is to 180)
  let modifiedRotation = rotation
  while(modifiedRotation > 90) {
    modifiedRotation = modifiedRotation - 90
  }

  // since our value is the polar opposite of newX, we subtract our value from INCREMENT_AMOUNT
  let value = INCREMENT_AMOUNT - (INCREMENT_AMOUNT * (modifiedRotation / 90))

  //  if we are below the x axis, we'll want to invert our percentage so that we are
  // decrementing, rather than incrementing (i.e. .66 becomes .33)
  if (isBelowXAxis && !isLeftOfYAxis) {
    value = INCREMENT_AMOUNT - value
  }

  if (!isBelowXAxis && isLeftOfYAxis) {
    value = INCREMENT_AMOUNT - value
    value = value * -1
  }

  if (!isBelowXAxis && !isLeftOfYAxis) {
    value = value * -1
  }

  const newY = y + value
  if (newY <= 0) {
    return window.innerHeight-1
  } else if (newY >= window.innerHeight) {
    return 1
  }
  return newY
}
```

### Randomized UFO Coordinates

```javascript
const UFO_MOVEMENT = 20

export function randomNumberIsOne(max = 2) {
  return Math.floor(Math.random() * max) === 1
}

export function getNewUFOState() {
  const verticalDirection = randomNumberIsOne() ?
    "up" :
    "down"

  const horizontalDirection = randomNumberIsOne(6) ?
    "left" :
    "right"

  const horizontalIncrementAmount = horizontalDirection === "right" ?
    UFO_MOVEMENT :
    UFO_MOVEMENT * -1

  const verticalIncrementAmount = verticalDirection === "down" ?
    UFO_MOVEMENT :
    UFO_MOVEMENT * -1

  const fireMissile = randomNumberIsOne(6)

  return { horizontalIncrementAmount, verticalIncrementAmount, fireMissile }
}
```

## Config

```javascript
import { haveAsteroidCoordinatesBeenTaken } from './Utils/detectCollisions'

let ASTEROID_COUNTER = 0
let UFO_COUNTER = 0

export const ASTEROID_SIZE_INDEX = {
  large: 100,
  medium: 50,
  small: 25,
}

export const asteroidsByLevel = (level = 1) => {
  let counter = 0
  const asteroids = []
  while (counter < level * 5) {
    let coordinatesUsed = true
    let randomXCoordinates, randomYCoordinates
    while (coordinatesUsed) {
       randomYCoordinates = Math.floor(Math.random() * window.innerHeight + 1)
       randomXCoordinates = Math.floor(Math.random() * window.innerWidth/4 + 1)
       coordinatesUsed = haveAsteroidCoordinatesBeenTaken([randomXCoordinates, randomYCoordinates], asteroids)
    }
    const randomRotation = Math.floor(Math.random() * 360 + 1)
    counter++
    asteroids.push({
      id: ASTEROID_COUNTER++,
      coordinates: [randomXCoordinates, randomYCoordinates],
      size: "large",
      rotation: randomRotation,
    })
  }
  return asteroids
}

export const ufosByLevel = (level = 1) => {
  let counter = 0
  let ufos = []
  while (counter < level) {
    counter++
    ufos.push({
      id: UFO_COUNTER++,
      coordinates: [0,0],
      rotation: 180,
      active: false,
      startTime: 5000,
    })
  }
  return ufos
}
```
