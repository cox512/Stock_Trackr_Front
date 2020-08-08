import React from 'react'
import CreateUser from './CreateUser';
import StockSearch from './StockSearch';

export default function Home(props) {
    return (
        <div>
            <h1>This is the Home Page</h1>
            <StockSearch
                handleChange={props.handleChange}
                handleStockSearch={props.handleStockSearch}
                ticker={props.ticker}

            />
            <CreateUser
                handleCreateNewUser={props.handleCreateNewUser}
                handleChange={props.handleChange}
                handleLogin={props.handleLogin}
                showLogin={props.showLogin}
                revealLogin={props.revealLogin}
            />    
        </div>
    )
}
