import React, { useState } from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import axios from "axios";

import { Redirect } from "react-router-dom";

export default function Home(props) {

    const [watchlists, setWatchlists] = useState([])

    if (props.redirect) {
        return <Redirect to='/userpage'/>
    }

    const showWatchlists = () =>{
        console.log("showWatchlists")
        var config = {
            method: 'GET',
            url: props.baseURL + 'api/v1/watchlists/',
            headers: { 
                'Content-Type': "application.json",
                'Cookie': document.cookie
            // 'session=.eJwlzssNgzAMANBdcu7B-EfCMsh2bLVXKKequxepE7z3aXsdeT7b9j6ufLT9NdvWYlS3Gsiq5a6zo6BKQMyEaTrYNQYIVs9IETNOBwEzV2AgU0RyKhZeZ1kireKKUSgLplhEEJPnxFgI1ehmbLg7wBBGiXZHrjOP_0ba9wcRZTAC.Xy9s-Q.uxrG7u2J4tcsIRQWfbejwImL0dA'
            }
          };
          axios(config)
          .then((res) => {
            return res.data;
          })
          .then((data) => {
              console.log(data.data)
              console.log(data.data[1].watchlist.user.username)
              console.log(props.currentUser.username)
              for (let i=0; i<watchlists.length; i++) {
                  if (data.data[i].watchlist.user.username === props.currentUser.username) {
                      setWatchlists(data.data[i])
                  }
              }
              console.log(watchlists)
              

          })
          .catch((error) => {
            console.log(error);
          });
          
    }

    return (
        <div>
            <h1>HOME PAGE</h1>
            <button onClick={()=>showWatchlists()}>SHOW WATCHLISTS</button>
            <h3>Research stocks ... <br/>
                Add them to your watchlists ... <br/>
                Find the next 10Baggr!
            </h3>
    
            <CreateUser
                handleCreateNewUser={props.handleCreateNewUser}
                handleChange={props.handleChange}
                handleLogin={props.handleLogin}
                showLogin={props.showLogin}
                revealLogin={props.revealLogin}
            />
            {props.showLogin ?
                <LogIn 
                    handleChange={props.handleChange}
                    handleLogin={props.handleLogin} 
                /> :
                <>
                <h4>Already have an account?</h4>
                <button onClick={(evt)=>props.revealLogin(evt)}>Login</button>
                </>
                }    
        </div>
    )
}
