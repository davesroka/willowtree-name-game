import ApiService from 'services/api-service.js';
import {updateSettings} from 'actions/settings-actions';
import * as StatsActions from 'actions/stats-actions';

export const REQUEST_TEAM_MEMBERS = 'REQUEST_TEAM_MEMBERS';
export const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS';
export const REFRESH_GAME_CHOICES = 'REFRESH_GAME_OPTIONS';
export const UPDATE_TEAM_MEMBER_STYLE = 'UPDATE_TEAM_MEMBER_STYLE';


export function init() {
  return dispatch => {
    dispatch(updateSettings());
    dispatch(StatsActions.initStatistics());
    ApiService.getTeamMembers()
      .then(teamMembers =>
        dispatch(receiveTeamMembers(teamMembers)))
      .then(() => dispatch(startNewGame()))
      .catch(error => console.error(error));
  };
}

export function requestTeamMembers() {
  return {
    type: REQUEST_TEAM_MEMBERS,
  };
}

function receiveTeamMembers(teamMembers) {
  return {
    type: RECEIVE_TEAM_MEMBERS,
    teamMembers,
  };
}

export function refreshGameChoices(numberOfChoices = 5, ) {
  const startTime = Date.now();
  return {
    type: REFRESH_GAME_CHOICES,
    startTime,
    numberOfChoices,
  };
}

export function startNewGame() {
  return dispatch => {
    dispatch(StatsActions.addRoundStarted());
    dispatch(refreshGameChoices());
  };
}

export function finishGame() {
  return (dispatch, getState) => {
    const roundTime = Date.now - getState.startTime;
    dispatch(StatsActions.addGameCompleted(roundTime));
    dispatch(startNewGame());
  };
}

export function checkAnswer(lastAnswer) {
  return dispatch => {
    if (lastAnswer.answer) {
      dispatch(StatsActions.addCorrect(lastAnswer));
      dispatch(StatsActions.addRoundCompleted());
      setTimeout(()=> {
        dispatch(refreshGameChoices());
      }, 3000);
    } else {
      dispatch(StatsActions.addIncorrect(lastAnswer));
    }
    dispatch(updateTeamMemberStyle(lastAnswer));
  };
}
export function updateTeamMemberStyle(lastAnswer) {
  return {
    type: UPDATE_TEAM_MEMBER_STYLE,
    lastAnswer,
  };
}
