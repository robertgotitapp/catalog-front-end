import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import { getCategories } from '../actions/categories';
import Category from './Category';

export class CategoryList extends Component {
  state = { loading: true };

  componentDidMount() {
    this.props.getCategories(0, 100)
      .then((res) => {
        if (res.statusCode) {
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
          { Object.keys(this.props.categories).map(key => (
            <ListGroupItem key={key}>
              <Category category={this.props.categories[key]} />
            </ListGroupItem>
          ))
        }
        </ListGroup>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
