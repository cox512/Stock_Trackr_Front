import React, { Component } from 'react';
import axios from 'axios';

export default class StockSearch extends Component {
    

    handleChange = (evt) => {
        this.setState({
          [evt.target.id]: evt.target.value,
        });
    };

    handleStockSearch = (evt) => {
        let ticker = this.state.ticker.toUpperCase()
        evt.preventDefault();
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&outputsize=compact&apikey=${API_KEY[random]}`;
        
        axios(API_CALL)
          .then((res) => {
            console.log(res.data);
            return res.data;
          })
          .then((data) => {
            console.log(data["Meta Data"]["2. Symbol"]);
            console.log(Object.entries(data["Time Series (1min)"])[0][1]["4. close"])
            this.props.handleStockData(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      };
    
  render() {
    return (
        <div>
            <p>Enter a ticker symbol below</p>
            <form onSubmit={(evt)=>this.handleStockSearch(evt)}>
                <label htmlFor="ticker">Stock:</label>
                <input type="text" id="ticker" placeholder="TICKER SYMBOL" onChange={(evt)=>this.handleChange(evt)}/><br/>
                <input type="submit" value="Search"/>
            </form>
        </div>
      )
    }
}
