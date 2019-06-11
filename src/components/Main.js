import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
      </div>
    );
  }
}

export default Main;
