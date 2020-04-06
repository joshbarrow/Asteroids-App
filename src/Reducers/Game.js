import { newX, newY } from '../Utils/coordinates'
import detectCollisions from '../Utils/detectCollisions'

let MISSILE_COUNTER = 0

const initialState ={
  shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
  shipRotation: 0,
  missiles: [],
  asteroids: [
    {
      id: 1,
      size: "large",
      coordinates: [32,55],
      rotation: 12,
    },

    {
      id: 2,
      size: "large",
      coordinates: [70, 120],
      rotation: 50,
    },

    {
      id: 3,
      size: "large",
      coordinates: [70, 120],
      rotation: 50,
    },

    {
      id: 4,
      size: "large",
      coordinates: [50, 21],
      rotation: 50,
    },

    {
      id: 5,
      size: "large",
      coordinates: [343, 44],
      rotation: 11,
    },

    {
      id: 6,
      size: "large",
      coordinates: [320, 120],
      rotation: 12,
    },

    {
      id: 7,
      size: "large",
      coordinates: [222, 111],
      rotation: 122,
    },

    {
      id: 8,
      size: "medium",
      coordinates: [140, 88],
      rotation: 122,
    },

  ]
}

export default (state = initialState, action) => {
  switch (action.type) {

    case "ARROW_UP":
      return {
        ...state,
        shipCoordinates: [
          newX(state.shipCoordinates[0], state.shipRotation),
          newY(state.shipCoordinates[1], state.shipRotation),
        ],
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
        const { missileCollisions, asteroidCollisions } = detectCollisions(state.missiles, state.asteroids)
        return {
          ...state,
          missiles: (
            state.missiles
              .filter((missile) => !missileCollisions.includes(missile.id) )
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
          asteroids: state.asteroids.filter((asteroid) => !asteroidCollisions.includes(asteroid.id))
        }

      case "ASTEROID_EVENT_LOOP":
        return {
          ...state,
          asteroids: state.asteroids.map((asteroid) => {
            return {
            ...asteroid,
            coordinates: [
              newX(asteroid.coordinates[0], asteroid.rotation),
              newY(asteroid.coordinates[1], asteroid.rotation),
            ],
            }
          })
        }

    default: return state
  }
}
