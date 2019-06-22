import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import SignInPage from '../SignInPage/SignInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import Home from '../HomePage/Home';
import AddCategory from '../AddCategoryPage/AddCategory';
import AddItem from '../AddItemPage/AddItem';
import ItemDetail from '../ItemDetailPage/ItemDetail';
import UpdateItem from '../UpdateItemPage/UpdateItem';
import { loadCurrentUserData } from '../../actions/users';

class Main extends Component {
  componentDidMount() {
    this.props.loadCurrentUserData();
  }

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

const mapDispatchToProps = {
  loadCurrentUserData,
};

function mapStateToProps({ users }) {
  return {
    currentLoggedId: users.userId,
  };
}

export default connect(null, mapDispatchToProps)(Main);
