import React, {useEffect} from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import { Redirect} from "react-router-dom";
import "../App.css";
import { Tabs, Tab, Container } from '@material-ui/core';
import 'materialize-css';

export default function Home (props) {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    
    // if (props.logInStatus) {
    //     console.log("Home if statement login status:", props.logInStatus)
    //     return <Redirect to='/dashboard'/>
    // }
    useEffect (() => {
        props.setRedirect(null)
    }, [])
    
    return (
        <>
        {props.logInStatus ?  <Redirect to='/dashboard' />: null}

        <div className="bg-color">
        <div className='home-bg '>
            {/* <Container > */}
            <div className="site-layout-content stack">
                <div className="leads">
                    <h3 className="lead-lines">
                        Research stocks ...</h3>
                    <h3 className="lead-lines">
                        Add them to your watchlists ... 
                    </h3>
                    <h3 className="lead-lines">
                        Find the next 10bagger!
                    </h3>
                </div>
                <div className="createUser-div">
                    <Tabs
                        value={selectedTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                    >
                        <Tab label="Create Account" />
                        <Tab label="Sign In" />
                    </Tabs>
                    {selectedTab === 0 &&
                        <CreateUser 
                            handleSuccessfulRegistration={props.handleSuccessfulRegistration}
                            baseURL={props.baseURL}
                        />
                    }
                    {selectedTab === 1 &&
                        <LogIn
                        handleSuccessfulRegistration={props.handleSuccessfulRegistration}
                        handleChange={props.handleChange}
                        baseURL={props.baseURL}
                        currentUser={props.currentUser}
                        setCurrentUser={props.setCurrentUser}
                        // setJwt={props.setJwt}
                        />
                    }
                </div>
            </div>
            {/* </Container> */}
        </div>
       </div>
        </>
        
    )
}
