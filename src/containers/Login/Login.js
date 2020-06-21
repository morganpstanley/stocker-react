import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import './Login.css'


class Login extends Component {


    render() {
        return(
            <div id='login-page'>
                <Header />
                <div id="login-body">
                    <h1>WELCOME.</h1>
                    <form>
                        <input type="text" placeholder="name" /> <br />
                        <input type="text" placeholder="password" /> <br />
                        <button>Log in</button>
                    </form>
                    <p>New to Stocker? <Link to="/signup">Create an account.</Link></p>  
                </div>
            </div>
        )
    }
}

export default Login