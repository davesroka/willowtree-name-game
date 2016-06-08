import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { init, checkAnswer, fetchTeamMembers, toggleHintMode, startHintModeTimer } from 'actions/name-game-actions';
import { updateSettings } from 'actions/settings-actions';
import { incrementStat } from 'actions/stats-actions';

import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';
import LoadingSpinner from 'components/loading-spinner';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, lastAnswer, hintMode, mattMode } = state.nameGame;

  return {
    teamMembers,
    choices,
    answer,
    lastAnswer,
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
    startHintModeTimer: ()=> {
      dispatch(startHintModeTimer());
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
      <div>
        <h1 className="question">Who is {(answer) ? answer.name : null}?</h1>
        <ButtonToolbar className="row">
          <ButtonGroup className="pull-right">
            <Button bsSize="xsmall" bsStyle={ (hintMode) ? 'success' : 'default'} onClick={toggleHintMode}>
              {`Hint Mode: ${(hintMode) ? 'on' : 'off'}`}
            </Button>
          </ButtonGroup>
          <ButtonGroup className="pull-right">
            <Button bsSize="xsmall" bsStyle={ (mattMode) ? 'success' : 'default'} onClick={toggleMattMode}>
              {`Matt Mode: ${(mattMode) ? 'on' : 'off'}`}
            </Button>
          </ButtonGroup>
        </ButtonToolbar>

        <div className="row">

          <StatisticsList statistics={statistics}/>
          <div className="team-member-list">
            {(choices)
              ? <TeamMemberList
              teamMembers={choices}
              onTeamMemberClick={onTeamMemberClick}
            />
              : <LoadingSpinner /> }
          </div>
        </div>

      </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameGame);


