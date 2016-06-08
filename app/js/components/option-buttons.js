import React, { PropTypes } from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
const OptionButtons = ({
  hintMode,
  mattMode,
  onHintModeClick,
  onMattModeClick,
}) => (
  <ButtonToolbar className="row">
    <ButtonGroup className="pull-right">
      <Button
        bsSize="xsmall"
        bsStyle={(mattMode) ? 'success' : 'default'}
        onClick={onMattModeClick}
      >
        {`Matt Mode: ${(mattMode) ? 'on' : 'off'}`}
      </Button>
    </ButtonGroup>
    <ButtonGroup className="pull-right">
      <Button
        bsSize="xsmall"
        bsStyle={(hintMode) ? 'success' : 'default'}
        onClick={onHintModeClick}
      >
        {`Hint Mode: ${(hintMode) ? 'on' : 'off'}`}
      </Button>
    </ButtonGroup>
  </ButtonToolbar>
);

OptionButtons.propTypes = {
  hintMode: PropTypes.bool,
  mattMode: PropTypes.bool,
  onHintModeClick: PropTypes.func.isRequired,
  onMattModeClick: PropTypes.func.isRequired,
};

export default OptionButtons;
