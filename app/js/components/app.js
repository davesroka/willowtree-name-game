import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

const App = ({children}) => (
  <div className='container-fluid'>
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <span>WillowTree Name Game</span>
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse >
        <Nav pullRight>
          <NavItem eventKey={1} href="#/settings">Settings</NavItem>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Toggle pullRight/>
    </Navbar>
    <div className="well well-lg">
      {children}
    </div>
  </div>
);

export default App;


