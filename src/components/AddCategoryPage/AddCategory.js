import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { addCategory } from '../../actions/categories';

export class AddCategory extends Component {
    state = {
      name: '',
      description: '',
      alerts: {},
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    validateInput = () => {
      const {
        name, description,
      } = this.state;
      const errors = {};
      if (name.length <= 5) {
        errors.name = 'Name must be longer than 5 characters.';
      }
      if (description.length > 200) {
        errors.description = 'Description must be within 200 characters.';
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
      e.preventDefault();
      const { name, description } = this.state;
      if (this.validateInput()) {
        this.props.addCategory({ name, description })
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

    render() {
      const { name, description } = this.state;

      return (
        <div>
          <h2> Add Category </h2>
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

function mapStateToProps({ users }) {
  return {
    users,
  };
}

const mapDispatchToProps = {
  addCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
