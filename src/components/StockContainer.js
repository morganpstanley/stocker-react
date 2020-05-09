import React, { Component } from 'react';
import StockCard from './StockCard';
import { connect } from "react-redux";

class StockContainer extends Component {

  mapPropsToComponents = () => {
    console.log(this.props.stocks)
    return(
      this.props.stocks.map(stock => <StockCard stock={stock} />)
    )
  }

  render() {
    return (
      <div>
        {this.mapPropsToComponents()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  }
}

export default connect(mapStateToProps)(StockContainer);