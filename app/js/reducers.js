import { combineReducers } from 'redux';

import nameGame from 'reducers/name-game-reducers';
import settings from 'reducers/settings-reducers';
import statistics from 'reducers/stats-reducers';

const rootReducer = combineReducers({
  nameGame,
  settings,
  statistics,
});

export default rootReducer;
