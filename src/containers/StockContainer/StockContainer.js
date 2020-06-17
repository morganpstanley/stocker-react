import React, { Component } from 'react';
import StockCard from '../../components/StockCard/StockCard';
import { connect } from 'react-redux'

import './StockContainer.css'

class StockContainer extends Component {

  mapPropsToComponents = () => {
    return(
      this.props.stocks.map(stock => <StockCard stock={stock} deleteStock={this.deleteStock} key={stock.id} />)
    )
  }

  deleteStock = (stockId) => {
    console.log(stockId)
    this.props.deleteStock(stockId)
  }

  render() {
    return (
      <div>
         <span className="stock-container-title">{this.props.stockType}</span>
        <div className="stock-container">
          {this.mapPropsToComponents()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
      deleteStock: (stockId) => dispatch({type: 'DELETE_STOCK', id:stockId})
  })
}

export default connect(null, mapDispatchToProps)(StockContainer);