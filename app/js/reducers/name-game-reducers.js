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

        while (choices.length < numberOfChoices) {
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
          answer: choices[answerIndex],
          lastAnswer: null,
        };
      }
    }

    case CHECK_ANSWER: {
      const { lastAnswer } = action;

      let message;

      let choices = [...state.choices];
      const index = choices.findIndex(choice => choice == lastAnswer);

      if (lastAnswer.answer) {
        choices[index].displayStyle = 'team-member-correct';
        message = 'Correct!';
        lastAnswer.correct = true;

      }
      else {
        choices[index].displayStyle = 'team-member-incorrect';
        message = 'Incorrect!';
        lastAnswer.correct = false;
      }
      return {...state,
        choices,
        message,
        lastAnswer,
      }
    }
    default:
      return state;
  }
}
