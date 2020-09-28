import React, { useState } from 'react';
import axios from 'axios';
import "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const API_KEY = [
  process.env.REACT_APP_API_KEY1,
  process.env.REACT_APP_API_KEY2,
];


export default function StockSearch (props) {
  const [ticker, setTicker] = useState("");
  const [tickerList, setTickerList] = useState([]);
    
  const  handleChange = (evt) => {
    setTicker(evt.target.value);
    const stockOptions = [];
    let random = Math.floor(Math.random() * 2);
    axios(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY[random]}`)
    .then((res) => {
      console.log(res);
      if(res.data.bestMatches){
        for(let i=0; i<res.data.bestMatches.length; i++) {
          // console.log(res.data.bestMatches[i])
          stockOptions.push({symbol: res.data.bestMatches[i]['1. symbol'], name: res.data.bestMatches[i]['2. name']})
        }
        console.log(stockOptions);
      }
      setTickerList(stockOptions);
      })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  const handleSelection = (symbol) => {
    setTicker(symbol);
  }

  const handleStockSearch = (evt) => {
    evt.preventDefault();
    let random = Math.floor(Math.random() * 2);
    axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY[random]}`)
    .then((res) => {
      console.log(res.data);
      props.handleStockData(res.data);
      document.getElementById("ticker").value="";
      setTicker("");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };
    
  return (
    <>
      <div>
        <p>Enter a ticker symbol below</p>
        <Form onSubmit={(evt)=>handleStockSearch(evt)}>
          <Form.Group id="ticker">
            <Form.Label htmlFor="ticker">Stock:</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter name or symbol"
              value={ticker}
              onChange={(evt)=>handleChange(evt)}
            />
            {ticker ?
              <select size={tickerList.length} className="selection-form">
                {tickerList.map((stock) => {
                  return (
                  <option 
                    key={stock['symbol']} 
                    onClick={() => handleSelection(stock.symbol)} >
                    {stock.symbol} - {stock.name} 
                  </option>
                  )
                })}
              </select> : null
            }
          </Form.Group>
          <Button variant="outline-dark" type="submit">Search</Button>
        </Form>
      </div>

      { props.currentStock ?
      <div>
        <h4>{props.currentStock.symbol}</h4>
        <Table>
          <thead>
            <tr>
              <th>Price</th>
              <th>Chng ($)</th>
              <th>Chng (Pct)</th>
            </tr>
          </thead>
          <tbody>  
            <tr>
              <td className="stock-detail">{props.currentStock.price}</td>
              <td className="stock-detail">{props.currentStock.$change}</td>
              <td className="stock-detail">{props.currentStock.pct_change}</td> 
            </tr>
          </tbody>
        </Table>
      </div> 
      : null }
    </>
  )
}