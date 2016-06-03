import React from 'react';
import { connect } from 'react-redux';
import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';
import LoadingSpinner from 'components/loading-spinner';
import { init, checkAnswer, fetchTeamMembers, refreshGameChoices } from 'actions/name-game-actions';
import { updateSettings } from 'actions/settings-actions';
import { incrementStat, STAT_NAMES, addCorrect, addIncorrect, addGameStarted, addGameCompleted } from 'actions/stats-actions';

const mapStateToProps = (state) => {
  const {teamMembers, choices, answer, lastAnswer, message} = state.nameGame;

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
    incrementStat : (statKey, incrementValue) =>{
      dispatch(incrementStat(statKey, incrementValue));
    },
    addCorrect: (teamMember)=> {
      dispatch(addCorrect(teamMember));
    },
    addIncorrect: (teamMember) => {
      dispatch(addIncorrect(teamMember));
    },
    addGameCompleted: () => {
      dispatch(addGameCompleted());
    }

  };
};

class NameGame extends React.Component {

  componentDidMount() {
    this.props.init();
  }

  componentWillReceiveProps(nextProps) {
    const {lastAnswer, refreshGameChoices, addCorrect, addIncorrect, addGameCompleted, incrementStat} = nextProps;


  }

  render() {
    const {choices, onTeamMemberClick, answer, message, statistics} = this.props;

    return (
      <div>
        <h2 class="text-center">Who is {(answer) ? answer.name : null}?</h2>
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


