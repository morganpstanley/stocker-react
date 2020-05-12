
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStock } from "../fetchStock";

import AsyncSelect from 'react-select/async';

class AddStockForm extends Component {

    state = {
        inputValue: '',
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
            console.log('State.stockArray: ', this.state.stockArray)
        })
    }

    filterStocks = (inputValue) => {
        const returnArray = this.state.stockArray.filter(stock =>
          stock.label.toLowerCase().includes(inputValue.toLowerCase())
        )
        if (returnArray.length > 100) {
            return returnArray.slice(0, 100)
        }
        return returnArray;
      };
      
    loadOptions = (inputValue, callback) => {
        setTimeout(() => {
          callback(this.filterStocks(inputValue));
        }, 1000);
    };
      
    handleInputChange = (inputValue) => {
        this.setState({ inputValue });
        return inputValue;
    };

    handleSubmit = event => {
        event.preventDefault()
        console.log('THIS ST: ', this.state)
        this.props.fetchStock(this.state.tickerSymbol, this.state.companyName, this.state.amountOfShares, this.state.costPerShare)
    }

    handleSelectChange = event => {
        console.log(event.value)
        this.setState({
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
            <div className='stockcard' id='add-stock-form'>
                <h3>ADD STOCK</h3>
                <form onSubmit={this.handleSubmit}>
                    <AsyncSelect
                       loadOptions={this.loadOptions}
                       defaultOptions
                       onInputChange={this.handleInputChange}
                       onChange={this.handleSelectChange}
                       className='dropdown-menu'
                     />
                     <label>
                    Quantity: <br />
                    <input type="text" name="amountOfShares" value={this.state.amountOfShares} onChange={this.handleQuantityOrPriceChange} />
                    </label> <br />
                    <label>
                    Price: <br />
                    <input type="text" name="costPerShare" value={this.state.costPerShare} onChange={this.handleQuantityOrPriceChange} />
                    </label>
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
