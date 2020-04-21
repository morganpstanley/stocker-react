import React, { Component } from "react";

class StockCard extends Component {

    render() {
        return(
            <div>
                <h3>
                    AAPL
                </h3>
                <div>
                    Current Price: <br/>
                    <span>
                        123.66
                    </span> <br/>
                    Position : <br/>
                    <span>
                        Percent: 2.4%
                        Price: $3.41
                    </span>
                </div>
            </div>
        )
    }
}

export default StockCard