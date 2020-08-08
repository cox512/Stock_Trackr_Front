import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
// import LogIn from "./components/LogIn";
// import CreateUser from "./components/CreateUser";
import Watchlist from "./components/Watchlist";
import NavBar from "./components/NavBar";
import Error from "./components/Error";

const baseURL = "http://localhost:8000/";

export default class App extends Component {
  state = {
    users: [],
    currentUser: "",
    showLogin: false,
    ticker: "",
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
    console.log(random);
    const pickAPI_KEY = () => {
      let API_KEYS = [
        process.env.REACT_APP_API_KEY1,
        process.env.REACT_APP_API_KEY2,
      ];
      return API_KEYS[random];
    };

    let stockTicker = this.state.ticker;
    let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockTicker}&interval=1min&outputsize=full&apikey=${pickAPI_KEY}`;

    axios(API_CALL)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        this.setState({
          ticker: this.state.ticker,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          currentUser={this.state.currentUser}
          handleChange={this.handleChange}
        />

        <Switch>
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
                handleStockSearch={this.handleStockSearch}
                ticker={this.state.ticker}
              />
            )}
          />
          {/* <Route
            exact
            path="/register"
            render={() => (
              <CreateUser
                handleCreateNewUser={this.handleCreateNewUser}
                handleChange={this.handleChange}
              />
            )}
          /> */}
          <Route exact path="/watchlist" component={Watchlist} />
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}
