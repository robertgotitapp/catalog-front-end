import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { updateItem, getItems, selectItemPage } from '../../actions/items';
import { PaginationConfig } from '../../utils/const';

export class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name,
      price: this.props.item.price,
      description: this.props.item.description,
      alerts: '',
    };
  }

    validateInput = () => {
      const {
        name, description, price,
      } = this.state;
      const errors = {};
      if (name.length <= 5) {
        errors.name = 'Name must be longer than 5 characters.';
      }
      if (description.length > 200) {
        errors.description = 'Description must be within 200 characters.';
      }
      if (price <= 0) {
        errors.price = 'Price must be positive number.';
      }
      if (Object.keys(errors).length !== 0) {
        this.setState({
          alerts: errors,
        });
        return false;
      }
      return true;
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { name, price, description } = this.state;
      if (this.validateInput()) {
        this.props.updateItem(
          this.props.item.category_id,
          this.props.item.id,
          { name, price, description },
        )
          .then((res) => {
            if (res.statusCode) {
              this.props.selectItemPage(PaginationConfig.DEFAULT_PAGE);
              const limit = PaginationConfig.ITEMS_PER_PAGE;
              this.props.getItems(this.props.currentCategory,
                PaginationConfig.DEFAULT_OFFSET, limit);
              this.props.history.push('/');
            } else {
              this.setState({
                alerts: res.errors.message,
              });
            }
          });
      }
    }

    render() {
      const {
        name, price, description,
      } = this.state;

      return (
        <div>
          <h2>Update Item</h2>
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
          {
            // Loop through alerts dictionary and display an alert for each
            // of one item in dictionary
            this.state.alerts
            && Object.keys(this.state.alerts).map((key, id) => (
              <Alert key={id} variant='danger'>
                {key}
                :
                {this.state.alerts[key]}
              </Alert>
            ))
          }
        </div>
      );
    }
}

function mapStateToProps({ items, categories }, { match }) {
  const itemId = Number(match.params.id);
  const selectedItem = Object.values(items.items)
    .find(item => item.id === itemId);
  return {
    item: selectedItem,
    currentCategory: categories.currentCategory,
  };
}

const mapDispatchtoProps = {
  updateItem,
  getItems,
  selectItemPage,
};

export default connect(mapStateToProps, mapDispatchtoProps)(UpdateItem);
