import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from '../../components/Header/Header'
import StockContainer from '../StockContainer/StockContainer';
import Dashboard from '../Dashboard/Dashboard'

import './Home.css';

class Home extends Component {

  ownedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares > 0)
  }

  watchedStocks = () => {
    return this.props.stocks.filter(stock => stock.amountOfShares === null)
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
    stocks: state.stocksReducer.stocks
  }
}

export default connect(mapStateToProps)(Home);
