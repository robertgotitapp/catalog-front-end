import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { signIn, getUserData, loadCurrentUserData } from '../../actions/users';

export class SignInPage extends Component {
    state = {
      username: '',
      password: '',
      alerts: '',
    }

    validateInput = () => {
      const {
        username, password,
      } = this.state;
      const errors = {};
      if (username.length <= 5) {
        errors.username = 'Please enter valid username';
      }
      if (password.length <= 8) {
        errors.password = 'Please enter valid password';
      }
      if (Object.keys(errors).length !== 0) {
        this.setState({
          alerts: 'Please enter valid credentails.',
        });
        return false;
      }
      return true;
    }

    handleSubmit = (e) => {
      const { username, password } = this.state;

      e.preventDefault();
      if (this.validateInput()) {
        this.props.signIn({ username, password })
          .then((res) => {
          // If request is successful, return to Home page
            if (res.statusCode) {
              this.props.getUserData()
                .then((nextRes) => {
                  if (nextRes.statusCode) {
                    this.props.loadCurrentUserData();
                    this.props.history.push('/');
                  }
                });
            } else {
              this.setState({
                username: '',
                password: '',
                alerts: res.errors.description,
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
      const { username, password } = this.state;

      return (
        <div>
          <h2> Sign In</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" name="username" onChange={this.handleChange} value={username} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={this.handleChange} value={password} />
            </Form.Group>
            <Button variant="primary" name="submit" type="submit">
              Submit
            </Button>
          </Form>
          {
            this.state.alerts
            && (
            <Alert variant='danger'>
              {this.state.alerts}
            </Alert>
            )
          }
        </div>
      );
    }
}

const mapDispatchToProps = {
  signIn,
  getUserData,
  loadCurrentUserData,
};

export default connect(null, mapDispatchToProps)(SignInPage);
