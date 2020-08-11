import React, { Component } from 'react'
import axios from 'axios'

export default class Account extends Component {

    logout = () => {
        console.log("logout")        
        var data = JSON.stringify(this.props.currentUser);
        console.log(data)
        
        var config = {
            method: 'GET',
            url: this.props.baseURL + 'user/logout',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data,
            withCredentials: true,
        };
        axios(config)
        .then((res) => {
            console.log(res.data)
            // return res.data;
        })
        .then (() => {
            this.setState({
                currentUser: '',
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <button onClick={()=>this.logout()}>Logout</button>
            </div>
        )
    }

}
