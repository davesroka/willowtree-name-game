import React from 'react';

import Hello from 'components/hello.js';
import World from 'components/world.js';

export default class HelloWorld extends React.Component {

  render() {
    return (
      <div>
        <h1>WillowTree name game</h1>
        {this.props.children}
      </div>
    );
  }
}
