import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import Account from "./components/Account";
import UserPage from "./components/UserPage";

const baseURL = "http://localhost:8000/";

export default class App extends Component {
  state = {
    users: [],
    currentUser: "",
    showLogin: false,
    ticker: "",
    stockPrice: null,
    redirect: null,
    symbol: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handleCreateNewUser = (evt) => {
    evt.preventDefault();
    this.createNewUser(this.state);
  };

  createNewUser = (newUser) => {
    // console.log(newUser);
    let data = JSON.stringify(newUser);
    let config = {
      method: "POST",
      url: baseURL + "user/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        // console.log(res.data);
        return res.data;
      })
      .then((data) => {
        console.log(data.data);
        this.setState({
          currentUser: data.data,
        });
        console.log(this.state.currentUser);
      })
      .catch((error) => console.error({ Error: error }));
  };

  handleLogin = (evt) => {
    evt.preventDefault();
    this.loginUser(this.state);
  };

  loginUser = (userInfo) => {
    console.log(userInfo);
    let data = JSON.stringify(userInfo);
    let config = {
      method: "POST",
      url: baseURL + "user/login",
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "session=.eJwlzssNgzAMANBdcu7B-EfCMsh2bLVXKKequxepE7z3aXsdeT7b9j6ufLT9NdvWYlS3Gsiq5a6zo6BKQMyEaTrYNQYIVs9IETNOBwEzV2AgU0RyKhZeZ1kireKKUSgLplhEEJPnxFgI1ehmbLg7wBBGiXZHrjOP_0ba9wcRZTAC.Xy6-zw.a2SOYnwSc3SYhYC2lMhKkp5oqi4",
      },
      data: data,
    };
    axios(config)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .then((data) => {
        console.log(data);
        this.setState({
          currentUser: data.data,
          showLogin: false,
          redirect: true,
        });
        console.log(this.state.currentUser);
      })
      .catch((error) => {
        console.error({ Error: error });
      });
  };

  revealLogin = (evt) => {
    this.setState({
      showLogin: !this.state.showLogin,
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

  addToWatchlist = (evt) => {
    evt.preventDefault();
    // const i = 0;
    // return i;
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
                  addToWatchlist={this.addToWatchlist}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  handleCreateNewUser={this.handleCreateNewUser}
                  handleChange={this.handleChange}
                  handleLogin={this.handleLogin}
                  showLogin={this.state.showLogin}
                  revealLogin={this.revealLogin}
                  redirect={this.state.redirect}
                />
              )}
            />
            <Route exact path="/account" component={Account} />
            <Route component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
