import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  withRouter,
} from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";

const baseURL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    currentUser: null,
    loginStatus: false,
    showLoginBox: false,
    modalVisible: false,
    jwt: localStorage.getItem("jwt") || "",
  };

  handleChange = (evt) => {
    const editedUser = this.state.currentUser;
    editedUser[evt.target.id] = evt.target.value;
    this.setState({
      currentUser: editedUser,
    });
  };

  handleSuccessfulRegistration = (data) => {
    this.setState({
      loginStatus: true,
      currentUser: data,
      jwt: localStorage.getItem("jwt"),
    });
  };

  // handleUpdate = (evt) => {
  //   evt.preventDefault();
  //   console.log(this.state.currentUser);
  //   let data = JSON.stringify(this.state.currentUser);
  //   let config = {
  //     method: "PUT",
  //     url: baseURL + "user/" + this.state.currentUser.id,
  //     data: data,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${this.state.jwt}`,
  //     },
  //     withCredentials: true,
  //   };
  //   axios(config)
  //     .then((res) => {
  //       console.log(res);
  //       return res.data;
  //     })
  //     .then((data) => {
  //       console.log(data.data);
  //       if (data.status.code === 200) {
  //         this.handleSuccessfulRegistration(data.data);
  //       } else {
  //         this.setState({
  //           errorMessage: true,
  //         });
  //       }
  //     })
  //     .catch((error) => console.error({ Error: error }));
  // };

  // checkLoginStatus = () => {
  //   // Upon mounting, look to see if there is currently a user logged in. If so make them the currentUser. If not, make sure there is no currentUser in state
  //   var config = {
  //     method: "GET",
  //     url: baseURL + "user/",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `${this.state.jwt}`,
  //     },
  //     withCredentials: true,
  //   };
  //   axios(config)
  //     .then((res) => {
  //       if (res.data.logged_in && this.state.loginStatus === false) {
  //         this.setState({
  //           loginStatus: true,
  //           currentUser: res.data.data[0],
  //         });
  //       } else if (!res.data.logged_in && this.state.loginStatus === true) {
  //         this.setState({
  //           loginStatus: false,
  //           currentUser: {},
  //         });
  //         return <Redirect to="/" />;
  //       }
  //       console.log("logged in?", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("check login error: ", err);
  //     });
  // };

  componentDidMount = async () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      try {
        const res = await axios.get(
          baseURL + "user/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwt}`,
            },
          },
          { withCredentials: true }
        );
        console.log(res.data.data[0]);
        this.setState({
          currentUser: res.data.data[0],
          loginStatus: true,
        });
      } catch (error) {
        console.log("Login Error:", error);
      }
    }
  };

  handleLogout = () => {
    localStorage.removeItem("jwt");
    this.setState({
      loginStatus: false,
      currentUser: "",
      jwt: "",
    });
    if (!this.state.loginStatus) {
      console.log("User is logged out.");
    }
  };

  render() {
    return (
      <>
        <div>
          <BrowserRouter>
            <div ref={this.wrapper}>{this.props.children}</div>
            <NavBar
              currentUser={this.state.currentUser}
              handleChange={this.handleChange}
              baseURL={baseURL}
              jwt={this.state.jwt}
              handleLogout={this.handleLogout}
              handleSuccessfulRegistration={this.handleSuccessfulRegistration}
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
                    jwt={this.state.jwt}
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
                    currentUser={this.state.currentUser}
                    loginStatus={this.state.loginStatus}
                    baseURL={baseURL}
                    showLoginBox={this.state.showLoginBox}
                    jwt={this.state.jwt}
                  />
                )}
              />
              <Route component={Error} />
            </Switch>
          </BrowserRouter>
        </div>
        <footer id="footer">10bagger ©2020</footer>
      </>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;
