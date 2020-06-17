import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from '../Header/Header'
import StockContainer from '../../containers/StockContainer/StockContainer';
import Dashboard from '../../containers/Dashboard/Dashboard'

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

export default connect(mapStateToProps)(App);
