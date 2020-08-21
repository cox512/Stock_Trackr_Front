import React, { useState, useEffect } from 'react';
import StockSearch from "./StockSearch";
// import ShowStock from "./ShowStock";
import Watchlist from "./Watchlist";
import StockList from "./StockList";
import axios from 'axios';
// import { Redirect, Route } from "react-router-dom";
import "../App.css";
import CompanyOverview from './CompanyOverview';
// import { Modal, Button } from 'antd';

export default function Dashboard (props) {
    
    const [ticker, setTicker] = useState('');
    const [currentStock, setCurrentStock] = useState("")
    const [watchlists, setWatchlists] = useState(null)
    const [addList, setAddList] = useState(true);
    const [showStockArray, setShowStockArray] = useState(false)
    const [stockList, setStockList] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState('')
    const [currentWatchlistTitle, setCurrentWatchlistTitle] = useState ('')
    const [overview, setOverview] = useState(null)
    const [incomeStatement, setIncomeStatement] = useState(null)
    const [balanceSheet, setBalanceSheet] = useState(null)
    const [cashFlowStatement, setCashFlowStatement] = useState(null)

    const handleStockData = (data) => {
        setCurrentStock({ symbol: data["Global Quote"]["01. symbol"], price: data["Global Quote"]["05. price"], $change: data["Global Quote"]["09. change"], pct_change: data["Global Quote"]["10. change percent"]});
        getOverview(data["Global Quote"]["01. symbol"])
    }

    // const handleChange = (evt) => {
    //     setWatchlists(evt.target.value)
    // }

    const handleWatchlistSet = () => {
        // Performs a new GET call to retrieve the new array of watchlists (post-creation of new list)
        showWatchlists()
    }

    const showWatchlists = () =>{
        //GET call to get all watchlists from the database. Ends with a setWatchlists call that adds the retrieved lists to the 'watchlists' array in state.
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
            console.log("showWatchlist data:", res.data.data)
            setWatchlists(res.data.data)
          })
          .catch((error) => {
                console.log(error);
          });
    }

    const getStockList = (watchlistId) =>{
        //POST call to get all stocks in chosen watchlist from the database. Ends with a setStockList call that adds the retrieved stocks to the 'Stocks' array in state.
        let data = JSON.stringify({watchlist: watchlistId})
        console.log("getStockList function")
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
            console.log('data narrowed: ', res.data.data)
            setStockList(res.data.data)
            console.log(res.data.data[0]["watchlist"]["title"])
            setCurrentWatchlistTitle(res.data.data[0]["watchlist"]["title"])
            setShowStockArray(true)  
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        showWatchlists();
    }, []);

    const getOverview = (symbol) => {
        console.log('getOverview Symbol:', symbol)
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        axios(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY[random]}`)
        .then(res => {
            console.log(res.data)
            setOverview(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    const getIncomeStatement = (symbol) => {
        console.log(symbol)
        console.log('getIncomeStatement')
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        axios(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY[random]}`)
        .then(res => {
            // console.log(Object.entries(res.data))
            console.log(res.data)
            // let overview = Object.entries(JSON.stringify(res.data))
            setIncomeStatement(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    const getCashFlowStatement = (symbol) => {
        console.log(symbol)
        console.log('getCashFlowStatement')
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        axios(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${symbol}&apikey=${API_KEY[random]}`)
        .then(res => {
            // console.log(Object.entries(res.data))
            console.log(res.data)
            // let overview = Object.entries(JSON.stringify(res.data))
            setCashFlowStatement(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })

    }

    const getBalanceSheet = (symbol) => {
        console.log(symbol)
        console.log('getBalanceSheet')
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        axios(`https://www.alphavantage.co/query?function=Balance_Sheet&symbol=${symbol}&apikey=${API_KEY[random]}`)
        .then(res => {
            // console.log(Object.entries(res.data))
            console.log(res.data)
            // let overview = Object.entries(JSON.stringify(res.data))
            setBalanceSheet(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    return (
        <>
        <div className="greeting">
                <h3>Hello there, {props.currentUser["fname"]}</h3>
                <h4>What company would you like to research today?</h4>
        </div>
        <div className="container">
            
            <div className="show-stock border">
                <h3>CURRENT STOCK</h3>
            {/* {currentStock ? (
                <ShowStock
                    currentStock={currentStock}
                    baseURL={props.baseURL}
                    watchlists={watchlists}
                    handleChange={handleChange}
                    handleWatchlistSet={handleWatchlistSet}
                    ticker={ticker}
                />
            ) : null} */}
                <StockSearch
                    handleChange={props.handleChange}
                    handleStockSearch={props.handleStockSearch}
                    ticker={ticker}
                    handleStockData={handleStockData}
                    getOverview={getOverview}
                    currentStock={currentStock}
                />
            </div>
            <div className="watchlist border">
                <Watchlist
                    showWatchlists={showWatchlists}
                    addlist={addList}
                    setAddList={setAddList}
                    watchlists={watchlists}
                    setWatchlists={setWatchlists}
                    handleWatchlistSet={handleWatchlistSet}
                    baseURL={props.baseURL}
                    showStockArray={showStockArray}
                    setShowStockArray={setShowStockArray}
                    getStockList={getStockList}
                    setCurrentWatchlist={setCurrentWatchlist}
                    currentWatchlist={currentWatchlist}
                    currentStock={currentStock}
                    
                />
            </div>
            { currentWatchlist ?
                <div className="border">
                    <StockList
                        showStockArray={showStockArray}
                        setShowStockArray={setShowStockArray}
                        stockList={stockList}
                        baseURL={props.baseURL}
                        getStockList={getStockList}
                        currentWatchlist={currentWatchlist}
                        currentWatchlistTitle={currentWatchlistTitle}
                    />
                </div> : null
            }
           
        </div>
        <div className="border">
                <CompanyOverview 
                    currentStock={currentStock}
                    overview={overview}
                    setOverview={setOverview}
                    getOverview={getOverview}
                    getIncomeStatement={getIncomeStatement}
                    getBalanceSheet={getBalanceSheet}
                    getCashFlowStatement={getCashFlowStatement}

                />    
        </div>
        
        <div >
            <img className="foot-img" src="./stock-chart.jpg" alt="stock chart"/>
        </div> 
        </>
    )
}

