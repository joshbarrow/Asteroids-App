import { newX, newY } from '../Utils/coordinates'
import { detectShipCollisions, detectMissileCollisions } from '../Utils/detectCollisions'

let MISSILE_COUNTER = 0
let ASTEROID_COUNTER = 0

function newGame () {
  return {
    shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
    shipRotation: 0,
    numberOfLives: 1,
    missiles: [],
    asteroids: [
      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [32,55],
        rotation: 12,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [70, 120],
        rotation: 50,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [70, 120],
        rotation: 50,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [50, 21],
        rotation: 50,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [343, 44],
        rotation: 11,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [320, 120],
        rotation: 12,
      },

      {
        id: ASTEROID_COUNTER++,
        size: "large",
        coordinates: [222, 111],
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
            newX(state.shipCoordinates[0], state.shipRotation),
            newY(state.shipCoordinates[1], state.shipRotation),
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
                    newX(missile.coordinates[0], missile.rotation),
                    newY(missile.coordinates[1], missile.rotation),
                  ],
                }
              })
          ),
          asteroids: [
            ...state.asteroids.filter((asteroid) => !missileCollisions.asteroid.includes(asteroid.id)),
            ...missileCollisions.newAsteroids,
          ]
        }

      case "ASTEROID_EVENT_LOOP":
        missileCollisions = detectMissileCollisions(state.missiles, state.asteroids)
        shipCollisions = detectShipCollisions(state.shipCoordinates, state.asteroids)
        console.log( shipCollisions.shipDidCollide ? state.numberOfLives-1 : state.numberOfLives)

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
                      newX(asteroid.coordinates[0], asteroid.rotation),
                      newY(asteroid.coordinates[1], asteroid.rotation),
                    ],
                  }
                }),
              ...missileCollisions.newAsteroids,
              ...shipCollisions.newAsteroids,
            ]
          ),
          missiles: state.missiles.filter((missile) => !missileCollisions.missile.includes(missile.id)),
          numberOfLives: Math.max(shipCollisions.shipDidCollide ? state.numberOfLives-1 : state.numberOfLives, 0)
        }

    case "NEW_GAME":
      return newGame()

    default: return state
  }
}
