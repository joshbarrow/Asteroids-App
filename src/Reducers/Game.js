const initialState ={
  shipCoordinates: [window.innerWidth/2, window.innerHeight/2],
}

export default (state = initialState, action) => {
  switch (action.type) {

    case "ARROW_UP":
      return {
        ...state,
        shipCoordinates: [
          state.shipCoordinates[0],
          state.shipCoordinates[1]-2,
        ],
      }


    default: return state
  }
}
