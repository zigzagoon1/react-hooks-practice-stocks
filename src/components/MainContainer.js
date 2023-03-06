import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);

  let stocksToDisplay;

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then(r => r.json())
    .then((stocks) => setStocks(stocks));
  }, [])
  
  function handleUpdateStocks(stock, portfolioOrAvailable) {
    if (portfolioOrAvailable === 'available') {
      const newStocks = stocks.filter((single) => single.id !== stock.id);
      setStocks(newStocks);
      const newPortfolio = [...portfolioStocks, stock];
      setPortfolioStocks(newPortfolio);
    }
    else if (portfolioOrAvailable === 'portfolio') {
      const newStocks = [...stocks, stock];
      setStocks(newStocks);
      const newPortfolio = portfolioStocks.filter((single) => single.id !== stock.id);
      setPortfolioStocks(newPortfolio);
    }
  }
  function handleSort(sortBy) {
    console.log(sortBy);
    if (sortBy === 'Alphabetically') {
      const sortedStocksA = [...stocks].sort((a, b) => {
        if (a.ticker < b.ticker) {
          return -1;
        }
        if (a.ticker > b.ticker) {
          return 1
        }
        return 0;
      })
      setStocks(sortedStocksA);
    }
    else if (sortBy === 'Price') {
      const sortedStocksP = [...stocks].sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
      console.log(sortedStocksP);
      setStocks(sortedStocksP);
    }
  }
  function handleFilter(value) {
    if (value ==='All') {
      fetch('http://localhost:3001/stocks')
      .then(r => r.json())
      .then((stocks) => setStocks(stocks));
      stocksToDisplay = null;
    }


    stocksToDisplay = [...stocks].filter((stock) => stock.type === value);
    setStocks(stocksToDisplay);
    
  }
  return (
    <div>
      <SearchBar onSortChange={handleSort} onFilterChange={handleFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocksToDisplay ? stocksToDisplay : stocks} updateStocks={handleUpdateStocks}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} updateStocks={handleUpdateStocks}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
