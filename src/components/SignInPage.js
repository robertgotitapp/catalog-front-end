import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import { signIn } from '../actions/users';

export class SignInPage extends Component {
    state = {
      username: '',
      password: '',
      toHome: false,
    }

    handleSubmit = (e) => {
      const { username, password } = this.state;

      e.preventDefault();
      this.props.signIn({ username, password })
        .then((res) => {
          if (res.statusCode) {
            this.setState(prevState => ({ ...prevState, toHome: true }));
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
        </div>
      );
    }
}

const mapDispatchToProps = {
  signIn,
};

export default connect(null, mapDispatchToProps)(SignInPage);
