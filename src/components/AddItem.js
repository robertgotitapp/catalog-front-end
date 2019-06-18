import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { addItem } from '../actions/items';

export class AddItem extends Component {
    state = {
      name: '',
      price: 0,
      description: '',
      selectedCategory: null,
      toHome: false,
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      const {
        name, price, description, selectedCategory,
      } = this.state;
      e.preventDefault();
      this.props.addItem(selectedCategory, { name, price, description })
        .then((res) => {
          if (res.statusCode) {
            this.setState(prevState => ({ ...prevState, toHome: true }));
          }
        });
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
              <Form.Control type="text" name="description" onChange={this.handleChange} value={description} />
            </Form.Group>
            <Form.Control as='select' onChange={this.selectCategory}>
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
        </div>
      );
    }
}

function mapStateToProps({ categoriesReducer }) {
  return {
    categoryIds: Object.keys(categoriesReducer.categories),
    categories: categoriesReducer.categories,
  };
}

const mapDispatchtoProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddItem);