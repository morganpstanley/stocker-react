const stocksReducer = (state = { stocks: [], loading: false }, action) => {
    switch(action.type) {
      case 'LOADING_STOCKS':
        return {
          ...state,
          stocks: [...state.stocks],
          loading: true
        }
      case 'ADD_STOCKS':
        return {
          ...state,
          stocks: action.stocks,
          loading: false
        }
      default:
        return state;
    }
  }
   
  export default stocksReducer;