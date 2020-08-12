import React, { Component } from 'react'
import axios from 'axios'

export default class Account extends Component {

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

    render() {
        return (
            <div>
                {/* Turn into a modal */}
                <button type="button">Delete User</button>
                <button type="button">Account Info</button> 
                <button type="button" onClick={()=>this.logout()}>Logout</button>
            </div>
        )
    }

}
