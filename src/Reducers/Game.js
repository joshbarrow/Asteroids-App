import { newX, newY } from '../Utils/coordinates'
import {
  detectShipCollisions,
  detectMissileCollisions,
  detectMissileCollisionsWithUFOs,
  detectShipCollisionsWithUFO,
  detectUFOMissileCollisionsWithShip
} from '../Utils/detectCollisions'
import { getNewUFOState } from '../Utils/UFOCoordinates'
import { ASTEROID_SIZE_INDEX } from '../Config'

let MISSILE_COUNTER = 0
let UFO_MISSILE_COUNTER = 0
let ASTEROID_COUNTER = 0
const SHIP_SIZE = 30
const MISSILE_SIZE = 5
let UFO_COUNTER = 0

const asteroidsByLevel = {
  level1: [
    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [32,66],
      rotation: 10,
    },
  ],
  level2: [
    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [12,55],
      rotation: 10,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [212,55],
      rotation: 30,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [110,44],
      rotation: 30,
    },
  ],
  level3: [
    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },
  ],
  level4: [
    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },
  ],
  level5: [
    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0,0],
      rotation: 95,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0, window.innerHeight / 2],
      rotation: 50,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [0, window.innerHeight - ASTEROID_SIZE_INDEX.large],
      rotation: 50,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [window.innerWidth / 2, window.innerHeight - ASTEROID_SIZE_INDEX.large],
      rotation: 50,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [window.innerWidth - ASTEROID_SIZE_INDEX.large, window.innerHeight - ASTEROID_SIZE_INDEX.large],
      rotation: 11,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [window.innerWidth - ASTEROID_SIZE_INDEX.large, window.innerHeight / 2],
      rotation: 12,
    },

    {
      id: ASTEROID_COUNTER++,
      size: "large",
      coordinates: [window.innerWidth - ASTEROID_SIZE_INDEX.large, 0],
      rotation: 122,
    },
  ],
}

const ufosByLevel = {
  level1: [
  ],
  level2: [
    {
      id: UFO_COUNTER++,
      coordinates: [0,0],
      rotation: 180,
      active: false,
      startTime: 10000,
    },
  ],
}

function newGame (level = 1) {
  return {
    level,
    ufos: ufosByLevel["level"+level],
    shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
    shipRotation: 0,
    numberOfLives: 2,
    time: 0,
    score: 0,
    missiles: [],
    ufoMissiles: [],
    asteroids: asteroidsByLevel["level"+level]
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
      return newGame(state.level+1) {
        ...state,
        score:
      }

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
