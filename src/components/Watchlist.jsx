import React, { useState } from 'react';
import axios from 'axios';

export default function Watchlist(props) {
    const [showNewListForm, setShowNewListForm] = useState(false)
    const [seeAddToWatchlist, setSeeAddToWatchlist] = useState(true)
    const [title, setTitle] = useState('');
    
    const addToWatchlistClick = (evt) =>{
        props.showWatchlists()
        props.setAddList(true);
        setSeeAddToWatchlist(false);
    }

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
            console.log("in the axios delete call");            
            props.handleWatchlistSet()        
        })
        .catch((error) => console.error({Error: error}));
    }
    return (
        <div>
            <div>
                <h3>WATCHLISTS</h3>
                {/* { seeAddToWatchlist ? 
                // <button type="button" onClick={(evt) => addToWatchlistClick(evt)}>Add {props.symbol} to Watchlist</button> : null} */}
                {/* On button click (when addList=true), dropdown menu shows all of the current watchlists, ending with the opportunity to create a new one. */}
                {/* { props.addList ? */}
                <div>
                    {/* Different message depending on if they have any Watchlists */}
                    
                    <div>
                    <h3>What list would you like to add the stock to?</h3> 
                    {props.watchlists ?
                    <ul>
                        {props.watchlists.map(list => {
                            return (
                                <div className="container">  
                                <li className="pick-list" key={list.id} onClick={()=>addStock(list.id)}>{list.title}</li>
                                <button key={list.key} type="button" onClick={()=>deleteWatchlist(list.id)}>x</button>
                                </div>     
                            )
                        })}
                    </ul> 
                    :
                    <h3>You don't currently have any watchlists. Create one to get started!</h3> }
                    </div> 
                    <button type="button" onClick={()=>(setShowNewListForm(true), props.setAddList(false))}>Create new watchlist</button>
                </div> 
                {/* : null 
                }  */}
            </div>
            <div>
            {/*  if showNewListForm is true, reveal the create new list form. If false, show the create New List button. */}
            { showNewListForm ?
                <form onSubmit={(evt)=>createNewList(evt)}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={(evt) => handleChange(evt)} />
                    <input type="submit" value="Create List"/>
                </form> 
                : null}
            </div>
        </div>
    )
}