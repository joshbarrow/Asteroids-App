import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import gameReducer from './Reducers/Game'
import keyBindingsSaga from './Sagas/keyBindings'

const sagaMiddleware = createSagaMiddleware()

export default createStore(combineReducers({
  game: gameReducer,
}), applyMiddleware(sagaMiddleware))

sagaMiddleware.run(keyBindingsSaga)
