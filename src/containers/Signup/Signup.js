import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import './Signup.css'

class Signup extends Component {


    render() {
        return(
            <div id="signup-page">
                <Header />
                <div id="signup-body">
                    <h1>WELCOME TO STOCKER.</h1>
                    <p>A simple platform to keep track of your stock portfolio. </p>
                    <p>Ready to join? Enter a username and password below. </p>
                    <form>
                        <input type="text" placeholder="name" /> <br />
                        <input type="text" placeholder="password" /> <br />
                        <button>Sign Up</button>
                    </form>
                    <p>Already a member? <Link to="/login">Sign in here.</Link></p>  
                </div>
            </div>
        )
    }
}

export default Signup