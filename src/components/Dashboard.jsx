import React, { useState, useEffect } from 'react';
import StockSearch from "./StockSearch";
import Watchlist from "./Watchlist";
import StockList from "./StockList";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import "../App.css";
import CompanyOverview from './CompanyOverview';

export default function Dashboard (props) {
    
    const [currentStock, setCurrentStock] = useState("")
    const [watchlists, setWatchlists] = useState("")
    const [addList, setAddList] = useState(true);
    const [showStockArray, setShowStockArray] = useState(false)
    const [stockList, setStockList] = useState([])
    const [currentWatchlist, setCurrentWatchlist] = useState(null)
    const [overview, setOverview] = useState(null)
    const [incomeStatement, setIncomeStatement] = useState(null)
    const [balanceSheet, setBalanceSheet] = useState(null)
    const [cashFlowStatement, setCashFlowStatement] = useState(null)
    const [flag, setFlag] = useState(false)
    const [seeWarning, setSeeWarning] = useState(false)

    
    const handleStockData = (data) => {
        setCurrentStock({ symbol: data["Global Quote"]["01. symbol"], price: data["Global Quote"]["05. price"], $change: data["Global Quote"]["09. change"], pct_change: data["Global Quote"]["10. change percent"]});
        getOverview(data["Global Quote"]["01. symbol"])
    }

    const emptyCurrentWatchlist = () => {
        setCurrentWatchlist(null)
    }

    const showWatchlists = () =>{
        console.log('showWatchlists')
        let config = {
            method: "GET",
            url: props.baseURL + "api/v1/watchlists/", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config)
        .then((res) => {
            console.log("showWatchlist data:", res.data.data)
            setWatchlists(res.data.data)            
            // console.log(watchlists['0']['title'])
            if (watchlists) {
                setSeeWarning(false)
            } else {
                setSeeWarning(true)
            }
            }
        )
          .catch((error) => {
                console.log(error);
          });
    }

    if (props.currentUser === null) {
        return <Redirect to='/'/>
    } else if (flag === false) {
        showWatchlists();
        setFlag(true);
    }

    const getStockList = (watchlistId) =>{
        //Called when a watchlist is clicked AND when the stockList is re-rendered after a stock has been deleted.
        let data = JSON.stringify({watchlist: watchlistId})
        console.log("watchlist ID: ", watchlistId)
        var config = {
            method: "POST",
            url: props.baseURL + "api/v1/stocks/showList",
            data: data,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
          };
        axios(config)
        .then((res) => {
            console.log('res: ', res)
            setStockList(res.data.data)
            setShowStockArray(true)  
        })
        .catch((error) => {
            console.log(error);
        });
    }

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
                <StockSearch
                    handleStockData={handleStockData}
                    currentStock={currentStock}
                />
            </div>
            <div className="watchlist border">
                <Watchlist
                    showWatchlists={showWatchlists}
                    setAddList={setAddList}
                    watchlists={watchlists}
                    baseURL={props.baseURL}
                    getStockList={getStockList}
                    currentWatchlist={currentWatchlist}
                    currentStock={currentStock}
                    jwt={props.jwt}

                    seeWarning={seeWarning}
                    setSeeWarning={setSeeWarning}
                    

                />
            </div>
            { currentWatchlist ?
                <div className="border">
                    <h3>{currentWatchlist.title.toUpperCase()}</h3>
                    <StockList
                        showStockArray={showStockArray}
                        stockList={stockList}
                        baseURL={props.baseURL}
                        getStockList={getStockList}
                        currentWatchlist={currentWatchlist}
                        jwt={props.jwt}
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

