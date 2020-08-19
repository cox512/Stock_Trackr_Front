import React, { useState } from 'react';
import axios from 'axios';
import "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";


export default function Watchlist(props) {
    const [showNewListForm, setShowNewListForm] = useState(false)
    const [title, setTitle] = useState('');
    
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
        // Add a new stock to the selected Watchlist (after the user clicks on the name.)
        console.log("currentWatchlist ID: ", id)
        props.setCurrentWatchlist(id)
        let symbol = props.currentStock.symbol;
        console.log('addStock symbol: ', symbol)
        //Come back and check out this function call !!!!!
        if (symbol === undefined) {
            console.log('addStock if statement')
            return props.getStockList(id)        
        }   
        // Rewrite this stringify call as an object when you have the time.
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
            console.log('addStock returns: ', res);            
            // props.getStockList(res.data.data.watchlist.id)
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
                    <div>
                    <h3>What list would you like to add the stock to?</h3>
                    <Table>
                        <tbody >
                            {props.watchlists.map(list => {
                            return (    
                                <tr key={list.id}>  
                                    <td className="pick-list" onClick={()=>addStock(list.id)}>{list.title}</td>
                                    <td className="pick-list"><Button  variant="danger" key={list.key} type="button" onClick={()=>deleteWatchlist(list.id)}>x</Button></td>
                                </tr>
                            )})} 
                        </tbody>     
                    </Table>
                    
                    
                    {/* After user adds a stock to a watchlist, show that watchlist's array of stocks */}
                    { props.showStockArray ? null
                    // Run a function that gets all of the stocks in the selected watchlist and displays them.
                    : null
                    }
                    </div>
                    <div>
                    {/* If they don't have any watchlists, let them know. */}
                    { props.watchlists ? null :
                    <h3><i>You don't currently have any watchlists. Create one to get started!</i></h3> }
                    </div> 
                    
            </div>
            <div>
            {/*  if showNewListForm is true, reveal the create new list form. If false, show the create New List button. */}
            { showNewListForm ?
                <form onSubmit={(evt)=>createNewList(evt)}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" onChange={(evt) => handleChange(evt)} />
                    <input type="submit" value="Create List"/>
                </form> 
                : <button type="button" onClick={()=>(setShowNewListForm(true), props.setAddList(true))}>Create new watchlist</button>}
            </div>
        </div>
    )
}