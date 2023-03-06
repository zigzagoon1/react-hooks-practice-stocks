import React from "react";
import Stock from "./Stock";

function StockContainer( {stocks, updateStocks} ) {
  function handleClick(stock) {
    const available = 'available';
    updateStocks(stock, available);
  }
  const stockElements = stocks.map((stock) => {
    return <Stock key={stock.id} id={stock.id} ticker={stock.ticker} name={stock.name} type={stock.type} price={stock.price} onClick={handleClick}/>
  })
  return (
    <div>
      <h2>Stocks</h2>
      {stockElements}
    </div>
  );
}

export default StockContainer;
