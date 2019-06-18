import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';
import { signUp, signIn } from '../actions/users';

export class SignUpPage extends Component {
    state = {
      username: '',
      password: '',
      name: '',
      email: '',
      toHome: false,
      toSignIn: false,
      alerts: '',
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
            // If request is successful, proceed to automatically sign in
            this.props.signIn({ username, password })
              .then((nextRes) => {
                // If sign in is successful, relocate to Home page,
                // Otherwise, go to SignIn page
                if (nextRes.statusCode) {
                  this.setState(prevState => ({ ...prevState, toHome: true }));
                } else {
                  this.setState(prevState => ({ ...prevState, toSignIn: true }));
                }
              });
          } else {
            // If sign up request is failed, reset all the form input
            // and display all the error messages as alerts
            res.errorPromise
              .then((error) => {
                this.setState({
                  username: '',
                  password: '',
                  name: '',
                  email: '',
                  toHome: false,
                  toSignIn: false,
                  alerts: error.message,
                });
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
        username, password, name, email, toHome, toSignIn,
      } = this.state;

      if (toHome) {
        return <Redirect to='/' />;
      }
      if (toSignIn) {
        return <Redirect to='/signin' />;
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
  signUp, signIn,
};

export default connect(null, mapDispatchToProps)(SignUpPage);
