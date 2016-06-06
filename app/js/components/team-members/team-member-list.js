import React, { PropTypes } from 'react';
import TeamMember from 'components/team-members/team-member';

const TeamMemberList = ({ teamMembers, onTeamMemberClick }) => (
  <div>
    {teamMembers.map(teamMember =>
      <TeamMember
        key={teamMember.name}
        {...teamMember}
        onClick={() => onTeamMemberClick(teamMember)}
      />
    )}
  </div>
);

TeamMemberList.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTeamMemberClick: PropTypes.func.isRequired,
};

export default TeamMemberList;
