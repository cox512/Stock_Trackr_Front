import React from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import { Redirect } from "react-router-dom";

export default function Home(props) {

    if (props.redirect) {
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
