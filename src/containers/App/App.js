import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStock } from '../../actions/fetchStock'
import axios from 'axios'

import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Home from '../Home/Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import history from '../../history'

class App extends Component {

  state = { 
      isLoggedIn: false,
      user: {}
  };

  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = ({data}) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
    setTimeout(() => console.log('this.state', this.state), 2000)
  }

  handleLogout = () => {
    console.log('logging out')
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route 
              exact path='/' 
              render={props => (
              <Home {...props} user={this.state.user} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
              )}
            />
            <Route 
              exact path='/login' 
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocksReducer.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return({
      fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);