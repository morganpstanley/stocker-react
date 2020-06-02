import React, { Component } from 'react';
import StockCard from './StockCard';

class StockContainer extends Component {

  mapPropsToComponents = () => {
    return(
      this.props.stocks.map(stock => <StockCard stock={stock} />)
    )
  }

  render() {
    return (
      <div className="stock-container">
        {this.mapPropsToComponents()}
      </div>
    );
  }
}

export default StockContainer;