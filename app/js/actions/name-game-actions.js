import ApiService from 'services/api-service.js';
import { updateSettings } from 'actions/settings-actions';
import { updateStatistics, addGameStarted } from 'actions/stats-actions';
/*
 * action types
 */

export const INIT = 'INIT';
export const REQUEST_TEAM_MEMBERS = 'REQUEST_TEAM_MEMBERS';
export const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS';
export const REFRESH_GAME_CHOICES = 'REFRESH_GAME_OPTIONS';
export const CHECK_ANSWER = 'CHECK_ANSWER';
export const UPDATE_ANSWER_STATUS = 'UPDATE_ANSWER_STATUS';


/*
 * action creators
 */
export function init() {
  return dispatch => {
    dispatch(updateSettings());
    dispatch(updateStatistics());
    ApiService.getTeamMembers()
      .then(teamMembers => dispatch(receiveTeamMembers(teamMembers)))
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

export function refreshGameChoices(teamMembers, numberOfChoices = 5) {

  return {
    type: REFRESH_GAME_CHOICES,
    teamMembers,
    numberOfChoices,
  };
}

export function startNewGame() {
  return dispatch => {
    dispatch(addGameStarted());
    dispatch(refreshGameChoices());
  };
}

export function finishGame() {
  return dispatch => {
    dispatch(addGameCompleted());
    dispatch(startNewGame());
  };
}

export function checkAnswer(lastAnswer) {
  return {
    type: CHECK_ANSWER,
    lastAnswer,
  };
}
