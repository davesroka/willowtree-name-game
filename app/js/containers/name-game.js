import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { init, checkAnswer, fetchTeamMembers } from 'actions/name-game-actions';
import { updateSettings } from 'actions/settings-actions';
import { incrementStat } from 'actions/stats-actions';

import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';
import LoadingSpinner from 'components/loading-spinner';


const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, lastAnswer } = state.nameGame;

  return {
    teamMembers,
    choices,
    answer,
    lastAnswer,
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
  };
};

class NameGame extends React.Component {
  static propTypes = {
    init: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.init();
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { choices, onTeamMemberClick, answer, statistics } = this.props;

    return (
      <div>
        <h2 class="text-center">Who is {(answer) ? answer.name : null}?</h2>
        {(choices)
          ? <TeamMemberList
          teamMembers={choices}
          onTeamMemberClick={onTeamMemberClick}
        />
          : <LoadingSpinner /> }
        <StatisticsList statistics={statistics}/>
      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


