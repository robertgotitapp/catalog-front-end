import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddUser } from '../actions/users'

class SignUpPage extends Component {
    state = {
        username: '',
        password: '',
        name: '',
        email: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleAddUser({...this.state})
        this.setState(() => ({
            username: '',
            password: '',
            name: '',
            email: ''
        }))
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
                    <input type='text' name='username' onChange={this.handleChange} />
                    <label for='password'>Password</label>
                    <input type='password' name='password' onChange={this.handleChange} />
                    <label for='email'>Email</label>
                    <input type='text' name='email' onChange={this.handleChange} />
                    <label for='name'>Name</label>
                    <input type='text' name='name' onChange={this.handleChange} />
                    <button> Sign Up </button>
                </form>
            </div>
        )
    }
}

const mapDispatchtoProps = {
    handleAddUser
}

export default connect(null ,mapDispatchtoProps)(SignUpPage)

