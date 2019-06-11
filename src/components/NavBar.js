import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {

    render() {
        return (
            <div>
                <button> <Link to='/signin'> Sign In </Link> </button>
                <button> <Link to='/signup'> Sign Up </Link> </button>
            </div>
        )
    }
}

export default NavBar