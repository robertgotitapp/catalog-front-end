import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Item from './Item';

export class ItemList extends Component {
  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Items</Card.Title>
          </Card.Body>
          { this.props.itemIds.map(id => (
            <Link key={id} to={`/items/${id}`}>
              <Item id={id} />
            </Link>
          ))
          }
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer }) {
  return {
    itemIds: Object.keys(itemsReducer.items),
  };
}

export default connect(mapStateToProps)(ItemList);
