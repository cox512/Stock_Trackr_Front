import React, { Component } from 'react';
import axios from 'axios';
import "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default class StockSearch extends Component {
    state = {
      ticker: ""
    }
    
    handleChange = (evt) => {
      this.setState({
        [evt.target.id]: evt.target.value,
        ticker: evt.target.value
      });
    };

    handleStockSearch = (evt) => {
      evt.preventDefault();
      let ticker = this.state.ticker.toUpperCase()
      // console.log(ticker)
       
      let random = Math.floor(Math.random() * 2);
      let API_KEY = [
        process.env.REACT_APP_API_KEY1,
        process.env.REACT_APP_API_KEY2,
      ];
        
      axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY[random]}`)
      .then((res) => {
        console.log(res.data);
        this.props.handleStockData(res.data);
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
            <input type="text" id="ticker" placeholder="TICKER SYMBOL" onChange={(evt)=>this.handleChange(evt)}/><br/>
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