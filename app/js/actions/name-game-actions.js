import ApiService from 'services/api-service';
import { updateSettings } from 'actions/settings-actions';
import * as StatsActions from 'actions/stats-actions';
import { getRandomInt } from 'reducers/name-game-reducers';

export const RECEIVE_TEAM_MEMBERS = 'RECEIVE_TEAM_MEMBERS';
export const REFRESH_GAME_CHOICES = 'REFRESH_GAME_OPTIONS';
export const UPDATE_TEAM_MEMBER_STYLE = 'UPDATE_TEAM_MEMBER_STYLE';
export const TOGGLE_HINT_MODE = 'TOGGLE_HINT_MODE';
export const FADE_OUT_CHOICE = 'FADE_OUT_CHOICE';


export function init() {
  return dispatch => {
    dispatch(updateSettings());
    dispatch(StatsActions.initStatistics());
    ApiService.fetchTeamMembers()
      .then(teamMembers =>
        dispatch(receiveTeamMembers(teamMembers)))
      .then(() => dispatch(startNewGame()))
      .catch(error => console.error(error));
  };
}

function receiveTeamMembers(teamMembers) {
  return {
    type: RECEIVE_TEAM_MEMBERS,
    teamMembers,
  };
}

export function refreshGameChoices(numberOfChoices = 5,) {
  const startTime = Date.now();
  return {
    type: REFRESH_GAME_CHOICES,
    startTime,
    numberOfChoices,
  };
}

export function startNewGame() {
  return (dispatch, getState) => {
    dispatch(StatsActions.addRoundStarted());
    dispatch(refreshGameChoices());

  };
}

export function finishGame() {
  return (dispatch, getState) => {
    const roundTime = (Date.now() - getState().nameGame.startTime) / 1000;
    console.log('roundTime', roundTime);
    dispatch(StatsActions.addRoundCompleted(roundTime));
    setTimeout(()=> {
      dispatch(startNewGame());
      if (getState().nameGame.hintMode) {
        dispatch(startHintModeTimer());
      }
    }, 3000);
  };
}

export function checkAnswer(lastAnswer) {
  return dispatch => {
    if (lastAnswer.answer) {
      dispatch(StatsActions.addCorrect(lastAnswer));
      dispatch(finishGame());
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

export function toggleHintMode() {
  return (dispatch, getState) => {
    if (!getState().nameGame.hintMode) {
      dispatch(startHintModeTimer());
    }
    dispatch({ type: TOGGLE_HINT_MODE });
  }
}

export function startHintModeTimer() {
  return (dispatch, getState) => {
    const { choices } = getState().nameGame;
    let teamMemberToFade;

    while (!teamMemberToFade) {
      const index = getRandomInt(0, choices.length);
      if (!choices[index].answer) {
        teamMemberToFade = choices[index];
      }
    }
    setTimeout(dispatch(fadeOutChoice(teamMemberToFade)), 3000);
  };
}

export function fadeOutChoice(teamMember) {
  return dispatch => {
    dispatch({
      type: FADE_OUT_CHOICE,
      teamMember,
    });
  };
}
export function toggleMattMode(){
  return dispatch =>
}
