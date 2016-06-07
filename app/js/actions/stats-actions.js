import ApiService from 'services/api-service';

export const UPDATE_STATISTICS = 'UPDATE_STATISTICS';
export const INCREMENT_STAT = 'INCREMENT_STAT';

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
  TOTAL_TIME_TO_CORRECT: {
    objectName: 'totalTimeToCorrect',
    dispalyName: 'Total Time To Correct',
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

function receiveStatistics(statistics) {
  return {
    type: UPDATE_STATISTICS,
    statistics,
  };
}

export function fetchStatistics() {
  return dispatch => {
    ApiService.fetchStatistics()
      .then(statistics=> {
        dispatch(receiveStatistics(statistics));
      });
  };
}

export function initStatistics() {
  let statistics = localStorage.getObject('statistics');
  console.log('localStatistics', statistics);

  // if (!statistics) {
  //   statistics = STAT_NAMES.map((statistic)=> {
  //     const { objectName, displayName } = statistic;
  //     return {
  //       objectName,
  //       displayName,
  //       value: 0,
  //     };
  //   });
  // }
  //
  // console.log('statistics', statistics);

  return {
    type: UPDATE_STATISTICS,
    statistics,
  };
}

export function resetStatistics() {
  return dispatch => {
    localStorage.removeItem('statistics');
    console.log(localStorage.getObject('statisitcs'));
    dispatch(initStatistics());
  };
}


export function incrementStat(statKey, teamMember, incrementValue = 1) {
  return {
    type: INCREMENT_STAT,
    statKey,
    teamMember,
    incrementValue,
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

export function addRoundCompleted(roundTime) {
  return dispatch => {
    dispatch(incrementStat(STAT_NAMES.TOTAL_ROUNDS_COMPLETED.objectName));
    dispatch(incrementStat(STAT_NAMES.TOTAL_TIME_TO_CORRECT.objectName, null, roundTime));
  };
}


