import React, { useState } from 'react'
import axios from "axios";

export default function ShowStock (props) {
//COME BACK AND TAKE A LOOK AT ROUNDING TO ONLY 2 DECIMAL PLACES. BOOKMARKED A MEDIUM ARTICLE IN PROJECT 4 FOLDER
    // setPrice = () => {
    // let currentPrice = this.props.stockPrice;
    // let roundedPrice = currentPrice.toFixed(2)
    // return roundedPrice
    // }
    const [addList, setAddList] = useState(false);
    const [watchlists, setWatchlists] = useState('')

    
    const handleChange = (evt) => {
        setWatchlists(evt.target.value)
    }

    const createNewList = (evt) => {
        evt.preventDefault();
        let data = JSON.stringify(watchlists);
        console.log(data)
        let config = {
            method: "POST",
            url: props.baseURL + "api/v1/watchlists/", 
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
            setWatchlists(data.data);
            // this.setState({
            // watchlists: data.data,
            // });
            console.log(watchlists);
        })
        .catch((error) => console.error({Error: error}));
    }
    
    return (
        <div>
            <h2>{props.symbol}</h2>
            <h4>Current Price: ${props.stockPrice}</h4>
            { addList ? 
            <form onSubmit={(evt)=>createNewList(evt)}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" onChange={(evt) => handleChange(evt)} value={watchlists}/>
                <input type="submit" value="Create List"/>
            </form> :
            <button type="button" onClick={() => setAddList(true)}>Add to Watchlist</button>
            }
        </div>
    )
    
}
