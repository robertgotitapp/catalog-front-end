import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { Link } from 'react-router-dom';
import { getCategories, selectCurrentCategory } from '../actions/categories';
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
        <Card>
          <Card.Body>
            <Card.Title>Categories</Card.Title>
          </Card.Body>
        </Card>
        <ListGroup>
          { this.props.categories.map(category => (
            <ListGroupItem key={category.id}>
              <Category category={category} />
            </ListGroupItem>
          ))
        }
        </ListGroup>
        <Link to='/newcategory'>
          Add Category
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ categoriesReducer }) {
  return {
    categories: categoriesReducer.categories,
  };
}

const mapDispatchToProps = {
  getCategories,
  selectCurrentCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
