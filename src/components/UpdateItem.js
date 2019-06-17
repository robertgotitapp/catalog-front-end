import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { updateItem } from '../actions/items';

export class UpdateItem extends Component {
    state = {
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description,
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.updateItem(this.props.item.category_id, this.props.item.id, { ...this.state });
    }

    render() {
      const { name, price, description } = this.state;

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

function mapStateToProps({ itemsReducer }, { match }) {
  const itemId = Number(match.params.id);
  const selectedItem = Object.values(itemsReducer.items)
    .find(item => item.id === itemId);
  return {
    item: selectedItem,
  };
}

const mapDispatchtoProps = {
  updateItem,
};

export default connect(mapStateToProps, mapDispatchtoProps)(UpdateItem);
