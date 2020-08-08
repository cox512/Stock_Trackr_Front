import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <Link to='/'>HOME</Link>
            <Link to='/login'>LOGIN</Link>    
            <Link to='/register'>CREATE USER</Link> 
            <Link to='/watchlist'>WATCHLISTS</Link>
            
            <div>
                <h6>Welcome {props.currentUser.fname}</h6>    
            </div>     
    
        </div>
    )
}