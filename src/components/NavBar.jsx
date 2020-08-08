import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <div className='NavBar'>
            <Link to='/'>HOME</Link>
            <Link to='/account'>ACCOUNT</Link>    
            <Link to='/userpage'>USER PAGE</Link>
            <Link to='/watchlist'>WATCHLISTS</Link>
    
        </div>
    )
}