import { createStore, combineReducers } from 'redux'
import gameReducer from './Reducers/Game'

export default createStore(combineReducers({
  game: gameReducer,
}))
