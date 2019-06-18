import React, { Component } from 'react';
import { CardGroup, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import CategoryList from './CategoryList';
import ItemList from './ItemList';
import { getItems } from '../actions/items';

class Home extends Component {
  render() {
    return (
      <CardGroup>
        <Col sm={3}>
          <CategoryList />
        </Col>
        <Col sm={9}>
          <ItemList />
        </Col>
      </CardGroup>
    );
  }
}

const mapDispatchToProps = {
  getItems,
};

export default connect(null, mapDispatchToProps)(Home);
