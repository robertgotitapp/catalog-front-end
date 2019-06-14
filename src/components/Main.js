import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import AddCategory from './AddCategory';
import AddItem from './AddItem';
import ItemDetail from './ItemDetail';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/newcategory' component={AddCategory} />
        <Route path='/items/:id' component={ItemDetail} />
        <Route path='/categories/:id/items/:pageNumber' component={Home} />
      </div>
    );
  }
}

export default Main;
