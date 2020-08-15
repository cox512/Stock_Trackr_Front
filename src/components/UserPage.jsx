import React, { useState, useEffect } from 'react';
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import Watchlist from "./Watchlist";
import StockList from "./StockList";
import axios from 'axios';
import "../App.css";

export default function UserPage (props) {

    // const [showNewListForm, setShowNewListForm] = useState(false)
    const [ticker, setTicker] = useState('');
    const [symbol, setSymbol] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [watchlists, setWatchlists] = useState([])
    const [addList, setAddList] = useState(true);
    const [eraseWatchlistArray, setEraseWatchlistArray] = useState(false)
    const [showStockArray, setShowStockArray] = useState(false)
    const [stockList, setStockList] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState('')

    const handleStockData = (data) => {
        setSymbol(data["Meta Data"]["2. Symbol"]);
        setStockPrice(Object.entries(data["Time Series (1min)"])[0][1]["4. close"]);
    }

    const handleChange = (evt) => {
        setWatchlists(evt.target.value)
    }

    const handleWatchlistSet = () => {
        // Performs a new GET call to retrieve the new array of watchlists (post-creation of new list)
        showWatchlists()
        setEraseWatchlistArray(true)
    }

    const getStockDetails = () => {

    }

    const showWatchlists = () =>{
        //GET call to get all watchlists from the database. Ends with a setWatchlists call that adds the retrieved lists to the 'watchlists' array in state.
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

    // const handleStockDelete = (watchlistId) => {
    //     console.log("handleDeleteStock")
    //     // call to display all the stocks
    //     getStockList(watchlistId)

    // }

    const getStockList = (watchlistId) =>{
        //POST call to get all stocks in chosen watchlist from the database. Ends with a setStockList call that adds the retrieved stocks to the 'Stocks' array in state.
        let data = JSON.stringify({watchlist: watchlistId})
        console.log("getStockList")
        console.log("watchlist ID: ", data)
        var config = {
            method: "POST",
            url: props.baseURL + "api/v1/stocks/showList",
            data: data,
            headers: { 
                "Content-Type": "application/json",
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
                setStockList(data.data)
                setShowStockArray(true)
          })
          .catch((error) => {
                console.log(error);
          });
    }

    useEffect(() => {
        showWatchlists();
    }, []);


    return (
        <>
        <div className="greeting">
                <h3>Hello there, {props.currentUser["fname"]}</h3>
                <h4>What company would you like to know more about today?</h4>
        </div>
        <div className="container">
            
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
                    eraseWatchlistArray={eraseWatchlistArray}
                    setEraseWatchlistArray={setEraseWatchlistArray}
                    showStockArray={showStockArray}
                    setShowStockArray={setShowStockArray}
                    getStockList={getStockList}
                    setCurrentWatchlist={setCurrentWatchlist}
                    currentWatchlist={currentWatchlist}
                    
                />
            </div>
            <div className="border">
            <h3>Stocks Saved in {currentWatchlist}</h3>
                <StockList
                    showStockArray={showStockArray}
                    setShowStockArray={setShowStockArray}
                    stockList={stockList}
                    getStockDetails={getStockDetails}
                    baseURL={props.baseURL}
                    getStockList={getStockList}
                    currentWatchlist={currentWatchlist}
                    // handleStockDelete={handleStockDelete}

                />
            </div>   
        </div>
        </>
    )
}

