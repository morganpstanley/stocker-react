import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStock } from '../../actions/fetchStock'

import Header from '../../components/Header/Header'
import StockContainer from '../StockContainer/StockContainer';
import Dashboard from '../Dashboard/Dashboard'
import axios from 'axios'


import './Home.css';

class Home extends Component {

  state = {
    user: '',
    user_id: ''
  }

  componentDidMount = () => {

    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
       this.setState({
         user: response.data.user.username,
         user_id: response.data.user.id
       })
      } 
    }).then(
      fetch(`http://localhost:3000/stocks`)
      .then(response => {
          return response.json();
      })
      .then(json => {  
        console.log(json)        
          json.forEach(element => {
            console.log('element: ', element, 'user_id: ', this.state)
            if (element.user_id == this.state.user_id) {
              this.props.fetchStock(element.ticker_symbol, element.name, element.purchase_amount, element.purchase_price, element.id)
            }         
          });
      })
    )
  }

  ownedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares > 0)
  }

  watchedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares === null)
  }

  handleLogoutClick = () => {
    console.log('going to log out')
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
    .then(response => {
        console.log(response)
        this.props.history.push('/login')
        this.props.handleLogout()
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="app">
        <Header handleLogoutClick={this.handleLogoutClick} title="LOG OUT" />
        <Dashboard stocks={this.ownedStocks()}/>
        <StockContainer stocks={this.ownedStocks()} stockType="OWNED" />
        <StockContainer stocks={this.watchedStocks()} stockType="WATCHED" />
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
      fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare, id) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare, id))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
