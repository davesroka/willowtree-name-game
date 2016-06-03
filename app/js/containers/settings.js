import React from 'react';
import { connect } from 'react-redux';
import { FormGroup,ControlLabel, FormControl, Checkbox } from 'react-bootstrap'
import { updateSettings } from 'actions/settings-actions';

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
  };
};

class Settings extends React.Component {

  componentDidMount() {
    this.props.updateSettings();
  }

  render() {
    const { numberOfChoices } = this.props;
    // TODO Build out settings Display settings
    return (
      <div></div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


