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

    useEffect (() => {
        if (watchlists) {
            setSeeWarning(false)
        } else (
            setSeeWarning(true)
        )
    }, [] )

    useEffect (() => {
        if (watchlists.length !== 0) {
            setSeeWarning(false)
        } else (
            setSeeWarning(true)
        )
    }, [watchlists] )

    const handleStockData = (data) => {
        setCurrentStock({ symbol: data["Global Quote"]["01. symbol"], price: data["Global Quote"]["05. price"], $change: data["Global Quote"]["09. change"], pct_change: data["Global Quote"]["10. change percent"]});
        getOverview(data["Global Quote"]["01. symbol"])
    }

    const emptyCurrentWatchlist = () => {
        setCurrentWatchlist(null)
    }

    const showWatchlists = async () =>{
        console.log('showWatchlists')
        try {
            const res = await axios.get(props.baseURL + "api/v1/watchlists/", 
                {headers:{
                    "Content-Type": "application/json",
                    'Authorization': `${props.jwt}`},
                withCredentials: true}
            )
            console.log("showWatchlist data:", res.data.data)
            setWatchlists(res.data.data)
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    if (props.currentUser === null) {
        return <Redirect to='/'/>
    } else if (flag === false) {
        showWatchlists();
        setFlag(true);
    };
    

    const getStockList = async (watchlistId) =>{
        //Called when a watchlist is clicked AND when the stockList is re-rendered after a stock has been deleted.
        try {
            const res = await axios.post(props.baseURL + "api/v1/stocks/showList", {
                watchlist: watchlistId},
                {withCredentials: true,
                headers:{
                    "Content-Type": "application/json",
                    'Authorization': `${props.jwt}`}
                })
            console.log('res: ', res)
            setStockList(res.data.data)
            setShowStockArray(true)
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const getCurrentWatchlist = async (id) => {
        console.log('getCurrWatch:', id)
        try {
            const res = await axios.get(props.baseURL + "api/v1/watchlists/" + id, 
            {headers:{
                "Content-Type": "application/json",
                'Authorization': `${props.jwt}`},
            withCredentials: true
        })
            setCurrentWatchlist(res.data.data);
            getStockList(res.data.data.id);
        }
        catch (error) {
            console.log("Error:", error);
        }

    }

    const getOverview = async (symbol) => {
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
                    getCurrentWatchlist={getCurrentWatchlist}
                    seeWarning={seeWarning}
                    setSeeWarning={setSeeWarning}
                    emptyCurrentWatchlist={emptyCurrentWatchlist}
                    

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

