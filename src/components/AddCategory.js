import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { addCategory } from '../actions/categories';

export class AddCategory extends Component {
    state = {
      name: '',
      description: '',
      toHome: false,
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const { name, description } = this.state;
      this.props.addCategory({ name, description })
        .then((res) => {
          if (res.statusCode) {
            this.setState(prevState => ({ ...prevState, toHome: true }));
          }
        });
    }

    render() {
      const { name, description } = this.state;

      if (this.state.toHome) {
        return <Redirect to='/' />;
      }

      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Category Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleChange} value={name} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category Description</Form.Label>
              <Form.Control type="text" name="description" onChange={this.handleChange} value={description} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
}

function mapStateToProps({ usersReducer }) {
  return {
    users: usersReducer,
  };
}

const mapDispatchToProps = {
  addCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
