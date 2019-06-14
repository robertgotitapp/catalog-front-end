import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateItem, removeItem } from '../actions/items';

export class ItemDetail extends Component {
  render() {
    return (
      <div>
        {item.name}
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer }, { match }) {
  return {
    item: itemsReducer.items[match.params.id],
  };
}

const mapDispatchToProps = {
  updateItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
