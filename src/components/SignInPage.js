import React, { Component } from 'react'

class SignInPage extends Component {
    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label for='username'>Username</label>
                    <input type='text' name='username' onChange={this.handleChange}/>
                    <label for='password'>Password</label>
                    <input type='password' name='password' onChange={this.handleChange}/>
                    <button> Sign In</button>
                </form>
            </div>
        )
    }
}

export default SignInPage

