import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { updateItem, removeItem } from '../actions/items';

export class ItemDetail extends Component {
  deleteItem = (e) => {
    e.preventDefault();
    this.props.removeItem(
      this.props.item.category_id,
      this.props.item.id,
    );
  }

  render() {
    return (
      <div>
        <p>
          {this.props.item.name}
        </p>
        <p>
          Price:
          {this.props.item.price}
        </p>
        <p>
          Description:
          {this.props.item.description}
        </p>
        <Link to={`/items/${this.props.itemId}/update`}>
          Update
        </Link>
        <Button onClick={this.deleteItem}>
            Remove
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer, usersReducer }, { match }) {
  const itemId = match.params.id;
  return {
    itemId,
    item: itemsReducer.items[itemId],
    usersReducer,
  };
}

const mapDispatchToProps = {
  updateItem,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
