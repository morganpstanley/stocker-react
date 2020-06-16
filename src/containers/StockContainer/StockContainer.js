import React, { Component } from 'react';
import StockCard from '../../components/StockCard/StockCard';

import './StockContainer.css'

class StockContainer extends Component {

  mapPropsToComponents = () => {
    return(
      this.props.stocks.map(stock => <StockCard stock={stock} />)
    )
  }

  render() {
    return (
      <div>
         <span class="stock-container-title">{this.props.stockType}</span>
        <div className="stock-container">
          {this.mapPropsToComponents()}
        </div>
      </div>
    );
  }
}

export default StockContainer;