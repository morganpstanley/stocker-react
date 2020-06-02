
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStock } from "../fetchStock";

import AsyncSelect from 'react-select/async';


class AddStockForm extends Component {

    state = {
        value: '',
        tickerSymbol: '',
        companyName: '',
        stockArray: [],
        amountOfShares: 0,
        costPerShare: 0,
    }

    componentDidMount() {
        return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqfppqvrh5r9oe99locg')
        .then(response => {
            return response.json()
        })
        .then(json => {
            this.setState({
                stockArray: json.map(stock => { 
                    return { value: stock.displaySymbol, label: stock.description}
                })
            })
        })
    }

    filterStocks = (value) => {
        const returnArray = this.state.stockArray.filter(stock =>
          stock.label.toLowerCase().includes(value.toLowerCase())
        )
        if (returnArray.length > 100) {
            return returnArray.slice(0, 100)
        }
        return returnArray;
      };
      
    loadOptions = (value, callback) => {
        setTimeout(() => {
          callback(this.filterStocks(value));
        }, 1000);
    };

    handleSubmit = event => {
        event.preventDefault()

        const amountOfShares = (isNaN(this.state.amountOfShares) || this.state.amountOfShares === 0) ? undefined : this.state.amountOfShares
        const costPerShare = (isNaN(this.state.costPerShare) || this.state.costPerShare === 0) ? undefined : this.state.costPerShare
        if (this.state.tickerSymbol !== "" && this.state.companyName !== "") {
            this.props.fetchStock(this.state.tickerSymbol, this.state.companyName, amountOfShares, costPerShare)
        } else {
            alert('Error - Please select a stock.')
        }

        this.setState({
            value: '',
            tickerSymbol: '',
            companyName: '',
            stockArray: [],
            amountOfShares: 0,
            costPerShare: 0,
        })
    }

    handleSelectChange = event => {
        this.setState({
            value: event.label,
            tickerSymbol: event.value,
            companyName: event.label
        })
    }

    handleQuantityOrPriceChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    render () {
        return (
            <div className="dashboard-part" id='add-stock-form'>
                <h3>ADD STOCK</h3>
                <form onSubmit={this.handleSubmit}>
                    <AsyncSelect
                        value={this.state.value}
                        placeholder={this.state.value || 'Select...'}
                        loadOptions={this.loadOptions}
                        defaultOptions={true}
                        onChange={this.handleSelectChange}
                        onBlur={() => (event) => {event.preventDefault()}}
                        classNamePrefix="react-select"
                     />
                    <span id="stock-purchase-quantity">Quantity:</span> <span id="stock-purchase-price">Price:</span> <br />
                    <input type="text" name="amountOfShares" value={this.state.amountOfShares} onChange={this.handleQuantityOrPriceChange} />
                    <input type="text" name="costPerShare" value={this.state.costPerShare} onChange={this.handleQuantityOrPriceChange} />
                    
                    <br />
                    
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return({
        fetchStock: (tickerSymbol, companyName, amountOfShares, costPerShare) => dispatch(fetchStock(tickerSymbol, companyName, amountOfShares, costPerShare))
    })
}

export default connect(null, mapDispatchToProps)(AddStockForm)
