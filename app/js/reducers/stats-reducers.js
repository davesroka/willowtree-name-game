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
      return {...state, ...action.statistics};
    case ADD_CORRECT: {
      return {
        ...state,
        totalCorrect: state.totalCorrect++,
      }

    }
    case ADD_INCORRECT: {
      return {
        ...state,
        totalIncorrect: state.totalIncorrect++,
      }

    }
    case ADD_GAME_STARTED : {
      return {
        ...state,
        totalRoundsStarted: state.totalRoundsStarted++,
      }

    }
    case ADD_GAME_COMPLETED : {
      return {
        ...state,
        totalRoundsCompleted: state.totalRoundsCompleted++,
      }
    }
    case INCREMENT_STAT : {
      const {statKey, teamMember, incrementValue} = action;

      const statistics = {
        ...state,
        [statKey]: state[statKey] + incrementValue,
      };

      localStorage.setObject('statistics', statistics);
      return statistics;
    }
    default:
      return state;
  }
}


