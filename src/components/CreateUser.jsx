import React from 'react'
import LogIn from './LogIn';

export default function CreateUser(props) {
    return (
        <>
        <div>
            <>
            <h3>New to 10Baggr?</h3>
            <h3> Create an account and get started!</h3>
            <form onSubmit={(evt) => props.handleCreateNewUser(evt)}>
                <label htmlFor="fname">First Name:</label>
                <input type="text" id="fname" value={props.fname} onChange={(evt)=> props.handleChange(evt)}/><br/>
                <label htmlFor="lname">Last Name:</label>
                <input type="text" id="lname" value={props.lname} onChange={(evt)=> props.handleChange(evt)}/><br/>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={props.username} onChange={(evt)=> props.handleChange(evt)}/><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={props.password} onChange={(evt)=> props.handleChange(evt)}/><br/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={props.email} onChange={(evt)=> props.handleChange(evt)}/><br/>
                <input type='Submit' />
            </form>
            <div>    
                {props.showLogin ?
                <LogIn 
                    handleChange={props.handleChange}
                    handleLogin={props.handleLogin} 
                /> :
                <>
                <h4>Already have an account?</h4>
                <button onClick={(evt)=>props.revealLogin(evt)}>Login</button>
                </>
                }
            </div>
            </>
        </div>
        </>
    )
}