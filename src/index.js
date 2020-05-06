import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reduxWebsocket from 'react-redux-websocket';
 

import { Provider } from "react-redux";
import stockReducer from "./reducers/stockReducer";
import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk";
import { fetchStock } from './fetchStock'

const socket = new WebSocket("wss://ws.finnhub.io?token=bqfppqvrh5r9oe99locg");
const store = createStore(stockReducer, applyMiddleware(reduxWebsocket(socket), thunk))

socket.onopen = () => {
  socket.send('{"type":"subscribe","symbol":"AAPL"}')
  socket.send('{"type":"subscribe","symbol":"AMZN"}')
  socket.send('{"type":"subscribe","symbol":"UAL"}')
}

socket.onmessage = event => {

  console.log('SOCKET MESSAGE: ', event)

  let stock = JSON.parse(event.data)
  if (stock.data !== undefined) {  
    store.dispatch({type: 'ADJUST_PRICE', stock: stock.data[0].s, price: stock.data[0].p})
  }
}

store.dispatch(fetchStock('AAPL'))
store.dispatch(fetchStock('AMZN'))
store.dispatch(fetchStock('UAL'))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App socket={socket}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
