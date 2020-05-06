import React from "react";
import '../StockCard.css';

const StockCard = ({stock}) => {

    const stockPrice = stock.c.toFixed(2)
    const dollarChange = (stock.c - stock.pc).toFixed(2)
    const percentChange = ((stock.c - stock.pc) * 100 / stock.pc).toFixed(2)
    const directionOfChange = dollarChange > 0 ? '↑' : '↓'

    return(
        <div className="stockcard">
            <h3 className="stockcard-name">
                {stock.n}
            </h3>
            <div className="stockcard-body">
                <span className="current-price">
                    {stockPrice}
                </span>
                <span className="today-change-amount" direction-of-change={directionOfChange}>
                </span>
                <span className="today-change-percent" direction-of-change={directionOfChange}>
                    {dollarChange} ({percentChange})% {directionOfChange}
                </span>
            </div>
        </div>
    )
}

export default StockCard