import React, { Component } from 'react'
import axios from 'axios';

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
        <button type="button" onClick={()=>this.resetErrorMessage()}>Okay</button>
        </> :
        <form onSubmit={(evt) => this.createNewUser(evt)}>
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" value={this.state.fname} onChange={(evt)=> this.handleChange(evt)}/><br/>
          <label htmlFor="lname">Last Name:</label>
          <input type="text" id="lname" value={this.state.lname} onChange={(evt)=> this.handleChange(evt)}/><br/>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={this.state.username} onChange={(evt)=> this.handleChange(evt)}/><br/>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={this.state.password} onChange={(evt)=> this.handleChange(evt)}/><br/>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={this.state.email} onChange={(evt)=> this.handleChange(evt)}/><br/>
          <button type='Submit'>Create Account</button>
        </form>
        }
      </div>
    )
  }
}