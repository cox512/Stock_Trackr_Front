import React from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
// import axios from "axios";

import { Redirect } from "react-router-dom";

export default function Home(props) {

    // const [watchlists, setWatchlists] = useState([])

    if (props.loginStatus) {
        return <Redirect to='/userpage'/>
    }

    return (
        <div>
            <h1>HOME PAGE</h1>
            
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
