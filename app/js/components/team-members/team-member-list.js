import React, { PropTypes } from 'react';
import TeamMember from 'components/team-members/team-member';

const TeamMemberList = ({ teamMembers, onTeamMemberClick }) => (
  <div className="container">
    {teamMembers.map(teamMember =>
      <TeamMember
        key={teamMember.name}
        {...teamMember}
        onClick={() => onTeamMemberClick(teamMember)}
      />
    )}
  </div>
);

export default TeamMemberList;
