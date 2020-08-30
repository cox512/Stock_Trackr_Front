import React, {createRef, useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import '../App.css'

export default function NavBar(props) {
    const [redirect, setRedirect] = useState(null)
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    

    // useEffect(() => {
    //     const node = wrapper.current;
    // }, [] )

    // const wrapper = createRef();

    const handleUpdate = (evt) => {
        evt.preventDefault();
        console.log(props.currentUser);
        let data = JSON.stringify(props.currentUser);
        let config = {
          method: "PUT",
          url: props.baseURL + "user/" + props.currentUser.id,
          data: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${props.jwt}`,
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
              props.handleSuccessfulRegistration(data.data);
              handleClose();
              setRedirect("/");
            } 
            // else {
            //   this.setState({
            //     errorMessage: true,
            //   });
            // }
          })
          .catch((error) => console.error({ Error: error }));
      };

    const logout = () => {       
        console.log(props.jwt) 
        var config = {
            method: 'GET',
            url: props.baseURL + 'user/logout',
            headers: { 
                'Authorization': `${props.jwt}`, 
                'Content-Type': 'application.json',
            },
            withCredentials: true,
        };
        axios(config)
        .then(() => {
            props.handleLogout();
            setRedirect("/");
        }).then(() => {
            setRedirect(null);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const deleteUser = () => {
        let id = JSON.stringify(props.currentUser.id);
        console.log(id)
        let config = {
            method: "DELETE",
            url: props.baseURL + "user/" + id, 
            data: id,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config) 
        .then(() => {
            console.log("in the axios delete call");
            props.handleLogout();
            setRedirect("/");
        }).then(() => {
            setRedirect(null);
        })
        .catch((error) => console.error({Error: error}));
    }

    return (
        <>
        <div className='nav-bar'>
            <div className="whole-logo">
            { redirect ? 
                <Redirect to={redirect} />
             : null}
            
            <h3 id="logo-text">
              10
              <img id="logo" src="./moneybag.png" alt="Logo" />
              bagger
            </h3>
            </div>

            <div className="links">
                <Link className="link" to='/'>HOME</Link> 
                <Link className="link" to='/dashboard'>DASHBOARD</Link>
                <Dropdown className='link' >
                    <Dropdown.Toggle id="dropdown"><img src="./settings-icon.png" alt="Settings"/></Dropdown.Toggle>
                    {props.currentUser !== null ?
                    <Dropdown.Menu >
                        <div className="dropdown-items">
                            <Dropdown.Item className="drop-item" href="#">
                                <Button variant="primary" onClick={()=> handleShow()}>
                                    Update Profile
                                </Button>

                            </Dropdown.Item>
                            {/* <Dropdown.Item className="drop-item" href="#">Change Password</Dropdown.Item> */}
                            <Dropdown.Item className="drop-item" href="#" onClick={() => deleteUser()} >Delete Account </Dropdown.Item>
                            <Dropdown.Item className="drop-item" href="#" onClick={() => logout()}>Logout</Dropdown.Item>
                        </div>
                    </Dropdown.Menu> : null }
                </Dropdown>{' '}
            </div> 
        </div>

        <div >
            {props.currentUser !== null ?
 
            <Modal
                animation={false}
                show={props.show}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit Your Profile</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(evt) => handleUpdate(evt)}>
                <Modal.Body>
                    
                    <Form.Group>
                        <Form.Label htmlFor="fname">First Name</Form.Label>
                        <Form.Control type="text" id='fname' value={ props.currentUser.fname } onChange={(evt)=> props.handleChange(evt)}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label htmlFor="lname">Last Name</Form.Label>
                        <Form.Control type="text" id="lname" value={ props.currentUser.lname } onChange={(evt)=> props.handleChange(evt)}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label htmlFor="usesrname">Username</Form.Label>
                        <Form.Control id="username" type="text" value={ props.currentUser.username } onChange={(evt)=> props.handleChange(evt)}/>
                    </Form.Group>

                    <Form.Group >
                        <Form.Label htmlFor="email">Email address</Form.Label>
                        <Form.Control id="email" type="email" value={ props.currentUser.email } onChange={(evt)=> props.handleChange(evt)}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit">Update</Button>
                </Modal.Footer>
                </Form>

            </Modal> : null}
        </div>
        </>
    )
}