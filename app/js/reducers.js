import { combineReducers } from 'redux';

import nameGame from 'reducers/name-game-reducers.js';
const rootReducer = combineReducers({
  nameGame,
});

export default rootReducer;
