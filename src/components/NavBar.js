import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/users';

export class NavBar extends Component {
    handleSignOut = (e) => {
      e.preventDefault();
      this.props.signOut();
    }

    render() {
      return (
        <div>
          <Navbar bg="light" variant="light">
            <Navbar.Brand>Catalog</Navbar.Brand>
            {
                  this.props.users.access_token !== null
                    ? (
                      <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                          <Link to='/'>Home</Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                          <Link onClick={this.handleSignOut} to='/'>
                        Sign Out
                          </Link>
                        </Nav.Item>
                      </Nav>
                    )
                    : (
                      <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                          <Link to='/'>Home</Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                          <Link to='/signin'>Sign In</Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                          <Link to='/signup'>Sign Up</Link>
                        </Nav.Item>
                      </Nav>
                    )
              }
          </Navbar>
        </div>
      );
    }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

const mapDispatchtoProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchtoProps)(NavBar);
