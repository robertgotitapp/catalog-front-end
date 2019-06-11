import React, { Component } from 'react'
import { signIn } from '../actions/users'
import { connect } from 'react-redux'

class SignInPage extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn({...this.state})
        this.setState({
            username: '',
            password: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        const {username, password} = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type='text' name='username' onChange={this.handleChange} value={username}/>
                    <label>Password</label>
                    <input type='password' name='password' onChange={this.handleChange} value={password}/>
                    <button> Sign In</button>
                </form>
            </div>
        )
    }
}

const mapDispatchtoProps = {
    signIn
}

export default connect(null, mapDispatchtoProps)(SignInPage)

