const initialState ={
  shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
  shipRotation: 0,
}

const INCREMENT_AMOUNT = 20

function newShipY (currentShipY, rotation) {
  switch (rotation) {
    case 0: return currentShipY-INCREMENT_AMOUNT
    case 30: return currentShipY-(INCREMENT_AMOUNT*.66)
    case 60: return currentShipY-(INCREMENT_AMOUNT*.33)
    case 90: return currentShipY
    case 120: return currentShipY+(INCREMENT_AMOUNT*.33)
    case 150: return currentShipY+(INCREMENT_AMOUNT*.66)
    case 180: return currentShipY+INCREMENT_AMOUNT
    case 210: return currentShipY+(INCREMENT_AMOUNT*.66)
    case 240: return currentShipY+(INCREMENT_AMOUNT*.33)
    case 270: return currentShipY
    case 300: return currentShipY-(INCREMENT_AMOUNT*.33)
    case 330: return currentShipY-(INCREMENT_AMOUNT*.66)
  }
}

function newShipX (currentShipX, rotation) {
  switch (rotation) {
    case 0: return currentShipX
    case 30: return currentShipX+(INCREMENT_AMOUNT*.33)
    case 60: return currentShipX+(INCREMENT_AMOUNT*.66)
    case 90: return currentShipX+INCREMENT_AMOUNT
    case 120: return currentShipX+(INCREMENT_AMOUNT*.33)
    case 150: return currentShipX+(INCREMENT_AMOUNT*.66)
    case 180: return currentShipX
    case 210: return currentShipX-(INCREMENT_AMOUNT*.33)
    case 240: return currentShipX-(INCREMENT_AMOUNT*.66)
    case 270: return currentShipX-INCREMENT_AMOUNT
    case 300: return currentShipX-(INCREMENT_AMOUNT*.66)
    case 330: return currentShipX-(INCREMENT_AMOUNT*.33)
  }
}

export default (state = initialState, action) => {
  switch (action.type) {

    case "ARROW_UP":
      return {
        ...state,
        shipCoordinates: [
          newShipX(state.shipCoordinates[0], state.shipRotation),
          newShipY(state.shipCoordinates[1], state.shipRotation),
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

    default: return state
  }
}
