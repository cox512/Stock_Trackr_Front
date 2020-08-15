import React, { useState, useEffect } from 'react';
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import Watchlist from "./Watchlist"
import axios from 'axios';
import "../App.css";

export default function UserPage (props) {

    // const [showNewListForm, setShowNewListForm] = useState(false)
    const [ticker, setTicker] = useState('');
    const [symbol, setSymbol] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [watchlists, setWatchlists] = useState([])
    const [addList, setAddList] = useState(true);

    const handleStockData = (data) => {
        setSymbol(data["Meta Data"]["2. Symbol"]);
        setStockPrice(Object.entries(data["Time Series (1min)"])[0][1]["4. close"]);
    }

    const handleChange = (evt) => {
        setWatchlists(evt.target.value)
    }

    const handleWatchlistSet = () => {
        showWatchlists()
        setAddList(true);
    }

    const showWatchlists = () =>{
        console.log("showWatchlists")
        var config = {
            method: 'GET',
            url: props.baseURL + 'api/v1/watchlists/',
            headers: { 
                'Content-Type': "application.json",
            },
            withCredentials: true,
          };
          axios(config)
          .then((res) => {
            console.log(res.data)
            return res.data;
          })
          .then((data) => {
              console.log(data.data)
                setWatchlists(data.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {
        showWatchlists();
    }, []);


    return (
        <div className="container">
            <div className="stocks-search border">
                <h3>Hello there, {props.currentUser["fname"]}</h3>
                <h4>What company would you like to know more about today?</h4>
                {/* <StockSearch
                    handleChange={props.handleChange}
                    handleStockSearch={props.handleStockSearch}
                    ticker={ticker}
                    handleStockData={handleStockData}
                /> */}
            </div>
            <div className="show-stock border">
                <h3>CURRENT STOCK</h3>
            {stockPrice ? (
                <ShowStock
                    stockPrice={stockPrice}
                    symbol={symbol}
                    baseURL={props.baseURL}
                    watchlists={watchlists}
                    handleChange={handleChange}
                    handleWatchlistSet={handleWatchlistSet}
                    showWatchlists={ showWatchlists }
                    addList={addList}
                    setAddList={setAddList}
                />
            ) : null}
                <StockSearch
                    handleChange={props.handleChange}
                    handleStockSearch={props.handleStockSearch}
                    ticker={ticker}
                    handleStockData={handleStockData}
                />
            </div>
            <div className="watchlist border">
                <Watchlist
                    showWatchlists={showWatchlists}
                    addlist={addList}
                    setAddList={setAddList}
                    watchlists={watchlists}
                    setWatchlists={setWatchlists}
                    symbol={symbol}
                    handleWatchlistSet={handleWatchlistSet}
                    baseURL={props.baseURL}
                    // showNewListForm={showNewListForm}
                    // setShowNewListForm={setShowNewListForm} 
                />
            </div>   
        </div>
    )
}

