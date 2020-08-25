import React, { useState } from 'react';
import axios from 'axios';
import "react-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form"
// import Form from 'antd/lib/form/Form';


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
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config)
        .then(res => {
            return res;
        }) 
        .then((data) => {
            console.log(data);            
            setShowNewListForm(false);
            props.showWatchlists();
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
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config) 
        .then((res) => {
            console.log('addStock returns: ', res);
            props.getStockList(id)
            //GET the currentWatchlist details            
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
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config) 
        .then((res) => {
        //     return res.json()        
        // }).then(data => {
            console.log("in the axios delete call");            
            props.showWatchlists()
        })
        .catch((error) => console.error({Error: error}));
    }
    
    return (
        <div>
            <div>
                <h3>WATCHLISTS</h3>
                    <div>
                        <h3>What list would you like to add the stock to?</h3>
                        {/* This first ternary isn't working. Not sure why. */}
                        { props.watchlists ? null :
                        <h3><i>You don't currently have any watchlists. Create one to get started!</i></h3>}
                        { props.watchlists ?
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
                        </Table>  : null }
                    </div>
            </div>
            <div>
            {/*  if showNewListForm is true, reveal the create new list form. If false, show the create New List button. */}
            { showNewListForm ?
                <Form onSubmit={(evt)=>createNewList(evt)}>
                    <Form.Group id="title">
                        <Form.Label htmlFor="title" >Title:</Form.Label>
                        <Form.Control type="text" placeholder="Name your watchlist" onChange={(evt) => handleChange(evt)}/>
                    </Form.Group>
                    <Button variant="outline-dark" type="submit">Create List</Button>
                </Form> 
                : <Button variant="outline-dark" type="button" onClick={()=>(setShowNewListForm(true), props.setAddList(true))}>Create new watchlist</Button>}
            </div>
        </div>
    )
}