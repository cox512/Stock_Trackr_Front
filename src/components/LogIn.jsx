import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//     };

// const tailLayout = {
//     wrapperCol: { offset: 8, span: 16 },
//     };
  
export default class LogIn extends Component {
    state = {
        username: '',
        password: '',
        logInError: false,
        redirect: false,       
    }
    
    handleChange = (evt) => {
        this.setState({
          [evt.target.id]: evt.target.value,
        });
    };

    resetErrorMessage = () => {
        this.setState({
            logInError: false,
        })
    }

    handleSubmit = (evt) => {
        console.log(this.props.baseURL)
        evt.preventDefault()
        let data = JSON.stringify(this.state);
        console.log(this.state)
        let config = {
            method: "POST",
            url: this.props.baseURL + "user/login",
            headers: {
                // "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                // "Set-Cookie": "cross-site-cookie=name; SameSite=None; Secure"
            },
            data: data,
            withCredentials: true,  
        };
        axios(config)
            .then((res) => {
                console.log(res.data);
                return res.data;
            })
            .then((data) => {
                if (data.status.code === 200) {
                    this.props.handleSuccessfulRegistration(data.data);
                } else {
                    this.setState({
                        logInError: true,
                    })                
                }
            })
            .catch((error) => {
                console.log("Login Error:", error );
        });
    }

   
    render () {
        return (
            <div>
                { this.state.logInError ? 
                    <>
                        <h3>There was an error logging you in. Please try again.</h3>
                        <button type="button" onClick={()=>this.resetErrorMessage()}>Okay</button>
                    </> :
                <form onSubmit={(evt)=>this.handleSubmit(evt)}>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" onChange={(evt)=>this.handleChange(evt)} value={this.state.username}/><br/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(evt)=>this.handleChange(evt)} value={this.state.password}/><br/>
                    <input type="submit" value="Login"/>
                </form>
                }    
            </div>
        )
    }
}
