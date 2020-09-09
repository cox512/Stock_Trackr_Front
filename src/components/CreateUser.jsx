import React, { Component } from 'react'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css';



export default class CreateUser extends Component {
    state = {
        fname: '',
        lname: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        email: '',
        errorMessage: false,
    }

    handleChange = (evt) => {
        this.setState({
          [evt.target.id]: evt.target.value,
        });
      };
    
    resetErrorMessage = () => {
        this.setState({
            errorMessage: false,
        })
    }

    createNewUser = (evt) => {
        evt.preventDefault();
        console.log(this.state)
        let data = JSON.stringify(this.state);
        let config = {
            method: "POST",
            url: this.props.baseURL + "user/register",
            headers: {
              "Content-Type": "application/json",
            },
            data: data,
            withCredentials: true,
          };
          axios(config)
            .then((res) => {
              console.log(res);
            //   return res.data;
            // })
            // .then((data))
              localStorage.setItem('jwt', res.data.status.token)
              if (res.data.status.code === 200) {
                this.props.handleSuccessfulRegistration(res.data.data);
              } else {
                this.setState({
                    errorMessage: true
                })
              }
            })
            .catch((error) => {
              console.log("Registration Error: ", error);
            });
    };

  render () {
    return (
      <div className="form">
        <h3 className="form-header">New to 10bagger?<br/>
          Create an account and get started!</h3>
        { this.state.errorMessage ? 
        <>
        <h3>There was an error creating your account. Please try again.</h3>
        <Button type="button" variant="priimay" onClick={()=>this.resetErrorMessage()}>Okay</Button>
        </> :
        <Form onSubmit={(evt) => this.createNewUser(evt)}>
            <Form.Group>
                <Form.Label htmlFor="fname">First Name</Form.Label>
                <Form.Control type="text" id='fname' value={ this.state.fname } onChange={(evt)=> this.handleChange(evt)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label htmlFor="lname">Last Name</Form.Label>
                <Form.Control type="text" id="lname" value={ this.state.lname } onChange={(evt)=> this.handleChange(evt)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label htmlFor="usesrname">Username</Form.Label>
                <Form.Control id="username" type="text" value={ this.state.username } onChange={(evt)=> this.handleChange(evt)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control id="password" type="password" value={ this.state.password } onChange={(evt)=> this.handleChange(evt)}/>
            </Form.Group>
            <Form.Group >
                <Form.Label htmlFor="email">Email address</Form.Label>
                <Form.Control id="email" type="email" value={ this.state.email } onChange={(evt)=> this.handleChange(evt)}/>
            </Form.Group>
          <Button 
            variant="primary" 
            type="submit">Create Account</Button>
        </Form>
        }
      </div>
    )
  }
}