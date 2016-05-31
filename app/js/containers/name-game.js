import React from 'react';
import { connect } from 'react-redux';
import TeamMemberList from 'components/team-members/team-member-list';
import { checkAnswer, fetchTeamMembers, refreshGameChoices } from 'actions/name-game-actions';

const mapStateToProps = (state) => {
  const { teamMembers, possibleResponses, answer, lastAnswer, message } = state.nameGame;
  return {
    teamMembers,
    possibleResponses,
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
    refreshGameOptions: () => {
      dispatch(refreshGameChoices());
    },
  };
};

class NameGame extends React.Component {

  componentDidMount() {
    this.props.fetchTeamMembers();
  }

  render() {
    const { teamMembers, possibleResponses, onTeamMemberClick, answer, lastAnswer, message} = this.props;
(
  teamMembers) ?console.log('currentRound', teamMembers.filter(teamMember => teamMember.inCurrentRound)): null;
    return (
      <div>
        <h2>Who is {(answer) ? answer.name : null}?</h2>
        <h3>{message}</h3>
        <span>Last Answer: <pre>{ (lastAnswer) ? JSON.stringify(lastAnswer) : 'none'}</pre></span>
        {(teamMembers)
          ? <TeamMemberList
            teamMembers={teamMembers.filter(teamMember => teamMember.inCurrentRound)}
            onTeamMemberClick={onTeamMemberClick}
            />
          : null}
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


