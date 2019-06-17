import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { signUp, signIn } from '../actions/users';

export class SignUpPage extends Component {
    state = {
      username: '',
      password: '',
      name: '',
      email: '',
      toHome: false,
      toSignUp: false,
    }

    handleSubmit = (e) => {
      const {
        username, password, name, email,
      } = this.state;

      e.preventDefault();
      this.props.signUp({
        username, password, name, email,
      })
        .then((res) => {
          if (res.statusCode) {
            this.props.signIn({ username, password })
              .then((nextRes) => {
                if (nextRes.statusCode) {
                  this.setState(prevState => ({ ...prevState, toHome: true }));
                } else {
                  this.setState(prevState => ({ ...prevState, toSignUp: true }));
                }
              });
          }
        });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    render() {
      const {
        username, password, name, email, toHome, toSignUp,
      } = this.state;

      if (toHome) {
        return <Redirect to='/' />;
      }
      if (toSignUp) {
        return <Redirect to='/signup' />;
      }

      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={this.handleChange} value={username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={this.handleChange} value={password} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" name="email" onChange={this.handleChange} value={email} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleChange} value={name} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
}

const mapDispatchToProps = {
  signUp, signIn,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
