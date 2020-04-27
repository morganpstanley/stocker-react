import React, { Component } from 'react';
import StockCard from './StockCard';
import { connect } from "react-redux";
import { fetchStock } from "../fetchStock";

class StockContainer extends Component {

  componentDidMount() {
    this.props.fetchStock('F')
  }


  render() {
    return (
      <div>
        <StockCard stock={this.props.stock}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stock: state.stocks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchStock: (tickerSymbol) => dispatch(fetchStock(tickerSymbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);