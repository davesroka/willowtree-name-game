import React from 'react';
import { connect } from 'react-redux';
import { FormGroup,ControlLabel, FormControl, Checkbox } from 'react-bootstrap';
import { Button, Icon } from 'react-materialize';
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
    this.props.updateSettings();
  }

  render() {
    const { numberOfChoices, resetStatistics } = this.props;
    // TODO Build out settings Display settings
    return (
      <div>
        <Button waves="light" onClick={resetStatistics}>Reset Statistics</Button>
        <Button node='a' waves='light'><Icon right>file_cloud</Icon>button</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


