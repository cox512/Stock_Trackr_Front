import React from 'react';
import CreateUser from './CreateUser';
import LogIn from './LogIn';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Redirect } from "react-router-dom";
import "../App.css";
import logo from "./Test.jpg"
// import { ReactComponent as Logo } from '../moneybag.jpg';



const { Header, Content, Footer } = Layout;
const { SubMenu, parentMenu } = Menu;
// const logo = require('./moneybag.jpeg');


export default function Home(props) {

    // const [watchlists, setWatchlists] = useState([])

    if (props.loginStatus) {
        return <Redirect to='/userpage'/>
    }

    console.log(logo);

    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">
                            10
                            {/* <Logo /> */}
                            <img  src='./Test.jpg' alt="Logo"/>
                            bagger
                        </Menu.Item>
                        <Menu.Item key="2">nav 2</Menu.Item>
                        <Menu.Item key="3">nav 3</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ }}>
                {/* style={{position: 'absolute'}} */}
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
                            <button onClick={(evt)=>props.revealLoginBox(evt)}>Login</button>
                            </>
                            }   
                        </div>
                        {/* 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80' */}
                        <img style={{position: 'relative'}} className="home-bg" src='' alt="Logo"/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>ten-bagger ©2020</Footer>
            </Layout>
        
            {/* <h1>HOME PAGE</h1> */}
            
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
