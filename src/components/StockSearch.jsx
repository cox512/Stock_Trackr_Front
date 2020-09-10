import React, { Component } from 'react';
import axios from 'axios';
import "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";


const API_KEY = [
  process.env.REACT_APP_API_KEY1,
  process.env.REACT_APP_API_KEY2,
];

let random = Math.floor(Math.random() * 2);

export default class StockSearch extends Component {
    state = {
      ticker: "",
      tickerList: [],
    }
    
    handleChange = (evt) => {
      this.setState({
        [evt.target.id]: evt.target.value,
        ticker: evt.target.value
      });
      
      const stockOptions = [];

      axios(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.ticker}&apikey=${API_KEY[random]}`)
      .then((res) => {
        console.log(res);
        if(res.data.bestMatches){
          for(let i=0; i<res.data.bestMatches.length; i++) {
            // console.log(res.data.bestMatches[i])
            stockOptions.push({symbol: res.data.bestMatches[i]['1. symbol'], name: res.data.bestMatches[i]['2. name']})
          }
          console.log(stockOptions)
        }
        this.setState({
          tickerList: stockOptions,
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      
    };

    handleSelection = (symbol) => {
      this.setState({
        ticker: symbol,
      })
    }

    handleStockSearch = (evt) => {
      evt.preventDefault();
      let ticker = this.state.ticker;       
      axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY[random]}`)
      .then((res) => {
        console.log(res.data);
        this.props.handleStockData(res.data);
        document.getElementById("ticker").value="";
        this.setState({
          ticker: "",
        })
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    };
    
  render() {
    return (
      <>
        <div>
          <p>Enter a ticker symbol below</p>
          <form onSubmit={(evt)=>this.handleStockSearch(evt)}>
            <label htmlFor="ticker">Stock:</label>
            <input type="text" id="ticker" placeholder="Search by name or symbol" onChange={(evt)=>this.handleChange(evt)}/><br/>
            
            {this.state.ticker ?
              <select size={this.state.tickerList.length}>
                {this.state.tickerList.map((stock) => {
                  return (
                    // console.log(stock)
                  <option 
                    key={stock['symbol']} 
                    onClick={() => this.handleSelection(stock.symbol)} >
                    {stock.symbol} - {stock.name} 
                  </option>
                  )
                })
              }
              </select> : null
            }
          <Button variant="outline-dark" type="submit">Search</Button>
          </form>
        </div>



        { this.props.currentStock ?
        <div>
          <h4>{this.props.currentStock.symbol}</h4>
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
                <td className="stock-detail">{this.props.currentStock.price}</td>
                <td className="stock-detail">{this.props.currentStock.$change}</td>
                <td className="stock-detail">{this.props.currentStock.pct_change}</td> 
              </tr>
            </tbody>
          </Table>
        </div> 
        : null }
      </>
    )
  }
}