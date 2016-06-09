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
  COMPLETION_PERCENTAGE: {
    objectName: 'completionPercentage',
    displayName: 'Completion Percentage',
  },
  TOTAL_CORRECT: {
    objectName: 'totalCorrect',
  },
  TOTAL_INCORRECT: {
    objectName: 'totalIncorrect',
  },
  TOTAL_CLICKS: {
    objectName: 'totalClicks',
    displayName: 'Total Clicks',
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
  return dispatch => {
    dispatch(incrementStat(STAT_NAMES.TOTAL_INCORRECT.objectName));
    dispatch(calculateAggregateStats());
  }
}

export function addRoundStarted() {
  return dispatch => {
    dispatch(incrementStat(STAT_NAMES.TOTAL_ROUNDS_STARTED.objectName));
    dispatch(calculateAggregateStats());
  }
}

export function addRoundCompleted(roundTime) {
  return dispatch => {
    dispatch(incrementStat(STAT_NAMES.TOTAL_ROUNDS_COMPLETED.objectName));
    dispatch(incrementStat(STAT_NAMES.TOTAL_TIME_TO_CORRECT.objectName, null, roundTime));
  };
}

export function calculateAggregateStats() {
  return (dispatch, getState)=> {
    const {
      totalCorrect,
      totalIncorrect,
      totalTimeToCorrect,
      totalRoundsCompleted,
      totalRoundsStarted,
      avgTimeToFinish,
      accuracy,
      completionPercentage,
      totalClicks,

    } = getState().statistics;

    const newAvgTimeToFinish = {
      ...avgTimeToFinish,
      value: (totalTimeToCorrect.value / totalRoundsCompleted.value).toFixed(2),
    };
    const newAccuracy = {
      ...accuracy,
      value: (totalCorrect.value / (totalCorrect.value + totalIncorrect.value) * 100).toFixed(2),
    };
    const newCompletionPercentage = {
      ...completionPercentage,
      value: (totalRoundsCompleted.value / totalRoundsStarted.value * 100).toFixed(2),
    };
    const newTotalClicks = {
      ...totalClicks,
      value: totalCorrect.value + totalIncorrect.value,
    };

    dispatch({
      type: UPDATE_STATISTICS,
      statistics: {
        ...getState().statistics,
        avgTimeToFinish: newAvgTimeToFinish,
        completionPercentage: newCompletionPercentage,
        accuracy: newAccuracy,
        totalClicks: newTotalClicks,
      }
    })

  }
}


