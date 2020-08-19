import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <div className='nav-bar'>
            <div className="whole-logo">
            <h3 id="logo-text">
              10
              <img id="logo" src="./moneybag.png" alt="Logo" />
              bagger
            </h3>
            </div>
            <div className="links">
            {/* { props.currentUser ? */}
            <Link className="link" to='/'>HOME</Link> 
            <Link className="link" to='/dashboard'>DASHBOARD</Link>
            <Link className="link" to='/account'>ACCOUNT</Link>
            </div> 
        </div>
    )
}