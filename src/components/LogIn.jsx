import React from 'react'

export default function LogIn(props) {

    
    return (
        <div>
            <form onSubmit={(evt)=>props.handleLogin(evt)}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" onChange={(evt)=>props.handleChange(evt)}/><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(evt)=>props.handleChange(evt)}/><br/>
                <input type="submit" value="Login"/>
            </form>   
        </div>
    )
}
