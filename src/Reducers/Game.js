import { newX, newY } from '../Utils/coordinates'
import detectCollisions from '../Utils/detectCollisions'

let MISSILE_COUNTER = 0
let ASTEROID_COUNTER = 0

const initialState ={
  shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
  shipRotation: 0,
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
  ]
}

export default (state = initialState, action) => {
  let collisions
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
        collisions = detectCollisions(state.missiles, state.asteroids)
        return {
          ...state,
          missiles: (
            state.missiles
              .filter((missile) => !collisions.missile.includes(missile.id) )
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
            ...state.asteroids.filter((asteroid) => !collisions.asteroid.includes(asteroid.id)),
            ...collisions.newAsteroids,
          ]
        }

      case "ASTEROID_EVENT_LOOP":
        collisions = detectCollisions(state.missiles, state.asteroids)
        return {
          ...state,
          asteroids: (
            [
              ...state.asteroids
                .filter((asteroid) => !collisions.asteroid.includes(asteroid.id))
                .map((asteroid) => {
                  return {
                    ...asteroid,
                    coordinates: [
                      newX(asteroid.coordinates[0], asteroid.rotation),
                      newY(asteroid.coordinates[1], asteroid.rotation),
                    ],
                  }
                }),
              ...collisions.newAsteroids,
            ]

          ),
          missiles: state.missiles.filter((missile) => !collisions.missile.includes(missile.id))
        }

    default: return state
  }
}
