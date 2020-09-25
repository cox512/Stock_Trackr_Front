import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import 'materialize-css';

export default function LogIn (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [logInError, setLogInError] = useState(false)

    const handleLoginSubmit = async (evt) => {
        evt.preventDefault()
        console.log('handleLoginSubmit');
        console.log("username:", username)
       try { 
            const res = await axios.post(props.baseURL + "user/login", {
                username: username,
                password: password
            },
            {
                headers: {
                    "Content-Type": "application/json",
                  },
            },
             {withCredentials: true})
            .then(res => {
                if(res.data.status["code"] === 401) {
                    return setLogInError(true);
                }
                props.setCurrentUser(res.data.data)
                return res.data;
            }).then((data) => {
                console.log("data:", data)
                localStorage.setItem('jwt', data.status['token']);
                localStorage.setItem('fname', data.data.fname);
                props.handleSuccessfulRegistration(data.data);
                console.log("currentUser: ", props.currentUser)  
            })
        }
        catch (error) {
            console.error("Catch Error: ", error);
            localStorage.clear();
            setLogInError(true);
        }
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