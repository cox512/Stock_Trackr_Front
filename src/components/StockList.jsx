import React  from 'react'
import axios from 'axios'

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
            },
            withCredentials: true,
        };
        axios(config) 
        .then(() => {
            console.log("in the axios delete call");
            // props.handleStockDelete()
            props.getStockList(props.currentWatchlist)
            
            
        })
        .catch((error) => console.error({Error: error}));
    }
    
    return (
        <div>
            { props.showStockArray ? 
            <ul>
            {props.stockList.map(stock => {
                return (
                    <div className="container">  
                    <li className="pick-list" key={stock.id} onClick={()=> props.getStockDetails(stock.id)}>{stock.ticker}</li>
                    <button key={stock.key} type="button" onClick={()=>deleteStock(stock.id)}>x</button>
                    </div>     
                )
            })}
        </ul> :
            null
            }
                
        </div>
    )
    
}
