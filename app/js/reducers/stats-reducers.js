import {
  STATS_MODEL,
  UPDATE_STATISTICS,
  ADD_GAME_STARTED,
  ADD_GAME_COMPLETED,
  ADD_INCORRECT,
  ADD_CORRECT,
  INCREMENT_STAT,
} from 'actions/stats-actions';

export default function statsReducers(state = {}, action) {
  switch (action.type) {
    case UPDATE_STATISTICS:
      return {
        ...state,
        ...action.statistics
      };
    case INCREMENT_STAT :
    {
      const { statKey, teamMember, incrementValue } = action;
      let value = (state[statKey] && state[statKey].value) ? state[statKey].value : 0;
      value += incrementValue;

      const statistics = {
        ...state,
        [statKey]: {
          ...state[statKey],
          value,
        }
      };

      localStorage.setObject('statistics', statistics);
      console.log('localstorage', localStorage);
      return statistics;
    }
    default:
      return state;
  }
}


