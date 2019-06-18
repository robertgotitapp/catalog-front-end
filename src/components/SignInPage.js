import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { signIn } from '../actions/users';

export class SignInPage extends Component {
    state = {
      username: '',
      password: '',
      toHome: false,
      alerts: '',
    }

    handleSubmit = (e) => {
      const { username, password } = this.state;

      e.preventDefault();
      this.props.signIn({ username, password })
        .then((res) => {
          // If request is successful, return to Home page
          if (res.statusCode) {
            this.setState(prevState => ({ ...prevState, toHome: true }));
          } else {
            // if request is not successful, clear out the form
            // and display error message
            res.errorPromise
              .then((error) => {
                this.setState({
                  username: '',
                  password: '',
                  toHome: false,
                  alerts: error.description,
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
      const { username, password, toHome } = this.state;

      if (toHome) {
        return <Redirect to='/' />;
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
};

export default connect(null, mapDispatchToProps)(SignInPage);
