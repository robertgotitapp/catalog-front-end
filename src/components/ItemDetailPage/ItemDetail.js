import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { removeItem, getItems } from '../../actions/items';
import { PaginationConfig } from '../../utils/const';

export class ItemDetail extends Component {
  state = {
    alerts: '',
  }

  deleteItem = (e) => {
    e.preventDefault();
    this.props.removeItem(
      this.props.item.category_id,
      this.props.item.id,
    )
      .then((res) => {
        if (res.statusCode) {
          // If request is successful, go to Home page
          this.props.getItems(
            this.props.selectedCategory,
            PaginationConfig.DEFAULT_OFFSET,
            PaginationConfig.ITEMS_PER_PAGE,
          );
          this.props.history.push(`/categories/${this.props.selectedCategory}/items/1`);
        } else {
          this.setState({
            alerts: res.errors.description,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <p name='name'>
          {this.props.item.name}
        </p>
        <p name='price'>
          Price:
          {this.props.item.price}
        </p>
        <p name='description'>
          Description:
          {this.props.item.description}
        </p>
        { this.props.isAuthorized
        && (
        <div>
          <Link
            name='updateLink'
            to={`/items/${this.props.item.id}/update`}
          >
          Update
          </Link>
          <Button
            name='removeBtn'
            onClick={this.deleteItem}
          >
          Remove
          </Button>
        </div>
        )
        }
        {
          this.state.alerts
          && (
          <Alert variant='danger'>
            {this.state.alerts}
          </Alert>
          )
        }
      </div>
    );
  }
}

function mapStateToProps({ items, categories, users }, { match }) {
  const itemId = Number(match.params.id);
  const selectedItem = Object.values(items.items)
    .find(item => item.id === itemId);
  const isAuthorized = Number(users.userId) === selectedItem.user_id;
  return {
    item: selectedItem,
    selectedCategory: categories.currentCategory,
    isAuthorized,
  };
}

const mapDispatchToProps = {
  getItems,
  removeItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
