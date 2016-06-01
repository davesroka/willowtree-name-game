import React from 'react';
import { connect } from 'react-redux';
import TeamMemberList from 'components/team-members/team-member-list';
import { checkAnswer, fetchTeamMembers, refreshGameChoices } from 'actions/name-game-actions';

const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, lastAnswer, message } = state.nameGame;
  return {
    teamMembers,
    choices,
    answer,
    lastAnswer,
    message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
    this.props.fetchTeamMembers();
  }

  componentWillReceiveProps() {
    if (this.props.lastAnswer && this.props.lastAnswer.answer) {
      setTimeout(this.props.refreshGameChoices, 1000);
    }
  }

  render() {
    const { teamMembers, choices, onTeamMemberClick, answer, lastAnswer, message} = this.props;

    return (
      <div>
        <h2>Who is {(answer) ? answer.name : null}?</h2>
        <h3>{message}</h3>
        <span>Last Answer: <pre>{ (lastAnswer) ? JSON.stringify(lastAnswer) : 'none'}</pre></span>
        {(choices)
          ? <TeamMemberList
            teamMembers={choices}
            onTeamMemberClick={onTeamMemberClick}
            />
          : null}
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


