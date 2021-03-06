import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import {
  signUp, signIn, getUserData, loadCurrentUserData,
} from '../../actions/users';
import { REGEX } from '../../utils/const';

export class SignUpPage extends Component {
    state = {
      username: '',
      password: '',
      name: '',
      email: '',
      alerts: '',
    }

    validateInput = () => {
      const {
        username, password, name, email,
      } = this.state;
      const errors = {};
      if (username.length <= 5) {
        errors.username = 'Username must be at least 5 characters.';
      }
      if (!password.match(REGEX.PASSWORD)) {
        errors.password = 'Password must be longer than 8 characters and have 1 least 1 number and 1 letter';
      }
      if (name.length <= 5) {
        errors.name = 'Name must be at least 5 characters.';
      }
      if (!email.match(REGEX.EMAIL)) {
        errors.email = 'Must be a valid email address';
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
      const {
        username, password, name, email,
      } = this.state;
      if (this.validateInput()) {
        this.props.signUp({
          username, password, name, email,
        })
          .then((res) => {
            if (res.statusCode) {
              // If request is successful, proceed to automatically sign in
              this.props.signIn({ username, password })
                .then((secondRes) => {
                  // If sign in is successful, relocate to Home page,
                  // Otherwise, go to SignIn page
                  if (secondRes.statusCode) {
                    this.props.getUserData()
                      .then((thirdRes) => {
                        if (thirdRes.statusCode) {
                          this.props.loadCurrentUserData();
                          this.props.history.push('/categories/1/items/1');
                        }
                      });
                  } else {
                    this.props.history.push('/signin');
                  }
                });
            } else {
              this.setState({
                alerts: res.errors.message,
              });
            }
          });
      }
    }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    render() {
      const {
        username, password, name, email,
      } = this.state;

      return (
        <div>
          <h2>Sign Up</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                onChange={this.handleChange}
                value={username}
              />
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

const mapDispatchToProps = {
  signUp, signIn, getUserData, loadCurrentUserData,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
