import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from './components/Header'
import StockContainer from './components/StockContainer';
import Dashboard from './components/Dashboard'

import './App.css';

class App extends Component {

  ownedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares > 0)
  }

  watchedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares === undefined)
  }


  render() {
    return (
      <div className="app">
        <Header />
        <Dashboard stocks={this.ownedStocks()}/>
        <StockContainer stocks={this.ownedStocks()}/>
        <StockContainer stocks={this.watchedStocks()}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps)(App);
