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

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        const { id, username } = response.data.user
        this.props.loginUser(username, parseInt(id))
      }
    })
    .then(
      fetch(`http://localhost:3000/stocks`)
      .then(response => {
          return response.json();
      })
      .then(json => {    
        json.forEach(element => {
          if (element.user_id === this.props.user.id) {
            this.props.fetchStock(element.ticker_symbol, element.name, element.purchase_amount, element.purchase_price, element.id)
          }         
        });
      }) 
    )
    .catch(error => console.log('api errors:', error))
  }


  render() {
    return (
      <div>
        <Router>
          <Switch>

            <Route exact path='/'>
              <Home user={this.props.user}/>
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