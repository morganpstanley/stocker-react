import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Signup.css'
import { withRouter } from 'react-router-dom'

class Signup extends Component {

  state = {
      username: '',
      password: '',
      password_confirmation: ''
  }

  componentDidMount = () => {
    return this.props.loggedInStatus ? this.redirect() : null
  }

  handleSubmit = (event) => {
    console.log('im going try')
    event.preventDefault()
    const {username, password_confirmation, password} = this.state

    let user = {
      username: username,
      password_confirmation: password_confirmation,
      password: password
    }
      
    axios.post("http://localhost:3000/users", {user}, {withCredentials: true})
    .then(response => {
      console.log('deeper')
      console.log('here:', response.data)
      if (response.data.status === 'created') {
        this.props.history.push('/')
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
    };

  handleChange = event => {
    console.log(event.target.value)

    this.setState({
      [event.target.name]: event.target.value
    })

    console.log('state: ', this.state)
  }


  render() {
    return(
      <div id="signup-page">
        <Header />
        <div id="signup-body">
          <h1>WELCOME TO STOCKER.</h1>
          <p>A simple platform to keep track of your stock portfolio. </p>
          <p>Ready to join? Enter a username and password below. </p>
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text" 
              placeholder="username" 
              name="username" 
              value={this.state.username} 
              onChange={this.handleChange} 
              required
            /> <br />
            <input 
              type="text" 
              placeholder="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleChange} 
              required
            /> <br />
            <input 
              type="text" 
              placeholder="confirm password" 
              name="password_confirmation" 
              value={this.state.password_confirmation} 
              onChange={this.handleChange} 
              required
              /> <br />
              <button>Sign Up</button>
          </form>
          <p>Already a member? <Link to="/login">Sign in here.</Link></p>  
        </div>
      </div>
    )
  }
}

export default withRouter(Signup)