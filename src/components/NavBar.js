import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions/users';

class NavBar extends Component {
    handleSignOut = (e) => {
      e.preventDefault();
      this.props.signOut();
    }

    render() {
      return (
        <div>
          <button type="submit">
            <Link to='/signin'> Sign In </Link>
          </button>
          <button type="submit">
            <Link to='/signup'> Sign Up </Link>
          </button>
          <button type="submit" onClick={this.handleSignOut}>Sign Out</button>
        </div>
      );
    }
}

const mapDispatchtoProps = {
  signOut,
};

export default connect(null, mapDispatchtoProps)(NavBar);
