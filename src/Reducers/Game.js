import { newX, newY } from '../Utils/coordinates'
import { detectShipCollisions, detectMissileCollisions } from '../Utils/detectCollisions'
import { ASTEROID_SIZE_INDEX } from '../Config'

let MISSILE_COUNTER = 0
let ASTEROID_COUNTER = 0
const SHIP_SIZE = 30
const MISSILE_SIZE = 5

function newGame () {
  return {
    shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
    shipRotation: 0,
    numberOfLives: 2,
    time: 0,
    score: 0,
    missiles: [],
    asteroids: [
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
}

const initialState = newGame()

export default (state = initialState, action) => {
  let missileCollisions, shipCollisions
  switch (action.type) {

    case "ARROW_UP":
      shipCollisions = detectShipCollisions(state.shipCoordinates, state.asteroids)
      if (shipCollisions.shipDidCollide){
        return {
          ...state,
          shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
          asteroids: [
            ...state.asteroids.filter(asteroid => !shipCollisions.asteroid.includes(asteroid.id)),
            ...shipCollisions.newAsteroids,
          ],
          numberOfLives: Math.max(shipCollisions.shipDidCollide ? state.numberOfLives-1 : state.numberOfLives, 0)
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
        missileCollisions = detectMissileCollisions(state.missiles, state.asteroids)
        return {
          ...state,
          missiles: (
            state.missiles
              .filter((missile) => !missileCollisions.missile.includes(missile.id) )
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
          score: state.score+missileCollisions.points

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
      return newGame()

    case "UPDATE_CURRENT_TIME":
      return {
        ...state,
        time: state.time + 50,
      }

    default: return state
  }
}
