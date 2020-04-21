import React from 'react';
import './App.css';
import Header from './components/Header'
import StockCard from './components/StockCard';

function App() {
  return (
    <div>
      <Header />
      <StockCard />
      <StockCard />
    </div>
  );
}

export default App;
