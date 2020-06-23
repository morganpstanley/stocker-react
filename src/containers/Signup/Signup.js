import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Signup.css'

class Signup extends Component {

    state = {
        username: '',
        password: '',
        passwordConfirmation: ''
    }

    handleSubmit = event => {
        event.preventDefault();
        axios.post("http://localhost:3000/users", {
            user: {
                username: this.state.username,
                password: this.state.password,
                password_confirmation: this.state.passwordConfirmation
            }
        })
        .then(response => {
            console.log('sweet!', response)
        })
        .catch(error => {
            console.log(error)
        })
    }

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
                            name="passwordConfirmation" 
                            value={this.state.passwordConfirmation} 
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

export default Signup