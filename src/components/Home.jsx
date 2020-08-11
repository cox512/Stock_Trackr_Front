import React, { useState } from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import axios from "axios";

import { Redirect } from "react-router-dom";

export default function Home(props) {

    const [watchlists, setWatchlists] = useState([])

    if (props.loginStatus) {
        return <Redirect to='/userpage'/>
    }

    

    const showWatchlists = () =>{
        console.log("showWatchlists")
        var config = {
            method: 'GET',
            url: props.baseURL + 'api/v1/watchlists/',
            headers: { 
                'Content-Type': "application.json",
            },
            withCredentials: true,
          };
          axios(config)
          .then((res) => {
            console.log(res.data)
            return res.data;
          })
          .then((data) => {
              console.log(data.data)
                setWatchlists(data.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    return (
        <div>
            <h1>HOME PAGE</h1>
            {/* <h2>Logged In Status: {props.loginStatus}</h2> */}
            <button onClick={()=>showWatchlists()}>SHOW WATCHLISTS</button>
            <h3>Research stocks ... <br/>
                Add them to your watchlists ... <br/>
                Find the next 10Baggr!
            </h3>
           
    
            <CreateUser
                handleSuccessfulRegistration={props.handleSuccessfulRegistration}
                loginStatus={props.loginStatus}
                currentUser={props.currentUser}
                baseURL={props.baseURL}
                handleLogin={props.handleLogin}
                showLogin={props.showLogin}
                revealLogin={props.revealLogin}
            />
            { props.showLoginBox ?
                <LogIn
                    handleSuccessfulRegistration={props.handleSuccessfulRegistration}
                    handleChange={props.handleChange}
                    baseURL={props.baseURL}
                /> :
                <>
                <h4>Already have an account?</h4>
                <button onClick={(evt)=>props.revealLoginBox(evt)}>Login</button>
                </>
                }    
        </div>
    )
}
