import React, { Component } from "react";
import "./App.css";
// import Moment from "react-moment";
// import "moment-timezone";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";
import axios from "axios";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import Account from "./components/Account";
import UserPage from "./components/UserPage";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;
const baseURL = "http://localhost:8000/" || "https://tenbagger.herokuapp.com/";

export default class App extends Component {
  state = {
    currentUser: {},
    loginStatus: false,
    showLoginBox: false,
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.id]: evt.target.value,
    });
  };

  handleSuccessfulRegistration = (data) => {
    this.setState({
      loginStatus: true,
      currentUser: data,
    });
  };

  //Is there a way to run this without getting the CORS error in the console. Sessions?
  checkLoginStatus = () => {
    console.log(baseURL);
    var config = {
      method: "GET",
      url: baseURL + "user/",
      withCredentials: true,
    };
    axios(config)
      .then((res) => {
        if (res.data.logged_in && this.state.loginStatus === false) {
          this.setState({
            loginStatus: true,
            currentUser: res.data.data[0],
          });
        } else if (!res.data.logged_in && this.state.loginStatus === true) {
          this.setState({
            loginStatus: false,
            currentUser: {},
          });
        }
        console.log("logged in?", res.data);
      })
      .catch((err) => {
        console.log("check login error: ", err);
      });
  };

  componentDidMount = () => {
    this.checkLoginStatus();
  };

  revealLoginBox = (evt) => {
    this.setState({
      showLoginBox: true,
    });
  };

  handleLogout = () => {
    this.setState({
      loginStatus: false,
      currentUser: "",
    });
    if (!this.state.loginStatus) {
      console.log("this works");
      return <Redirect to="/" />;
    }
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
      <div>
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
                  // stockPrice={this.state.stockPrice}
                  // symbol={this.state.symbol}
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
                  // handleChange={this.handleChange}
                  currentUser={this.state.currentUser}
                  loginStatus={this.state.loginStatus}
                  baseURL={baseURL}
                  // handleLogin={this.handleLogin}
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
                  handleLogout={this.handleLogout}
                  handleChange={this.handleChange}
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
