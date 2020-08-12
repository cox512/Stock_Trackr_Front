import React, { useState } from 'react';
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";

export default function UserPage (props) {

    return (
        <div>
               
            <h3>Hello there, {props.currentUser["fname"]}</h3>
            <h4>What company would you like to know more about today?</h4>
            <StockSearch
                handleChange={props.handleChange}
                handleStockSearch={props.handleStockSearch}
                ticker={props.ticker}

            />
            {props.stockPrice ? (
            <ShowStock
                stockPrice={props.stockPrice}
                symbol={props.symbol}
                handleChange={props.handleChange}
                baseURL={props.baseURL}
                
            />
        ) : null}
        </div>
    )
}

