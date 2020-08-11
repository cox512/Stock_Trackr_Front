import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import Account from "./components/Account";
import UserPage from "./components/UserPage";

const baseURL = "http://localhost:8000/";

export default class App extends Component {
  state = {
    currentUser: {},
    loginStatus: false,
    // redirect: false,
    showLoginBox: false,
    ticker: "",
    stockPrice: null,
    symbol: "",
  };

  handleSuccessfulRegistration = (data) => {
    this.setState({
      loginStatus: true,
      currentUser: data,
      // redirect: true,
    });
  };

  revealLoginBox = (evt) => {
    this.setState({
      showLoginBox: true,
    });
  };

  handleStockSearch = (evt) => {
    evt.preventDefault();
    let random = Math.floor(Math.random() * 2);
    const pickAPI_KEY = () => {
      let API_KEYS = [
        process.env.REACT_APP_API_KEY1,
        process.env.REACT_APP_API_KEY2,
      ];
      return API_KEYS[random];
    };
    let stockTicker = this.state.ticker;
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTicker}&interval=1min&outputsize=compact&apikey=${pickAPI_KEY}`;
    axios(API_CALL)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        console.log(data["Meta Data"]["2. Symbol"]);
        console.log(
          Object.entries(Object.entries(data["Time Series (1min)"])[1][1])[3][1]
        );
        this.setState({
          symbol: data["Meta Data"]["2. Symbol"],
          stockPrice: Object.entries(
            Object.entries(data["Time Series (1min)"])[1][1]
          )[3][1],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  componentDidUpdate = () => {
    if (this.state.redirect) {
      this.setState({
        redirect: false,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar
            currentUser={this.state.currentUser}
            handleChange={this.handleChange}
          />
          <Switch>
            <Route
              exact
              path="/userpage"
              render={() => (
                <UserPage
                  stockPrice={this.state.stockPrice}
                  symbol={this.state.symbol}
                  handleStockSearch={this.handleStockSearch}
                  handleChange={this.handleChange}
                  currentUser={this.state.currentUser}
                  baseURL={baseURL}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  handleSuccessfulRegistration={
                    this.handleSuccessfulRegistration
                  }
                  handleChange={this.handleChange}
                  currentUser={this.state.currentUser}
                  loginStatus={this.state.loginStatus}
                  baseURL={baseURL}
                  handleLogin={this.handleLogin}
                  showLoginBox={this.state.showLoginBox}
                  revealLoginBox={this.revealLoginBox}
                  // redirect={this.state.redirect}
                />
              )}
            />
            <Route
              exact
              path="/account"
              render={() => (
                <Account
                  currentUser={this.state.currentUser}
                  baseURL={baseURL}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
