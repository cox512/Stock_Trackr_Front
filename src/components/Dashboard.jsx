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
    const [annualIncomeStatement, setAnnualIncomeStatement] = useState(null)
    const [balanceSheet, setBalanceSheet] = useState(null)
    const [cashFlowStatement, setCashFlowStatement] = useState(null)
    const [flag, setFlag] = useState(false)
    const [seeWarning, setSeeWarning] = useState(false)
    const [fname, setFname] = useState(localStorage.getItem('fname'))

    useEffect (() => {
        if (watchlists.length !== 0) {
            setSeeWarning(false)
        } else (
            setSeeWarning(true)
        )
    }, [watchlists] )

    const checkForUser = () => {
        console.log(props.currentUser)
        if (props.currentUser === null) {
            console.log("Dashboard. About to Redirect")
            showWatchlists()
            return <Redirect to='/'/>
        } 
        showWatchlists()
    }

    useEffect (() => {
        if (watchlists) {
            setSeeWarning(false)
        } else {
            setSeeWarning(true)
        }
        checkForUser();
    }, [] )

   
    const handleStockData = (data) => {
        setCurrentStock({ 
            symbol: data["Global Quote"]["01. symbol"], 
            price: data["Global Quote"]["05. price"], 
            $change: data["Global Quote"]["09. change"], 
            pct_change: data["Global Quote"]["10. change percent"]
        });
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
                    'Authorization': `${localStorage.getItem("jwt")}`},
                withCredentials: true}
            )
            console.log("showWatchlist data:", res.data.data);
            setWatchlists(res.data.data);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const getStockList = async (watchlistId) =>{
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
            console.log(res)
            setOverview(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    const getIncomeStatement = (symbol) => {
        // console.log(symbol)
        // console.log('getIncomeStatement')
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        axios(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=${API_KEY[random]}`)
        .then(res => {
            console.log(Object.entries(Object.entries(res.data))[1][1][1]);
            console.log(Object.entries(Object.entries(Object.entries(res.data))[1][1][1]));
            setAnnualIncomeStatement(Object.entries(Object.entries(res.data))[1][1][1])
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
            console.log(res.data)
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
            setBalanceSheet(res.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        })
    }

    return (
        <>
        {props.redirect ? <Redirect to={props.redirect} /> : null}
        <div className="greeting">
                <h3>Hello there, {fname}</h3>
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
                    setCurrentWatchlist={setCurrentWatchlist}
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
                    //could have one generic "statement" variable that changes. This might help with condenscing the modals/tables.
                    annualIncomeStatement={annualIncomeStatement}
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

