import React from 'react'

export default function ShowStock (props) {
//COME BACK AND TAKE A LOOK AT ROUNDING TO ONLY 2 DECIMAL PLACES. BOOKMARKED A MEDIUM ARTICLE IN PROJECT 4 FOLDER
    // setPrice = () => {
    // let currentPrice = this.props.stockPrice;
    // let roundedPrice = currentPrice.toFixed(2)
    // return roundedPrice
    // }
    

    return (
        <div>
            <h2>{props.symbol}</h2>
            <h4>Current Price: ${props.stockPrice}</h4>
            
        </div>
    )   
}
