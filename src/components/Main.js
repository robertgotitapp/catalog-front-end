import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
        <CategoryList />
        <AddCategory />
      </div>
    );
  }
}

export default Main;
