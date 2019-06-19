import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import AddCategory from './AddCategory';
import AddItem from './AddItem';
import ItemDetail from './ItemDetail';
import UpdateItem from './UpdateItem';

class Main extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/signin' component={SignInPage} />
        <Route exact path='/signup' component={SignUpPage} />
        <Route exact path='/newcategory' component={AddCategory} />
        <Route exact path='/newitem' component={AddItem} />
        <Route exact path='/items/:id' component={ItemDetail} />
        <Route exact path='/items/:id/update' component={UpdateItem} />
        <Route exact path='/' component={Home} />
        <Redirect from='*' to='/' />
      </div>
    );
  }
}

export default Main;
