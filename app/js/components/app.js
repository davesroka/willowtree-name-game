import React from 'react';
import { connect } from 'react-redux';

import { fetchTeamMembers } from 'actions/name-game-actions';

import Hello from 'components/hello.js';
import World from 'components/world.js';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <h1>WillowTree name game</h1>
        {this.props.children}
      </div>
    );
  }
}

export default App;

