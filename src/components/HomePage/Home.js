import React, { Component } from 'react';
import { CardGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import CategoryList from './CategoryList';
import ItemList from './ItemList';

export class Home extends Component {
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

export default connect()(Home);
