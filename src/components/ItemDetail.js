import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { Link, Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { removeItem, getItems, selectItemPage } from '../actions/items';

export class ItemDetail extends Component {
  state = {
    toHome: false,
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
          this.props.selectItemPage(1);
          const limit = 10;
          this.props.getItems(this.props.selectedCategory.id, 0, limit);
          this.setState({ toHome: true });
        } else {
          // if request is not successful, display error message
          res.errorPromise
            .then((error) => {
              console.log(error);
              this.setState({
                toHome: false,
                alerts: error.description,
              });
            });
        }
      });
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

function mapStateToProps({ itemsReducer, categoriesReducer }, { match }) {
  const itemId = Number(match.params.id);
  const selectedItem = Object.values(itemsReducer.items)
    .find(item => item.id === itemId);
  return {
    item: selectedItem,
    selectedCategory: categoriesReducer.currentCategory,
    currentPage: itemsReducer.currentPage,
  };
}

const mapDispatchToProps = {
  getItems,
  removeItem,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
