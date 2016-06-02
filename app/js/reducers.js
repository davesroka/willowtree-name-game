import { combineReducers } from 'redux';

import nameGame from 'reducers/name-game-reducers.js';
import settings from 'reducers/settings-reducers.js';
import statistics from 'reducers/stats-reducers.js';

const rootReducer = combineReducers({
  nameGame,
  settings,
  statistics,
});

export default rootReducer;
