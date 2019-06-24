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
import { getCategories } from '../../actions/categories';
import { PaginationConfig } from '../../utils/const';

class Main extends Component {
  componentDidMount() {
    this.props.loadCurrentUserData();
    this.props.getCategories(0, PaginationConfig.CATEGORIES_PER_PAGE);
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        { this.props.currentLoggedId
          ? (
            <div>
              <Route exact path='/newcategory' component={AddCategory} />
              <Route exact path='/newitem' component={AddItem} />
              <Route exact path='/items/:id/update' component={UpdateItem} />
            </div>
          )
          : (
            <div>
              <Route exact path='/signin' component={SignInPage} />
              <Route exact path='/signup' component={SignUpPage} />
            </div>
          )}
        <Route exact path='/items/:id' component={ItemDetail} />
        <Route exact path='/categories/:categoryId/items/:pageNumber' component={Home} />
        {/* <Redirect from='*' to='/' /> */}
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadCurrentUserData,
  getCategories,
};

function mapStateToProps({ users }) {
  return {
    currentLoggedId: users.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
