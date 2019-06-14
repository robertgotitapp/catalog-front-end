import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Item from './Item';

export class ItemList extends Component {
  // state = { loading: true };

  render() {
    // if (this.state.loading === true) {
    //   return <div className='loader'> ...loading </div>;
    // }

    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Items</Card.Title>
          </Card.Body>
          { this.props.itemIds.map(id => (
            <Item key={id} id={id} />
          ))
          }
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer }) {
  const itemIds = Object.keys(itemsReducer.items);
  return {
    itemIds,
  };
}

export default connect(mapStateToProps)(ItemList);
