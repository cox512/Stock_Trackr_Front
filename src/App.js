import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  withRouter,
} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";

const baseURL = process.env.REACT_APP_API_URL;
const jwt = localStorage.getItem("jwt");

// const authAxios = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
//   withCredentials: true,
// });

class App extends Component {
  state = {
    currentUser: {},
    loginStatus: false,
    showLoginBox: false,
    modalVisible: false,
  };

  setModalVisible = (modalVisible) => {
    this.setState({ modalVisible });
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

  checkLoginStatus = () => {
    // Upon mounting, look to see if there is currently a user logged in. If so make them the currentUser. If not, make sure there is no currentUser in state
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
          return <Redirect to="/" />;
        }
        console.log("logged in?", res.data);
      })
      .catch((err) => {
        console.log("check login error: ", err);
      });
  };

  componentDidMount = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      this.props.history.push("/");
    }
    axios
      .get(baseURL + "user/", { headers: { Authorization: `Bearer ${jwt}` } })
      .then((res) =>
        this.setState({
          currentUser: res.data,
        })
      )
      .catch((err) => {
        console.log("check login error: ", err);
        localStorage.removeItem("jwt");
        this.props.history.push("/");
      });
    // this.checkLoginStatus();
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
      console.log("User is logged out.");
      // Redirect home isn't working for some reason.
      return <Redirect to="/" />;
      // this.state.history.push("/");
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
              path="/dashboard"
              render={() => (
                <Dashboard
                  currentUser={this.state.currentUser}
                  baseURL={baseURL}
                  modalVisible={this.state.modalVisible}
                  setModalVisible={this.setModalVisible}
                  jwt={jwt}
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
                  jwt={jwt}
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
                  modalVisible={this.state.modalVisible}
                  setModalVisible={this.setModalVisible}
                  jwt={jwt}
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

const AppWithRouter = withRouter(App);
export default AppWithRouter;
