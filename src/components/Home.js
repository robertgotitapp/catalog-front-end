import React, { Component } from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import CategoryList from './CategoryList';
import ItemList from './ItemList';
import { ItemsAction } from '../utils/const';
import { getItems } from '../actions/items';

class Home extends Component {
  componentDidMount() {
    const offset = this.props.pageNumber * 10;
    const limit = 10;
    this.props.getItems(this.props.categoryId, offset, limit);
  }

  render() {
    return (
      <CardGroup>
        <Card>
          <CategoryList />
        </Card>
        <Card>
          <ItemList pageNumber={this.props.pageNumber} categoryId={this.props.categoryId} />
        </Card>
      </CardGroup>
    );
  }
}

function mapStateToProps({ categoriesReducer }, { match }) {
  return {
    categoryId: match.params.id,
    pageNumber: match.params.pageNumber,
  };
}

const mapDispatchToProps = {
  getItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
