import _ from 'lodash';
import {
  REQUEST_TEAM_MEMBERS,
  RECEIVE_TEAM_MEMBERS,
  REFRESH_GAME_CHOICES,
  UPDATE_TEAM_MEMBER_STYLE,
  TOGGLE_HINT_MODE,
  FADE_OUT_CHOICE,
} from 'actions/name-game-actions';

export function getRandomInt(min, max) {
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
      const { startTime, numberOfChoices } = action;
      const { teamMembers, choices } = state;

      let nextChoices = [];

      if (teamMembers) {

        while (nextChoices.length < numberOfChoices) {
          const randomIndex = getRandomInt(0, teamMembers.length);
          let teamMember = teamMembers[randomIndex];

          if (!_.includes(choices, teamMember) && !_.includes(nextChoices, teamMember)) {
            nextChoices.push(teamMember);
          }
        }

        const answerIndex = getRandomInt(0, numberOfChoices);
        nextChoices[answerIndex].answer = true;

        return {
          ...state,
          choices: nextChoices,
          answer: nextChoices[answerIndex],
          startTime: startTime,
        };
      }
      return state;
    }

    case UPDATE_TEAM_MEMBER_STYLE: {
      const { lastAnswer } = action;

      let message;

      let choices = [...state.choices];
      const index = choices.findIndex(choice => choice == lastAnswer);

      if (lastAnswer.answer) {
        choices[index].displayStyle = 'team-member-correct';
        message = 'Correct!';
        lastAnswer.correct = true;
      } else {
        choices[index].displayStyle = 'team-member-incorrect';
        message = 'Incorrect!';
        lastAnswer.correct = false;
      }

      return {
        ...state,
        choices,
        message,
        lastAnswer,
      }
    }
    case TOGGLE_HINT_MODE:
      return {
        ...state,
        hintMode: !state.hintMode,
      };
    case FADE_OUT_CHOICE:
      return {
        ...state,
        teamMember: {
          ...state.teamMember,
          faded: true
        },
      };
    default:
      return state;
  }
}
