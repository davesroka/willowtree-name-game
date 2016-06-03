import _ from 'lodash';

/*
 * Action Types
 */
export const UPDATE_STATISTICS = 'UPDATE_STATISTICS';
export const ADD_CORRECT = 'ADD_CORRECT';
export const ADD_INCORRECT = 'ADD_INCORRECT';
export const ADD_GAME_STARTED = 'ADD_GAME_COMPLETED';
export const ADD_GAME_COMPLETED = 'ADD_GAME_COMPLETED';
export const INCREMENT_STAT = 'INCREMENT_STAT';

/*
 * Other Constants
 * */
export const STAT_NAMES = {
  TOTAL_ROUNDS_STARTED: {
    objectName: 'totalRoundsStarted',
    displayName: 'Total Rounds Started',
  },
  TOTAL_ROUNDS_COMPLETED: {
    objectName: 'totalRoundsCompleted',
    displayName: 'Total Rounds Started',
  },
  TOTAL_ANSWERED: {
    objectName: 'totalAnswered',
    displayName: 'Total Answered',
  },
  TOTAL_CORRECT: {
    objectName: 'totalCorrect',
    displayName: 'Total Correct',
  },
  TOTAL_INCORRECT: {
    objectName: 'totalIncorrect',
    displayName: 'Total Incorrect',
  },
  AVG_TIME_TO_ANSWER: {
    objectName: 'avgTimeToAnswer',
    displayName: 'Average Time to Answer',
  },
  AVG_TIME_TO_FINISH: {
    objectName: 'avgTimeToFinish',
    displayName: 'Average Time to Finish',
  },
  BY_TEAM_MEMBER: {
    objectName: 'byTeamMember',
    displayName: 'By Team Member',
  },
};

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

export function initStatistics() {

  let statistics = localStorage.getObject('statistics');
  console.log('localStatistics', statistics);

  if (!statistics){
    statistics = STATS_MODEL;
  }

  console.log('statistics', statistics);

  return {
    type: UPDATE_STATISTICS,
    statistics,
  };
}

export function addCorrect(lastAnswer) {
  // TODO add individual stat tracking
  return dispatch => dispatch(incrementStat(STAT_NAMES.TOTAL_CORRECT.objectName));
}
export function addIncorrect(lastAnswer) {
  return dispatch => dispatch(incrementStat(STAT_NAMES.TOTAL_INCORRECT.objectName));
}

export function addRoundStarted() {
  return dispatch => dispatch(incrementStat(STAT_NAMES.TOTAL_ROUNDS_STARTED.objectName));
}

export function addRoundCompleted() {
  return dispatch => dispatch(incrementStat(STAT_NAMES.TOTAL_ROUNDS_COMPLETED.objectName));
}

export function incrementStat(statKey, teamMember, incrementValue = 1) {
  return {
    type: INCREMENT_STAT,
    statKey,
    teamMember,
    incrementValue,
  };
}
