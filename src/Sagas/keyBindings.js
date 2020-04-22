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
