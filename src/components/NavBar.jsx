import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
// import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import axios from 'axios';
import '../App.css'
import ButtonGroup from 'antd/lib/button/button-group';

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//     <a
//       href="#"
//       ref={ref}
//       onClick={(e) => {
//         e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children}
//       &#x25bc;
//     </a>
//   ));


export default function NavBar(props) {


    const handleChange = (evt) => {
        const editedUser = {...this.state.updatedUser};
        editedUser[evt.target.id] = evt.target.value;
        this.setState({
            updatedUser: editedUser,
            // fname: evt.target.value,
            // lname: evt.target.value,
            // username: evt.target.value,
            // email: evt.target.value,
        });
      };

    const handleUpdate = (evt) => {
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

    const logout = () => {       
        console.log(this.props.jwt) 
        var config = {
            method: 'GET',
            url: this.props.baseURL + 'user/logout',
            headers: { 
                'Authorization': `${this.props.jwt}`, 
                'Content-Type': 'application.json',
            },
            withCredentials: true,
        };
        axios(config)
        .then((res) => {
            this.props.handleLogout();
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const deleteUser = (evt) => {
        let id = JSON.stringify(this.props.currentUser.id);
        console.log(id)
        let config = {
            method: "DELETE",
            url: this.props.baseURL + "user/" + id, 
            data: id,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${this.props.jwt}`
            },
            withCredentials: true,
        };
        axios(config) 
        .then(() => {
            console.log("in the axios delete call");
            this.props.handleLogout();
        }).then(() => {
            //redirect isn't working
            return <Redirect to="/" />;
        })
        .catch((error) => console.error({Error: error}));
    }

    

    return (
        <div className='nav-bar'>
            <div className="whole-logo">
            <h3 id="logo-text">
              10
              <img id="logo" src="./moneybag.png" alt="Logo" />
              bagger
            </h3>
            </div>
            {/* <div className="links"> */}
            {/* { props.currentUser ? */}
            {/* <div className="links">
                <Link className="link" to='/'>HOME</Link> 
                <Link className="link" to='/dashboard'>DASHBOARD</Link>
                <DropdownMenu className="link" id="gear" userName={props.currentUser.username} position="left" triggerType="image" trigger="./settings-icon.png">
                    <MenuItem text="Edit Profile" location="/profile" />
                    <MenuItem text="Change Password" location="/change-password" />
                    <MenuItem text="Delete Account" onClick={deleteUser} />
                    <MenuItem text="Logout" onClick={logout} />
                </DropdownMenu>
            </div> */}

            <div className="links">

                <Link className="link" to='/'>HOME</Link> 
                <Link className="link" to='/dashboard'>DASHBOARD</Link>
                <Dropdown className='link' as={ButtonGroup}>
                    <Dropdown.Toggle id="dropdown"><img src="./settings-icon.png" /></Dropdown.Toggle>
                    <Dropdown.Menu >
                        <div className="dropdown-items">
                            <Dropdown.Item className="drop-item" href="#">Update Profile</Dropdown.Item>
                            <Dropdown.Item className="drop-item" href="#">Change Password</Dropdown.Item>
                            <Dropdown.Item className="drop-item" href="#" onClick={() => deleteUser()} >Delete Account </Dropdown.Item>
                            <Dropdown.Item className="drop-item" href="#" onClick={() => logout()}>Logout</Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>{' '}
            {/* <Link className="link" to='/account'>ACCOUNT</Link> */}
            </div> 
        </div>
    )
}