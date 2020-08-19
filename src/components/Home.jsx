import React from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import { Redirect} from "react-router-dom";
import "../App.css";
import Button from "react-bootstrap/Button";


export default function Home(props) {

    if (props.loginStatus) {
        return <Redirect to='/dashboard'/>
    }

    return (
        <div>
            <div className="site-layout-content">
                <div className="createUser-div">
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
                        <Button variant="outline-secondary" onClick={(evt)=>props.revealLoginBox(evt)}>Login</Button>
                    </>
                    }   
                </div>
                        
                    <img style={{position: 'relative'}} className="home-bg" src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' alt="Logo"/>
                <div className="leads">
                    <h3 id="lead-lines">Research stocks ... <br/>
                    Add them to your watchlists ... <br/>
                    Find the next 10Baggr!
                    </h3>
                </div>
            </div>
            <footer style={{ textAlign: 'left' }}>ten-bagger ©2020</footer>
        </div>
    )
}
