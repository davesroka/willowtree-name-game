import { combineReducers } from 'redux';

import nameGame from 'reducers/name-game-reducers.js';
import settings from 'reducers/settings-reducers.js';
const rootReducer = combineReducers({
  nameGame,
  settings,
});

export default rootReducer;
