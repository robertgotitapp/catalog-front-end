import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categories';
import Category from './Category';
import { CategoriesAction } from '../utils/const';

export class CategoryList extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props.getCategories(0, 100)
      .then((res) => {
        if (res.actionType === CategoriesAction.GET_CATEGORIES_SUCCESS) {
          this.setState({ loading: false });
        }
      });
  }

  render() {
    if (this.state.loading === true) {
      return <div className='loader'> ...loading </div>;
    }

    return (
      <div>
        { this.props.categoriesIds.map(id => (
          <Category key={id} id={id} />
        ))
        }
      </div>
    );
  }
}

function mapStateToProps({ categoriesReducer }) {
  const categoriesIds = Object.keys(categoriesReducer.categories);
  return {
    categoriesIds,
  };
}

const mapDispatchToProps = {
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
