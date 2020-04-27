import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from './components/Header'
import StockContainer from './components/StockContainer';

import './App.css';

class App extends Component {


  render() {
    return (
      <div>
        <Header />
        <StockContainer />
      </div>
    );
  }
}

export default connect()(App);
