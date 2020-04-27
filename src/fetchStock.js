
export const fetchStock = (tickerSymbol) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_STOCKS'})
        return fetch(`https://finnhub.io/api/v1/quote?symbol=${tickerSymbol}&token=bqfppqvrh5r9oe99locg`)
        .then(response => {
            return response.json();
        })
        .then(json => {

            json.n = tickerSymbol;
            dispatch({ 
                type: 'ADD_STOCK', 
                stocks: json 
            })
        });
    }
}