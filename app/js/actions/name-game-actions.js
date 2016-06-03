import ApiService from 'services/api-service.js';
import { updateSettings } from 'actions/settings-actions';
import * as StatsActions from 'actions/stats-actions';

/*
 * action types
 */

export const INIT = 'INIT';
export const REQUEST_TEAM_MEMBERS = 'REQUEST_TEAM_MEMBERS';
export const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS';
export const REFRESH_GAME_CHOICES = 'REFRESH_GAME_OPTIONS';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const UPDATE_TEAM_MEMBER_STYLE = 'UPDATE_TEAM_MEMBER_STYLE';


/*
 * action creators
 */
export function init() {
  return dispatch => {
    dispatch(updateSettings());
    dispatch(StatsActions.initStatistics());
    ApiService.getTeamMembers()
      .then(teamMembers =>
        dispatch(receiveTeamMembers(teamMembers)))
      .then(()=>dispatch(startNewGame()))
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

export function refreshGameChoices(teamMembers, numberOfChoices = 5) {

  return {
    type: REFRESH_GAME_CHOICES,
    teamMembers,
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
  return dispatch => {
    dispatch(StatsActions.addGameCompleted());
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
