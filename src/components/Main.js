import React, { Component } from 'react'
import NavBar from './NavBar'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import { Route } from 'react-router-dom'

class Main extends Component{
  render() {
    return (
      <div>
        <NavBar />
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
      </div>
    )
  }
}

export default Main
