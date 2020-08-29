import React, { Component } from 'react'
import axios from 'axios'
import { Modal, Button } from 'antd';
// import Button from 'react-bootstrap/Button'
import "../App.css";
import { Redirect, withRouter } from "react-router-dom";

export default class Account extends Component {
    constructor (props) {
    super(props)
    this.state = {
        updatedUser: null,
        // fname: '',
        // lname: '',
        // username: '',
        // email: '',
    }
    this.wrapper = React.createRef()
    }
    
    // logout = () => {       
    //     console.log(this.props.jwt) 
    //     var config = {
    //         method: 'GET',
    //         url: this.props.baseURL + 'user/logout',
    //         headers: { 
    //             'Authorization': `${this.props.jwt}`, 
    //             'Content-Type': 'application.json',
    //         },
    //         withCredentials: true,
    //     };
    //     axios(config)
    //     .then((res) => {
    //         this.props.handleLogout();
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    // handleChange = (evt) => {
    //     const editedUser = {...this.state.updatedUser};
    //     editedUser[evt.target.id] = evt.target.value;
    //     this.setState({
    //         updatedUser: editedUser,
    //         // fname: evt.target.value,
    //         // lname: evt.target.value,
    //         // username: evt.target.value,
    //         // email: evt.target.value,
    //     });
    //   };

    // handleUpdate = (evt) => {
    //     evt.preventDefault();
    //     console.log(this.props.currentUser)
    //     let data = JSON.stringify(this.props.currentUser);
    //     let config = {
    //         method: "POST",
    //         url: this.props.baseURL + "user/" + this.props.currentUser.id, 
    //         data: data,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         withCredentials: true,
    //     };
    //     axios(config) 
    //     .then((res) => {
    //         console.log(res);            
    //         return res.data;
    //     })
    //     .then((data) => {
    //         console.log(data.data);
    //         if (data.status.code === 200) {
    //             this.props.handleSuccessfulRegistration(data.data);
    //         } else {
    //             this.setState({
    //                 errorMessage: true
    //             })
    //         }
    //     })
    //     .catch((error) => console.error({Error: error}));
    // }

    // deleteUser = (evt) => {
    //     let id = JSON.stringify(this.props.currentUser.id);
    //     console.log(id)
    //     let config = {
    //         method: "DELETE",
    //         url: this.props.baseURL + "user/" + id, 
    //         data: id,
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `${this.props.jwt}`
    //         },
    //         withCredentials: true,
    //     };
    //     axios(config) 
    //     .then(() => {
    //         console.log("in the axios delete call");
    //         this.props.handleLogout();
    //     }).then(() => {
    //         //redirect isn't working
    //         return <Redirect to="/" />;
    //     })
    //     .catch((error) => console.error({Error: error}));
    // }

    render() {
        return (
            <>
            <div>
                {/* Turn into a modal */}
                <button type="button" onClick={(evt) => this.deleteUser(evt)}>Delete User</button>
                <button type="button">Account Info</button> 
                <button type="button" onClick={()=>this.logout()}>Logout</button>
            </div>
            <div>
                <div ref={this.wrapper}>{this.props.children}</div>
                <Button type="primary" onClick={() => this.props.setModalVisible(true)}>
                Update account info
                </Button>
                <Modal
                title="Update your account information"
                centered
                visible={this.props.modalVisible}
                onOk={() => this.props.setModalVisible(false)}
                onCancel={() => this.props.setModalVisible(false)}
                >
                
                <form onSubmit={(evt) => this.handleUpdate(evt)}>
                        <label htmlFor="fname">First Name:</label>
                        <input type="text" id="fname" 
                        value={ this.props.currentUser.fname }
                         onChange={(evt)=> this.handleChange(evt)}/><br/>
                        <label htmlFor="lname">Last Name:</label>
                        <input type="text" id="lname" value={this.props.currentUser.lname} onChange={(evt)=> this.props.handleChange(evt)}/><br/>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" value={this.props.currentUser.username} onChange={(evt)=> this.props.handleChange(evt)}/><br/>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={this.props.currentUser.email} onChange={(evt)=> this.props.handleChange(evt)}/><br/>
                        <button type='Submit'>Update Account</button>
                    </form>
                    
                </Modal>
            </div>
            </>
        )
    }
}

// ReactDOM.render(<App />, mountNode);