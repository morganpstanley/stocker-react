import React, { Component } from "react";
import '../StockCard.css';

class StockCard extends Component {

    render() {
        return(
            <div className="stockcard">
                <h3 className="stockcard-name">
                    AAPL
                </h3>
                <div className="stockcard-body">
                    <span className="current-price">
                        146.94
                    </span>
                    <span className="today-change-amount">
                        -2.2
                    </span>
                    <span className="today-change-percent">
                        (-2.9)% ↓
                    </span>
                </div>
            </div>
        )
    }
}

export default StockCard