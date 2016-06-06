import React, { PropTypes } from 'react';

const TeamMember = ({
  name,
  url,
  onClick,
  displayStyle,
}) => (
  <div className={`team-member ${displayStyle}`} onClick={() => onClick(name)}>
    <img src={url} alt={'team member'} />
    <strong className="name"> {name} </strong>
  </div>
);

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  displayStyle: PropTypes.string,
};

export default TeamMember;

