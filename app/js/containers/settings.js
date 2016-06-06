import React from 'react';
import { connect } from 'react-redux';
// import { Button } from 'react-materialize';
import { Button } from 'react-bootstrap';
import { updateSettings } from 'actions/settings-actions';
import { resetStatistics } from 'actions/stats-actions';

const mapStateToProps = (state) => {
  const { numberOfChoices } = state.settings;
  return {
    numberOfChoices,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSettings: (settings) => {
      dispatch(updateSettings(settings));
    },
    resetStatistics: () => {
      dispatch(resetStatistics());
    },
  };
};

class Settings extends React.Component {

  componentDidMount() {
  }

  render() {
    const { resetStatistics } = this.props;
    // TODO Build out settings Display settings
    return (
      <div>
        <Button waves="light" onClick={resetStatistics}>Reset Statistics</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


