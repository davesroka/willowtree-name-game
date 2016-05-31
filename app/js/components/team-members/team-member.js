import React from 'react';

const TeamMember = ({
  name,
  url,
  onClick,
  displayStyle,
}) =>
  <div className={`team-member ${displayStyle}`} onClick={() => onClick(name) }>
    <img src={url} alt={'team member'} />
    <span className="name"> {name} </span>
  </div>
  ;

export default TeamMember;
