import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStock } from '../../actions/fetchStock'

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
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
            </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return({
      fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(App);