import {
  UPDATE_STATISTICS,
  ADD_GAME_STARTED,
ADD_GAME_COMPLETED,
ADD_INCORRECT,
ADD_CORRECT,
} from 'actions/stats-actions';

export default function statsReducers(state = {}, action) {
  switch (action.type) {
    case UPDATE_STATISTICS:
      return {...state, ...action.statistics};
   default:
      return state;
  }
}


