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
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Catalog</Navbar.Brand>
            {
                  this.props.isLoggedIn
                    ? (
                      <Nav className="mr-auto">
                        <Nav.Item className="navItem">
                          <Link to='/'>Home</Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                          <Link to='/newcategory'>Add Category</Link>
                        </Nav.Item>
                        <Nav.Item className="navItem">
                          <Link to='/newitem'>Add Item</Link>
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

function mapStateToProps({ usersReducer }) {
  return {
    isLoggedIn: !!localStorage.getItem('accessToken'),
  };
}

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
