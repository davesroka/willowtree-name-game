/*
 * action types
 */

export const CHECK_TEST = 'TEST';
export const REQUEST_TEAM_MEMBERS = 'REQUEST_TEAM_MEMBERS';
export const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS';
export const REFRESH_GAME_CHOICES = 'REFRESH_GAME_OPTIONS';
export const CHECK_ANSWER = 'CHECK_ANSWER';

/*
 * action creators
 */

export function test(name) {
  return { type: CHECK_TEST, name };
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

export function fetchTeamMembers() {
  return dispatch => {
    fetch('http://localhost:3000/db')
      .then(response => response.json())
      .then(teamMembers => {
        // console.log('json data', teamMembers);
        dispatch(receiveTeamMembers(teamMembers));
        dispatch(refreshGameChoices(teamMembers));
      })
      .catch(error => console.error(error));
  };
}

export function checkAnswer(lastAnswer) {
  return {
    type: CHECK_ANSWER,
    lastAnswer,
  };
}
