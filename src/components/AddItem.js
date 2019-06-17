import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addItem } from '../actions/items';

export class AddItem extends Component {
    state = {
      name: '',
      price: 0,
      description: '',
      selectedCategory: null,
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
      this.props.addItem(selectedCategory, { name, price, description });
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
              <Form.Control type="text" name="description" onChange={this.handleChange} value={description} />
            </Form.Group>
            <Form.Control as='select' onChange={this.selectCategory}>
              {
                this.props.categories.map(category => (
                  <option
                    key={category.id}
                    value={category.id}
                    name={category.id}
                  >
                    {category.name}
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
    categories: categoriesReducer.categories,
    // categories: [
    //   {
    //     updated: '2019-06-12T03:17:40+00:00',
    //     id: 1,
    //     name: 'fdafdsafdsa',
    //     description: 'fsfdfdfasdf',
    //     created: '2019-06-12T03:17:40+00:00',
    //   },
    //   {
    //     updated: '2019-06-13T14:32:34+00:00',
    //     id: 2,
    //     name: 'hasds',
    //     description: 'This is actually my favorite category',
    //     created: '2019-06-13T14:32:34+00:00',
    //   },
    // ],
  };
}

const mapDispatchtoProps = {
  addItem,
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddItem);
