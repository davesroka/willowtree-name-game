import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { init, checkAnswer, fetchTeamMembers } from 'actions/name-game-actions';
import { updateSettings } from 'actions/settings-actions';
import { incrementStat } from 'actions/stats-actions';

import TeamMemberList from 'components/team-members/team-member-list';
import StatisticsList from 'components/statistics-list';
import LoadingSpinner from 'components/loading-spinner';
import { Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
  const { teamMembers, choices, answer, lastAnswer, hintMode } = state.nameGame;

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
    let hintModeButton = <Button bsSize="small" bsStyle=>Hint Mode: Off</Button>;

    return (
      <div>
        <h1 className="question">Who is {(answer) ? answer.name : null}?</h1>
        <Button bsSize="small">Hint Mode: Off</Button>
        <div className="row">
          <div className="col-sm-12 col-md-2 well">
            <StatisticsList statistics={statistics}/>
          </div>
          <div className="col-sm-12 col-md-10">
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


