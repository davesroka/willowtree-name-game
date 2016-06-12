import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { init, checkAnswer, toggleHintMode, toggleMattMode } from 'actions/name-game-actions';
import { updateSettings } from 'actions/settings-actions';
import { incrementStat } from 'actions/stats-actions';

import OptionButtons from 'components/option-buttons';
import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';

const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, hintMode, mattMode } = state.nameGame;

  return {
    teamMembers,
    choices,
    answer,
    hintMode,
    mattMode,
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
    toggleHintMode: () => {
      dispatch(toggleHintMode());
    },
    toggleMattMode: ()=> {
      dispatch(toggleMattMode());
    }

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
    const {
      choices,
      answer,
      statistics,
      hintMode,
      mattMode,
      toggleHintMode,
      toggleMattMode,
      onTeamMemberClick,
    } = this.props;

    return (
      <div className="container-fluid">
        <h1 className="question">Who is {(answer) ? answer.name : null}?</h1>
        <OptionButtons
          hintMode={hintMode}
          mattMode={mattMode}
          onHintModeClick={toggleHintMode}
          onMattModeClick={toggleMattMode}
        />
        <div className="row">
          <StatisticsList
            statistics={statistics}
          />
          <TeamMemberList
            teamMembers={choices}
            onTeamMemberClick={onTeamMemberClick}
          />
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


