import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { updateItem } from '../actions/items';

export class UpdateItem extends Component {
    state = {
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description,
      toHome: false,
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { name, price, description } = this.state;
      this.props.updateItem(
        this.props.item.category_id,
        this.props.item.id,
        { name, price, description },
      )
        .then((res) => {
          if (res.statusCode) {
            this.setState(prevState => ({ ...prevState, toHome: true }));
          }
        });
    }

    render() {
      const {
        name, price, description, toHome,
      } = this.state;

      if (toHome) {
        return <Redirect to='/' />;
      }

      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Item Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleChange} value={name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item Price</Form.Label>
              <Form.Control type="number" name="price" onChange={this.handleChange} value={price} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                onChange={this.handleChange}
                value={description}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
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
    currentCategory: categoriesReducer.currentCategory,
  };
}

const mapDispatchtoProps = {
  updateItem,
};

export default connect(mapStateToProps, mapDispatchtoProps)(UpdateItem);
