const initialState ={
  shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
  shipRotation: 0,
  missiles: [],
}

let MISSILE_COUNTER = 0
const INCREMENT_AMOUNT = 30

function newX(x, rotation) {
  const isLeftOfYAxis = rotation > 180
  const isBelowXAxis = rotation > 90 && rotation <= 270

  // since we simply want to observe this degree's rotation within it's quadrant,
  // we can modify the original degree until it is within 90. this allows us to see
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

  return x + value
}

function newY(y, rotation) {
  const isLeftOfYAxis = rotation > 180
  const isBelowXAxis = rotation > 90 && rotation <= 270

  // since we simply want to observe this degree's rotation within it's quadrant,
  // we can modify the original degree until it is within 90. this allows us to see
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

  return y + value
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
            rotation: state.shipRotation + 30
          }
        ]
      }

      case "UPDATE_MISSILE_POSITION":
        return {
          ...state,
          missiles: state.missiles.map((missile) => {
            return {
              ...missile,
              coordinates: [
                newX(missile.coordinates[0], missile.rotation),
                newY(missile.coordinates[1], missile.rotation),
              ],
            }
          })
        }

    default: return state
  }
}
