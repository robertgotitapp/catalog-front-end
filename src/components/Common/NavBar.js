import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/users';
import Logo from '../../static/images/logo.jpeg';

export class NavBar extends Component {
    handleSignOut = (e) => {
      e.preventDefault();
      this.props.signOut();
      this.props.history.push('/categories/1/items/1');
    }

    render() {
      return (
        <div>
          <Navbar bg="light" variant="light">
            <Navbar.Brand>
              <img
                alt="Got It Logo"
                src={Logo}
                className="d-inline-block align-top logo"
              />
            </Navbar.Brand>
            {
              this.props.currentLoggedId
                ? (
                  <Nav className="mr-auto">
                    <Nav.Item className="navItem">
                      <Link name='home' to='/categories/1/items/1'>Home</Link>
                    </Nav.Item>
                    <Nav.Item className="navItem">
                      <Link name='addcategory' to='/newcategory'>Add Category</Link>
                    </Nav.Item>
                    <Nav.Item className="navItem">
                      <Link name='additem' to='/newitem'>Add Item</Link>
                    </Nav.Item>
                    <Nav.Item className="navItem">
                      <Link name='signout' onClick={this.handleSignOut} to='/categories/1/items/1'>
                    Sign Out
                      </Link>
                    </Nav.Item>
                  </Nav>
                )
                : (
                  <Nav className="mr-auto">
                    <Nav.Item className="navItem">
                      <Link name='home' to='/categories/1/items/1'>Home</Link>
                    </Nav.Item>
                    <Nav.Item className="navItem">
                      <Link name='signin' to='/signin'>Sign In</Link>
                    </Nav.Item>
                    <Nav.Item className="navItem">
                      <Link name='signup' to='/signup'>Sign Up</Link>
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
    currentLoggedId: users.userId,
  };
}

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
