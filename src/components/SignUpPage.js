import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signUp } from '../actions/users';

class SignUpPage extends Component {
    state = {
      username: '',
      password: '',
      name: '',
      email: '',
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.signUp({ ...this.state });
      this.setState({
        username: '',
        password: '',
        name: '',
        email: '',
      });
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
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleChange} value={username} />
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} value={password} />
            <label>Email</label>
            <input type="text" name="email" onChange={this.handleChange} value={email} />
            <label>Name</label>
            <input type="text" name="name" onChange={this.handleChange} value={name} />
            <button type="submit"> Sign Up </button>
          </form>
        </div>
      );
    }
}

const mapDispatchtoProps = {
  signUp,
};

export default connect(null, mapDispatchtoProps)(SignUpPage);
