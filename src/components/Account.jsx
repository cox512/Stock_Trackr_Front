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
       
    }
    this.wrapper = React.createRef()
    }

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