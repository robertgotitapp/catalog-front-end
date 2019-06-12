import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import AddCategory from './AddCategory';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/newcategory' component={AddCategory} />
        <Route exact path='/' component={Home} />
      </div>
    );
  }
}

export default Main;
