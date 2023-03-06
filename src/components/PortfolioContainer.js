import React from "react";
import Stock from "./Stock";

function PortfolioContainer({stocks, updateStocks}) {
  const stockElements = stocks.map((stock) => {
    return <Stock key={stock.id} id={stock.id} ticker={stock.ticker} name={stock.name} 
    type={stock.type} price={stock.price} onClick={handleUpdateStocks} /> 
  })


  function handleUpdateStocks(stock) {
    const portfolio = 'portfolio';
    console.log(stock);
    updateStocks(stock, portfolio)
  }
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        stockElements
      }
    </div>
  );
}

export default PortfolioContainer;
