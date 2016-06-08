import ApiService from 'services/api-service';

export const UPDATE_STATISTICS = 'UPDATE_STATISTICS';
export const INCREMENT_STAT = 'INCREMENT_STAT';

export const STAT_NAMES = {
  TOTAL_ROUNDS_STARTED: {
    objectName: 'totalRoundsStarted',
  },
  TOTAL_ROUNDS_COMPLETED: {
    objectName: 'totalRoundsCompleted',
    displayName: 'Total Rounds Completed',
  },
  COMPLETE_PERCENTAGE : {
    objectName: 'completionPercentage',
    displayName: 'Completion Percentage',
  }
  TOTAL_CORRECT: {
    objectName: 'totalCorrect',
    displayName: 'Total Correct Clicks',
  },
  TOTAL_INCORRECT: {
    objectName: 'totalIncorrect',
    displayName: 'Total Incorrect Clicks',
  },
  ACCURACY: {
    objectName: 'accuracy',
    displayName: 'Accuracy',
  },
  TOTAL_TIME_TO_CORRECT: {
    objectName: 'totalTimeToCorrect',
  },
  AVG_TIME_TO_FINISH: {
    objectName: 'avgTimeToFinish',
    displayName: 'Average Time to Correct Answer (Seconds)',
  },
  BY_TEAM_MEMBER: {
    objectName: 'byTeamMember',
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

  if (!statistics) {
    statistics = [];
    for (const prop in STAT_NAMES) {
      if (STAT_NAMES.hasOwnProperty(prop)) {
        statistics[STAT_NAMES[prop].objectName] = {
          displayName: STAT_NAMES[prop].displayName,
        };
      }
    }
  }

  console.log('statistics', statistics);

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
  return dispatch => {
    dispatch(incrementStat(STAT_NAMES.TOTAL_CORRECT.objectName));
    dispatch(calculateAggregateStats());
  }
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


