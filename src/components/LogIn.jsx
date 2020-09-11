import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css';
import { withCookies, useCookies } from 'react-cookie'

function LogIn (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logInError, setLogInError] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['username'])
    // const [redirect, setRedirect]   = useState(false)

    const handleLoginSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const res = await axios.post(props.baseURL + "user/login", {
                username: username,
                password: password
            }, {withCredentials: true})
            console.log(res.data.data.username)
            // setCookie('username', res.data.data.username)
            // setCookie('userid', res.data.data.id)
            localStorage.setItem('jwt', res.data.status['token'])
            if (res.data.status.code === 200) {
                props.handleSuccessfulRegistration(res.data.data);
            } else {
                console.log(props.jwt)
                setLogInError(true);            
            }
        }
        catch (error) {
            console.log("Login Error:", error );
        };
    }

    return (
        <div>
            { logInError ? 
                <>
                    <h3>There was an error logging you in. Please try again.</h3>
                    <Button type="button" onClick={()=>setLogInError(false)}>Okay</Button>
                </> :
                <Form onSubmit={(evt)=>handleLoginSubmit(evt)}>
                    <Form.Group>
                        <Form.Label htmlFor="username">Username:</Form.Label>
                        <Form.Control type="text" id="username" value={username} onChange={(evt) => setUsername(evt.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password:</Form.Label>
                        <Form.Control type="password" id="password" 
                            onChange={(evt) => setPassword(evt.target.value)} 
                            value={password}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Log In</Button>
                </Form>
            }    
        </div>
    )
}

export default withCookies(LogIn);