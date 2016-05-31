import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import {
  REQUEST_TEAM_MEMBERS,
  RECEIVE_TEAM_MEMBERS,
  REFRESH_GAME_CHOICES,
  CHECK_ANSWER
} from 'actions/name-game-actions';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
export default function nameGameReducers(state = {}, action) {
  switch (action.type) {
    case REQUEST_TEAM_MEMBERS:
      return { ...state, loading: true };

    case RECEIVE_TEAM_MEMBERS:
      return { ...state, teamMembers: action.teamMembers };
    // return Object.assign({}, state, {teamMembers: action.teamMembers})

    case REFRESH_GAME_CHOICES: {
      // TODO convert to config
      let {teamMembers, numberOfChoices} = action;
      teamMembers = teamMembers || state.teamMembers;
      const previousChoices = state.choices;

      let choices = [];

      if (teamMembers) {

        while (choices.length < numberOfChoices + 1) {
          const randomIndex = getRandomInt(0, teamMembers.length);
          let teamMember = teamMembers[randomIndex];

          if (!_.includes(previousChoices, teamMember) && !_.includes(choices, teamMember)) {
            choices.push(teamMember);
          }
        }

        const answerIndex = getRandomInt(0, numberOfChoices);
        choices[answerIndex].answer = true;

        return { ...state,
          choices,
          answer: teamMembers[answerIndex],
        };
      }
    }

    case CHECK_ANSWER: {
      const { lastAnswer } = action;

      let message;

      let teamMembers = [...state.teamMembers];
      const index = teamMembers.findIndex(teamMember => teamMember == lastAnswer);

      if (lastAnswer.answer) {
        teamMembers[index].displayStyle = 'correct-answer';
        message = 'Correct!';
      }
      else {
        teamMembers[index].displayStyle = 'incorrect-answer';
        message = 'Incorrect!';
      }
      return {...state,
        teamMembers,
        message,
      }
    }
    default:
      return state;
  }
}