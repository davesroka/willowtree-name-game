import React from 'react';
import { connect } from 'react-redux';
import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';
import LoadingSpinner from 'components/loading-spinner';
import {init, checkAnswer, fetchTeamMembers, refreshGameChoices } from 'actions/name-game-actions';
import { updateSettings, addCorrect, addIncorrect, addGameStarted, addGameCompleted } from 'actions/settings-actions';

const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, lastAnswer, message } = state.nameGame;

  return {
    teamMembers,
    choices,
    answer,
    lastAnswer,
    message,
    statistics: state.statistics,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(init());
    },
    onTeamMemberClick: (clickedTeamMember) => {
      dispatch(checkAnswer(clickedTeamMember));
    },
    fetchTeamMembers: () => {
      dispatch(fetchTeamMembers());
    },
    refreshGameChoices: () => {
      dispatch(refreshGameChoices());
    },

  };
};

class NameGame extends React.Component {

  componentDidMount() {
    this.props.init();
  }

  componentWillReceiveProps(nextProps) {
    const { lastAnswer, refreshGameChoices, addCorrect, addIncorrect, addGameCompleted } = nextProps;

    if (lastAnswer) {
      if (lastAnswer.answer) {
        // TODO refactor this into 1 action
        addCorrect(lastAnswer);
        addGameCompleted();
        setTimeout(refreshGameChoices, 3000);

      } else {
        addIncorrect(lastAnswer);
      }
    }
  }

  render() {
    const { choices, onTeamMemberClick, answer, message, statistics} = this.props;

    return (
      <div>
        <h2>Who is {(answer) ? answer.name : null}?</h2>
        <h3>{message}</h3>
        {(choices)
          ? <TeamMemberList
          teamMembers={choices}
          onTeamMemberClick={onTeamMemberClick}
        />
          : <LoadingSpinner />}
        <StatisticsList statistics={statistics}/>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


