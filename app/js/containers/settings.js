import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from 'actions/settings-actions';

const mapStateToProps = (state) => {
  return {
    ...state.settings,
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

class Settings extends React.Component {

  componentDidMount() {
    this.props.getSettings();
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.lastAnswer && nextProps.lastAnswer.answer) {
      console.log('lastAnswer = answer');
      setTimeout(nextProps.refreshGameChoices, 3000);
    }
  }

  render() {
    const { teamMembers, choices, onTeamMemberClick, answer, lastAnswer, message} = this.props;

    return (
      <div>
        <h2>Who is {(answer) ? answer.name : null}?</h2>
        <h3>{message}</h3>
        {(choices)
          ? <TeamMemberList
          teamMembers={choices}
          onTeamMemberClick={onTeamMemberClick}
        />
          : null}
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


