import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import { removeItem, getItems } from '../actions/items';
import { Item } from './Item';

export class ItemDetail extends Component {
  state = {
    toHome: false,
  }

  deleteItem = (e) => {
    e.preventDefault();
    this.props.removeItem(
      this.props.item.category_id,
      this.props.item.id,
    )
      .then((res) => {
        if (res.statusCode) {
          this.props.getItems(this.props.item.category_id, 0, 100);
        }
      });
    this.setState({ toHome: true });
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to='/' />;
    }

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
        <Link to={`/items/${this.props.item.id}/update`}>
          Update
        </Link>
        <Button onClick={this.deleteItem}>
          Remove
        </Button>
      </div>
    );
  }
}

function mapStateToProps({ itemsReducer }, { match }) {
  const itemId = Number(match.params.id);
  const selectedItem = Object.values(itemsReducer.items)
    .find(item => item.id === itemId);
  return {
    item: selectedItem,
  };
}

const mapDispatchToProps = {
  getItems,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
