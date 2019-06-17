import React, { Component } from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import CategoryList from './CategoryList';
import ItemList from './ItemList';
import { getItems } from '../actions/items';

class Home extends Component {
  render() {
    return (
      <CardGroup>
        <Card>
          <CategoryList />
        </Card>
        <Card>
          <ItemList />
        </Card>
      </CardGroup>
    );
  }
}

const mapDispatchToProps = {
  getItems,
};

export default connect(null, mapDispatchToProps)(Home);
