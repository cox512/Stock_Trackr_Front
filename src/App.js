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
    evt.persist();
    let value = evt.target.value;
    setCurrentUser((prevState) => ({
      ...prevState,
      [evt.target.id]: value,
    }));
  };

  const handleSuccessfulRegistration = async (data) => {
    setLogInStatus(true);
    console.log(data);
    setCurrentUser(data);
    setJwt(localStorage.getItem("jwt"));
  };

  const checkLogin = async () => {
    console.log("checklogin");
    try {
      const jwt = localStorage.getItem("jwt");
      const res = await axios
        .get(
          baseURL + "user/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwt}`,
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          setCurrentUser(res.data.data[0]);
          return res.data;
        })
        .then((data) => {
          console.log("currentUser: ", currentUser);
          setLogInStatus(true);
        });
    } catch (error) {
      console.log("Error:", error);
      localStorage.clear();
      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    console.log("use effect checklogin");
    checkLogin();
  }, []);

  const handleLogout = () => {
    console.log("in handle logout");
    localStorage.clear();

    setCurrentUser("");
    setJwt("");
    setLogInStatus(false);
  };

  return (
    <>
      {redirect ? <Redirect to={redirect} /> : null}
      {}
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
                  redirect={redirect}
                  setRedirect={setRedirect}
                  handleSuccessfulRegistration={handleSuccessfulRegistration}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
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
