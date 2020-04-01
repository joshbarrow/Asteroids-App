import { call, put, takeLatest } from 'redux-saga/effects'

function* handleKey ({ payload }) {
  const keyPressed = payload.code
  switch (keyPressed) {
    case "ArrowLeft":
      console.log("1");
      yield put({ type: "ARROW_LEFT", payload: null })
      break

    case "ArrowRight":
      console.log(2);
      yield put({ type: "ARROW_RIGHT", payload: null })
      break

    case "ArrowUp":
      console.log(3);
      yield put({ type: "ARROW_UP", payload: null })
      break

    case "Space":
      console.log(4);
      yield put ({ type: "SPACE_BAR", payload: null })
      break
  }

}

export default function* () {
  yield takeLatest("KEY_UP", handleKey)

}
