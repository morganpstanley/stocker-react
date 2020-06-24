import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchStock } from '../../actions/fetchStock'

import Header from '../../components/Header/Header'
import StockContainer from '../StockContainer/StockContainer';
import Dashboard from '../Dashboard/Dashboard'

import './Home.css';

class Home extends Component {

  componentDidMount = () => {
      return fetch(`http://localhost:3000/stocks`)
      .then(response => {
          console.log(response)
          return response.json();
      })
      .then(json => {          
          console.log(json) 
          json.forEach(element => {
              this.props.fetchStock(element.ticker_symbol, element.name, element.purchase_amount, element.purchase_price)         
          });
      });
  }

  ownedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares > 0)
  }

  watchedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares === null)
  }


  render() {
    return (
      <div className="app">
        <Header link='/login' title="LOG OUT" />
        <Dashboard stocks={this.ownedStocks()}/>
        <StockContainer stocks={this.ownedStocks()} stockType="OWNED" />
        <StockContainer stocks={this.watchedStocks()} stockType="WATCHED" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
