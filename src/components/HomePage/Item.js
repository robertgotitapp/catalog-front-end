import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';

export class Item extends Component {
  render() {
    return (
      <Card border="dark">
        <Card.Header as="h4" name='name'>{this.props.item.name}</Card.Header>
        <Card.Body name='price'>
          Price: $
          {this.props.item.price}
        </Card.Body>
        <Card.Text name='description'>
          {this.props.item.description}
        </Card.Text>
      </Card>
    );
  }
}

function mapStateToProps({ items }, { id }) {
  return {
    item: items.items[id],
  };
}

export default connect(mapStateToProps)(Item);
