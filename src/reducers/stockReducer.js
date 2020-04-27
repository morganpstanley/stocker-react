const stocksReducer = (state = { stocks: [], loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_STOCKS':
        return {
          ...state,
          stocks: [...state.stocks],
        }
      case 'ADD_STOCK':
        return {
          ...state,
          stocks: action.stocks,
        }
      default:
        return state;
    }
  }
   
  export default stocksReducer;