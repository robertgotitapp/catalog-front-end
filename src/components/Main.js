import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Home from './Home';
import AddCategory from './AddCategory';
import AddItem from './AddItem';
import ItemDetail from './ItemDetail';
import UpdateItem from './UpdateItem';

class Main extends Component {
  // Consider putting getAccessToken here or in NavBar

  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/newcategory' component={AddCategory} />
        <Route path='/newitem' component={AddItem} />
        <Route exact path='/items/:id' component={ItemDetail} />
        <Route exact path='/items/:id/update' component={UpdateItem} />
        <Route exact path='/' component={Home} />
      </div>
    );
  }
}

export default Main;
