const stocksReducer = (state = { stocks: [], loading: false }, action) => {
  console.log('STATE: ', state, 'ACTION: ', action)
    switch(action.type) {

      case 'LOADING_STOCKS':
        return {
          ...state,
          stocks: [...state.stocks],
        }

      case 'ADD_STOCK':
        return {
          ...state,
          stocks: [...state.stocks, action.stocks]
        }

      case 'ADJUST_PRICE':
        return {
          ...state,
          stocks: state.stocks.map(stock => {
            if (stock.ts === action.stock) {
              return {
                ...stock, c: action.price
              }
            }
              return stock
          })
        }
        
      default:
        return state;
    }
  }
   
  export default stocksReducer;