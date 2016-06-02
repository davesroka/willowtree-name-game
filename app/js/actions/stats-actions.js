/*
 * Action Types
 */
export const UPDATE_STATISTICS = 'UPDATE_STATISTICS';
export const ADD_CORRECT = 'ADD_CORRECT';
export const ADD_INCORRECT = 'ADD_INCORRECT';
export const ADD_GAME_STARTED = 'ADD_GAME_COMPLETED';
export const ADD_GAME_COMPLETED = 'ADD_GAME_COMPLETED';

/*
 * Other Constants
 * */
export const STATS_MODEL = {
  totalRoundsStarted: 0,
  totalRoundsCompleted: 0,
  totalAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  averageTimeToAnswer: 0,
  averageTimeToFinish: 0,
  byTeamMember: {},
};

/*
 * Action Creators
 */
export function updateStatistics(statistics) {
  if (statistics) {
    localStorage.statistics = statistics;
  } else {
    statistics = localStorage.statistics || STATS_MODEL;
  }

  return {
    type: UPDATE_STATISTICS,
    statistics,
  };
}

export function addCorrect(teamMember) {
  return {
    type: ADD_CORRECT,
    teamMember,
  };
}

export function addIncorrect(teamMember) {
  return {
    type: ADD_INCORRECT,
    teamMember,
  };
}

export function addGameStarted() {
  return {
    type: ADD_GAME_STARTED,
  };
}
export function addGameCompleted() {
  return {
    type: ADD_GAME_COMPLETED,
  };
}
