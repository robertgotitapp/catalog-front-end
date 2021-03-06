import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { addItem } from '../../actions/items';

export class AddItem extends Component {
    state = {
      name: '',
      price: 0,
      description: '',
      selectedCategory: 1,
      alerts: '',
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
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

    handleSubmit = (e) => {
      const {
        name, price, description, selectedCategory,
      } = this.state;
      e.preventDefault();
      if (this.validateInput()) {
        this.props.addItem(selectedCategory, { name, price, description })
          .then((res) => {
            if (res.statusCode) {
              this.props.history.push('/categories/1/items/1');
            } else {
              this.setState({
                alerts: res.errors.message,
              });
            }
          });
      }
    }

    selectCategory = (e) => {
      e.preventDefault();
      const categoryChosen = e.target.value;
      this.setState(prevState => ({
        ...prevState,
        selectedCategory: categoryChosen,
      }));
    }

    render() {
      const {
        name, price, description,
      } = this.state;

      return (
        <div>
          <h2>Add Item</h2>
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
              <Form.Control type="text" name="description" onChange={this.handleChange} value={description} />
            </Form.Group>
            <Form.Control as="select" name="selectedCategory" onChange={this.selectCategory}>
              {
                this.props.categoryIds.map(key => (
                  <option
                    key={key}
                    value={key}
                  >
                    {this.props.categories[key].name}
                  </option>
                ))
              }
            </Form.Control>
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

function mapStateToProps({ categories }) {
  return {
    categoryIds: Object.keys(categories.categories),
    categories: categories.categories,
  };
}

const mapDispatchtoProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddItem);
