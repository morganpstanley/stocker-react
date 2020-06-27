import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addUser } from '../../actions/addUser'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import './Login.css'
import axios from 'axios'

class Login extends Component {

  state = { 
    username: '',
    password: '',
    password_confirmation: '',
    errors: ''
  };

  componentDidMount = () => {
    return this.props.loggedInStatus ? this.redirect() : null
  }
  
  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()

    const {username, password} = this.state

    let user = {
      username: username,
      password: password,
    }
 
    axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
    .then(response => {
      console.log(response)
      if (response.data.logged_in) {
        console.log('get here>', response.data.user)
        this.props.addUser(response.data.user.username, response.data.user.id)
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }


  render() {
    return(
      <div id='login-page'>
          <Header />
          <div id="login-body">
            <h1>WELCOME.</h1>
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
              <button>Log in</button>
          </form>
            <p>New to Stocker? <Link to="/signup">Create an account.</Link></p>  
          </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return({
      addUser: (username, id) => dispatch(addUser(username, id))
  })
}

export default connect(null, mapDispatchToProps)(Login)