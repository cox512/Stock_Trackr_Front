import React, { useState } from 'react'
import axios from "axios";

export default function ShowStock (props) {
//COME BACK AND TAKE A LOOK AT ROUNDING TO ONLY 2 DECIMAL PLACES. BOOKMARKED A MEDIUM ARTICLE IN PROJECT 4 FOLDER
    // setPrice = () => {
    // let currentPrice = this.props.stockPrice;
    // let roundedPrice = currentPrice.toFixed(2)
    // return roundedPrice
    // }
    
    const [showNewListForm, setShowNewListForm] = useState(false)
    const [title, setTitle] = useState('');
    const [seeAddToWatchlist, setSeeAddToWatchlist] = useState(true)

    const handleChange = (evt) => {
        setTitle(evt.target.value)
    }
    const createNewList = (evt) => {
        evt.preventDefault();
        let data = JSON.stringify(title);
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
            setShowNewListForm(false);
            props.handleWatchlistSet(data.data);
        })
        .catch((error) => console.error({Error: error}));
    }
    
    const addStock = (id) => {
        let symbol = props.symbol.toUpperCase();
        console.log(symbol)
        let data = JSON.stringify([symbol, id]);
        console.log(data)
        let config = {
            method: "POST",
            url: props.baseURL + "api/v1/stocks/", 
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        axios(config) 
        .then((res) => {
            // console.log(res);            
            return res.data;
        })
        .then((data) => {
            console.log(data.data);
            props.handleWatchlistSet(data.data)
        })
        .catch((error) => console.error({Error: error}));
    }

    const deleteWatchlist = (id) => {
        let data = JSON.stringify(id);
        console.log(data)
        let config = {
            method: "DELETE",
            url: props.baseURL + "api/v1/watchlists/" + id, 
            data: data,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        axios(config) 
        .then(() => {
            // console.log(res);            
            props.handleWatchlistSet()        
        })
        .catch((error) => console.error({Error: error}));
    }

    const addToWatchlistClick = (evt) =>{
        props.showWatchlists()
        props.setAddList(true);
        setSeeAddToWatchlist(false);
    }

    return (
        <div>
            <h2>{props.symbol}</h2>
            <h4>Current Price: ${props.stockPrice}</h4>
            <div>
                { seeAddToWatchlist ?
                <button type="button" onClick={(evt) => addToWatchlistClick(evt)}>Add to Watchlist</button> : null}
                {/* On button click (when addList=true), dropdown menu shows all of the current watchlists, ending with the opportunity to create a new one. */}
                { props.addList ?
                <div>
                    {/* Different message depending on if they have any Watchlists */}
                    {props.watchlists ?
                    <h3>What list would you like to add the stock to?</h3> :
                    <h3>You don't currently have any watchlists. Create one to get started!</h3>
                    }
                    <ul>
                        {props.watchlists.map(list => {
                            return (   
                                <li className="pick-list" key={list.id} onClick={()=>addStock(list.id)}>{list.title}<button key={list.key} type="button" onClick={()=>deleteWatchlist(list.id)}>x</button></li>    
                            )
                        })}
                    </ul> 
                    <button type="button" onClick={()=>(setShowNewListForm(true), props.setAddList(false))}>Create new watchlist</button>
                </div> 
                : null 
                } 
            </div>
            {/*  if showNewListForm is true, reveal the create new list form. If false, show the create New List button. */}
            { showNewListForm ?
                <form onSubmit={(evt)=>createNewList(evt)}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={(evt) => handleChange(evt)} />
                    <input type="submit" value="Create List"/>
                </form> 
                : null}
        </div>
    )   
}
