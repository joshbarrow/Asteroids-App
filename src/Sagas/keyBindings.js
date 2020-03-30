import { call, put, takeLatest } from 'redux-saga/effects'

function* handleKey () {
  console.log("hi");
}

export default function* () {
  yield takeLatest("KEY_UP", handleKey)

}
