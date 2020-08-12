import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button } from 'antd';

export default class Account extends Component {
    state = {
        modalVisible: false,
      };
    
    setModalVisible(modalVisible) {
        this.setState({ modalVisible });
      }
    

    logout = () => {        
        var config = {
            method: 'GET',
            url: this.props.baseURL + 'user/logout',
            withCredentials: true,
        };
        axios(config)
        .then((res) => {
            // console.log(res)
            this.props.handleLogout();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleUpdate = (evt) => {
        evt.preventDefault();
        console.log(this.props.currentUser)
        let data = JSON.stringify(this.props.currentUser);
        let config = {
            method: "POST",
            url: this.props.baseURL + "user/" + this.props.currentUser.id, 
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        axios(config) 
        .then((res) => {
            console.log(res);            
            return res.data;
        })
        .then((data) => {
            console.log(data.data);
            if (data.status.code === 200) {
                this.props.handleSuccessfulRegistration(data.data);
              } else {
                this.setState({
                    errorMessage: true
                })
              }
        })
        .catch((error) => console.error({Error: error}));

    }

    render() {
        return (
            <>
            <div>
                {/* Turn into a modal */}
                <button type="button">Delete User</button>
                <button type="button">Account Info</button> 
                <button type="button" onClick={()=>this.logout()}>Logout</button>
            </div>
            <div>
                <Button type="primary" onClick={() => this.setModalVisible(true)}>
                Update account info
                </Button>
                <Modal
                title="Update your account information"
                centered
                visible={this.state.modalVisible}
                onOk={() => this.setModalVisible(false)}
                onCancel={() => this.setModalVisible(false)}
                >
                
                <form onSubmit={(evt) => this.handleUpdate(evt)}>
                        <label htmlFor="fname">First Name:</label>
                        <input type="text" id="fname" value={this.props.currentUser.fname} onChange={(evt)=> this.handleChange(evt)}/><br/>
                        <label htmlFor="lname">Last Name:</label>
                        <input type="text" id="lname" value={this.props.currentUser.lname} onChange={(evt)=> this.handleChange(evt)}/><br/>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={this.props.currentUser.username} onChange={(evt)=> this.handleChange(evt)}/><br/>
                        {/* <label htmlFor="password">Password:</label>
                        <input type="password" id="password" onChange={(evt)=> this.handleChange(evt)}/><br/>
                        <label htmlFor="passwordConfirmation">Confirm Password:</label>
                        <input type="password" id="passwordConfirmation" value={this.props.currentUser.passwordConfirmation} onChange={(evt)=> this.handleChange(evt)}/><br/> */}
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={this.props.currentUser.email} onChange={(evt)=> this.handleChange(evt)}/><br/>
                        <button type='Submit'>Create Account</button>
                    </form>
                    
                </Modal>
            </div>
            </>
        )
    }
}

// ReactDOM.render(<App />, mountNode);