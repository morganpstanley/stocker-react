import React, { Component } from 'react';
import StockCard from './StockCard';
import { connect } from "react-redux";
import { fetchStock } from "../fetchStock";

class StockContainer extends Component {

  mapPropstoComponents = () => {
    return(
      this.props.stocks.map(stock => <StockCard stock={stock} />)
    )
  }


  render() {
    return (
      <div>
        {this.mapPropstoComponents()}
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
  return {
    fetchStock: (tickerSymbol) => dispatch(fetchStock(tickerSymbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockContainer);