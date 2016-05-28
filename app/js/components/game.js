import React from 'react';
import TeamMember from 'components/team-member/team-member';

export default class Game extends React.Component {

  render() {
    const teamMembers = [];

    for (let i = 0; i < 11; i++) {
      teamMembers.push(<TeamMember name={`Test Name ${i}`}/>);
    }

    return (
      <div>
        {teamMembers}
      </div>
    );
  }
}