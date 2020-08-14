import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
    return (
        <div className='NavBar'>

            <p>10baggr</p>
            {/* { props.currentUser ? */}
            
            <Link to='/account'>ACCOUNT</Link> 
            <Link to='/userpage'>USER PAGE</Link>
            
            
            <Link to='/'>HOME</Link> 
            

    
        </div>
    )
}