import React, { Component } from 'react';
import { connect } from "react-redux";
import { loginUser } from '../../actions/loginUser'
import { fetchStock} from '../../actions/fetchStock'
import axios from 'axios'

import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import Home from '../Home/Home'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>

            <Route exact path='/'>
              <Home />
            </Route> 

            <Route exact path='/login'>
              <Login />      
            </Route>

            <Route exact path='/signup'>
              <Signup />
            </Route>
            
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return({
    fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare, id) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare, id)),
    loginUser: (username, id) => dispatch(loginUser(username, id))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);