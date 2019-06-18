import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import { addCategory } from '../actions/categories';

export class AddCategory extends Component {
    state = {
      name: '',
      description: '',
      toHome: false,
      alerts: '',
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
          } else {
            // If add category request is failed, reset all the form input
            // and display all the error messages as alerts
            res.errorPromise
              .then((error) => {
                this.setState({
                  name: '',
                  description: '',
                  toHome: false,
                  alerts: error.message,
                });
              });
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

function mapStateToProps({ usersReducer }) {
  return {
    users: usersReducer,
  };
}

const mapDispatchToProps = {
  addCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);
