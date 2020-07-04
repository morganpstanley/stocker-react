import React, { Component } from "react"
import { connect } from 'react-redux'
import './Header.css'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { logoutUser } from '../../actions/logoutUser'

class Header extends Component {

    handleClick = () => {
    console.log('going to log out')
    return axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
        this.props.history.push('/login')
        window.location.reload()
    })
    .catch(error => console.log(error))
    }

    render() {
        return (
            <h1 id="header">
                <span id='logo'>
                    <span id="logo-stock">STOCK</span><span id="logo-er">ER</span>
                </span>
                <span id="nav">
                        <button onClick={this.handleClick}>
                            Logout
                        </button>
                </span>
            </h1>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        logoutUser: () => dispatch(logoutUser())
    })
  }

export default withRouter(connect(null, mapDispatchToProps)(Header))