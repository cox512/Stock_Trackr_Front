import React from 'react'

export default function StockSearch(props) {

    
    return (
        <div>
            <p>Enter a ticker symbol below</p>
            <form onSubmit={(evt)=>props.handleStockSearch(evt)}>
                <label htmlFor="ticker">Stock:</label>
                <input type="text" id="ticker" placeholder="TICKER SYMBOL" onChange={(evt)=>props.handleChange(evt)}/><br/>
                <input type="submit" value="Search"/>
            </form>   
        </div>
    )
}
