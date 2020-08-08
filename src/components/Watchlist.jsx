import React from 'react'
import { Redirect } from 'react-router-dom';

export default function Watchlist(props) {
    if (props.redirect) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            <h1>This is the Watchlist</h1>
            <h2>{props.message}</h2>
            <button onClick={()=> props.handleRedirect()}>CLICK ME</button>    
        </div>
    )
}