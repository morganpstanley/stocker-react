
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Select from "react-select"
import AsyncSelect from 'react-select/async';

const options = [
    { value: 'blues', label: 'Blues' },
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'orchestra', label: 'Orchestra' } 
  ];

class AddStockForm extends Component {

    state = {
        stockArray: [],
        limitedStockArray: [1, 2],
        searchTerm: ''
    }

    componentDidMount() {
        return fetch('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bqfppqvrh5r9oe99locg')
        .then(response => {
            return response.json()
        })
        .then(json => {
            this.setState({
                stockArray: json.map(stock => stock.description)
            })
            console.log('STOCK ARRAY: ', this.stockArray)
            console.log('STATE: ', this.state.stockArray)
        })
    }

    onChange(event) {
        console.log(event.target)
    }

    render () {
        return (
            <div className='stockcard'>
                <h3>ADD STOCK</h3>
                <Select value={this.state.searchTerm} onChange={(event) => this.handleChange(event)} options={this.state.limitedStockArray} />
            </div>
        )
    }
}

export default connect()(AddStockForm)
