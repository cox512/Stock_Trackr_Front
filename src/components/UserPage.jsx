import React, { useState, useEffect } from 'react';
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import axios from 'axios';

export default function UserPage (props) {

    const [ticker, setTicker] = useState('');
    const [symbol, setSymbol] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [watchlists, setWatchlists] = useState([])
    const [addList, setAddList] = useState(false);

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
        // console.log("showWatchlists")
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
            // console.log(res.data)
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
        <div>
               
            <h3>Hello there, {props.currentUser["fname"]}</h3>
            <h4>What company would you like to know more about today?</h4>
            <StockSearch
                handleChange={props.handleChange}
                handleStockSearch={props.handleStockSearch}
                ticker={ticker}
                handleStockData={handleStockData}
            />
            {/* <button onClick={()=>showWatchlists()}>SHOW WATCHLISTS</button> */}
            {/* <h4>Your Watchlists</h4>
            <ul>
                {watchlists.map(list => {
                    return (
                        <li key={list.id}>{list.title}</li>
                    )
                })}
            </ul> */}

            {stockPrice ? (
                <ShowStock
                    stockPrice={stockPrice}
                    symbol={symbol}
                    baseURL={props.baseURL}
                    watchlists={watchlists}
                    handleChange={handleChange}
                    handleWatchlistSet={handleWatchlistSet}
                    addList={addList}
                    setAddList={setAddList}
                />
            ) : null}   
        </div>
    )
}

