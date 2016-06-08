import React, { PropTypes } from 'react';
import { Fade } from 'react-bootstrap';

const TeamMember = ({
  name,
  url,
  onClick,
  displayStyle,
  faded,
}) => (
  <Fade in={!faded} timeout={1000}>
    <div className={`team-member ${displayStyle} col-md-3`} onClick={() => onClick(name)}>
      <img src={url} alt={'team member'}/>
      <strong className="name"> {name} </strong>
    </div>
  </Fade>
);

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  displayStyle: PropTypes.string,
};

export default TeamMember;

