import React from 'react'
import axios from 'axios'
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"
import "../App.css";


export default function StockList (props) {

    const deleteStock = (stockId) => {
        let data = JSON.stringify(stockId);
        console.log(data)
        let config = {
            method: "DELETE",
            url: props.baseURL + "api/v1/stocks/" + stockId, 
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${props.jwt}`
            },
            withCredentials: true,
        };
        axios(config) 
        .then(() => {
            console.log("in the axios delete call");
            props.getStockList(props.currentWatchlist.id)
        })
        .catch((error) => console.error({Error: error}));
    }

    // useEffect calls stockStats upon the state of showStockArray chaning. It cycles through all of the stocks in the watchlist and gets information on all of them and  puts them into the stockDetails array.HOLD ON THIS FOR NOW. There's a promises issue.
    // const  stockStats = () => {
    //     console.log('stockStats')
    //     let random = Math.floor(Math.random() * 2);
    //     let API_KEY = [
    //         process.env.REACT_APP_API_KEY1,
    //         process.env.REACT_APP_API_KEY2,
    //       ];
    //     const newStockDetails =[]
    //     props.stockList.map (async stock => {
    //         const promise = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}&apikey=${API_KEY[random]}`)
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         })
    //         const result = await Object.entries(promise)
    //         newStockDetails.push(result)
    //         console.log('newStockDetails', newStockDetails)
    //         return setStockDetails(newStockDetails)
    //     })
    // }
    
    // useEffect(() => {
    //     console.log('showStockArray has changed')
    //     stockStats()
    // }, [props.showStockArray])
    
    return (
        <div >
            { props.showStockArray ? 
            <Table >
                <tbody>  
                { props.stockList.map(stock => {
                    return (
                        <tr key={stock.id}>
                            <td className="pick-list">{stock.ticker}</td>
                            <td className="pick-list"><Button  variant="danger" type="button" onClick={()=>deleteStock(stock.id)}>x</Button></td>
                         </tr>
                    )}
                )}
                </tbody>
            </Table>   
             : null }
        </div>
    )
}
