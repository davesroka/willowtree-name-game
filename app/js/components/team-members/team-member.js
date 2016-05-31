import React from 'react';

const TeamMember = ({
  name,
  url,
  onClick,
  displayStyle,
}) =>
  <div className={`team-member ${displayStyle}`} onClick={() => onClick(name)}>
    {name}
    <img src={url} alt={'team member'} />
  </div>
  ;

export default TeamMember;
