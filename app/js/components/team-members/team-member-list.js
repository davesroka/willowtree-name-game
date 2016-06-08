import React, { PropTypes } from 'react';
import TeamMember from 'components/team-members/team-member';
import LoadingSpinner from 'components/loading-spinner';

const TeamMemberList = ({
  teamMembers,
  onTeamMemberClick,
}) => {
  const teamMemberList = (teamMembers) ? teamMembers.map(teamMember =>
    <TeamMember
      key={teamMember.name}
      {...teamMember}
      onClick={() => onTeamMemberClick(teamMember)}
    />
  ) : <LoadingSpinner />;

  return (
    <div className="team-member-list">
      {teamMemberList}
    </div>
  );
};

TeamMemberList.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  onTeamMemberClick: PropTypes.func.isRequired,
};

export default TeamMemberList;
