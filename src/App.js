import React, { useState, useEffect } from "react";
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

function App() {
  const [redirect, setRedirect] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [logInStatus, setLogInStatus] = useState(false);
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");

  const handleChange = (evt) => {
    const editedUser = currentUser;
    editedUser[evt.target.id] = evt.target.value;
    setCurrentUser(editedUser);
  };

  const handleSuccessfulRegistration = async (data) => {
    setLogInStatus(true);
    console.log(data);
    setCurrentUser(data);
    setJwt(localStorage.getItem("jwt"));
  };

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

  const checkLogin = async () => {
    console.log("checklogin");
    if (localStorage.getItem("jwt")) {
      try {
        const jwt = localStorage.getItem("jwt");
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
        setCurrentUser(res.data.data[0]);
        setLogInStatus(true);
      } catch (error) {
        console.log("Error:", error);
        localStorage.removeItem("jwt");
        return <Redirect to="/" />;
      }
    } else {
      localStorage.clear();
      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = async () => {
    console.log("in handle logout");
    localStorage.clear();
    setCurrentUser("");
    setLogInStatus(false);
    setJwt("");
  };

  return (
    <>
      <div>
        <BrowserRouter>
          {/* <div ref={wrapper}>{props.children}</div> */}
          <NavBar
            setRedirect={setRedirect}
            redirect={redirect}
            currentUser={currentUser}
            handleChange={handleChange}
            baseURL={baseURL}
            jwt={jwt}
            handleLogout={handleLogout}
            handleSuccessfulRegistration={handleSuccessfulRegistration}
          />
          <Switch>
            <Route
              exact
              path="/dashboard"
              render={() => (
                <Dashboard
                  redirect={redirect}
                  setRedirect={setRedirect}
                  currentUser={currentUser}
                  baseURL={baseURL}
                  modalShow={modalShow}
                  jwt={jwt}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  handleSuccessfulRegistration={handleSuccessfulRegistration}
                  currentUser={currentUser}
                  logInStatus={logInStatus}
                  baseURL={baseURL}
                  showLoginBox={showLoginBox}
                  jwt={jwt}
                  setJwt={setJwt}
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

const AppWithRouter = withRouter(App);
export default AppWithRouter;
