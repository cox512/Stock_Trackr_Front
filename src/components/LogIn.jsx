import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css';


  
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

    handleLoginSubmit = (evt) => {
        evt.preventDefault()
        let data = JSON.stringify(this.state);
        console.log(this.state)
        let config = {
            method: "POST",
            url: this.props.baseURL + "user/login",
            headers: { 
                "Content-Type": "application/json",
            },
            data: data,
            withCredentials: true,  
        };
        axios(config)
        .then(res => {
            console.log(res)
            return res.data;
        })
        .then((data) => {
            localStorage.setItem('jwt', data.status['token'])
            if (data.status.code === 200) {
                this.props.handleSuccessfulRegistration(data.data);
            } else {
                console.log(this.props.jwt)
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
                        <Button type="button" onClick={()=>this.resetErrorMessage()}>Okay</Button>
                    </> :
                <Form onSubmit={(evt)=>this.handleLoginSubmit(evt)}>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control type="text" id="username" value={this.state.username} onChange={(evt)=>this.handleChange(evt)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" 
                        onChange={(evt)=>this.handleChange(evt)} 
                        value={this.state.password}/>
                    </Form.Group>
                    <Button type="submit" variant="primary">Log In</Button>
                    </Form>
                }    
            </div>
        )
    }
}
