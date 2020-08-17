import React, { useState, useEffect }  from 'react'
import axios from 'axios'

export default function StockList (props) {
    const [stockDetails, setStockDetails] = useState(null)


    const deleteStock = (stockId) => {
        console.log(stockId)
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

   
    
    const  stockStats =  () => {
        console.log('stockStats')
        let random = Math.floor(Math.random() * 2);
        let API_KEY = [
            process.env.REACT_APP_API_KEY1,
            process.env.REACT_APP_API_KEY2,
          ];
        const newStockDetails =[]
        props.stockList.map ( async stock => {
            const promise = await axios(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.ticker}&apikey=${API_KEY[random]}`)

            // .then(res => {
            //     // console.log(res.data['Global Quote']);
            //     return res.data['Global Quote'];
            // }).then(data => {
            //     console.log(data)
            //     let dataArray = Object.entries(data)
            //     console.log(dataArray)
            //     // const newStockDetails = [dataArray, ...stockDetails]
            //     newStockDetails.push(dataArray)
            //     console.log(newStockDetails)
                
            // }).then(() => {
            //     setStockDetails('5')
            //     console.log('stockDetails: ', stockDetails)
            // })
            .catch((error) => {
                console.error("Error:", error);
            })
            const result = await Object.entries(promise)
           
            newStockDetails.push(result)
            console.log('newStockDetails', newStockDetails)
            return setStockDetails(newStockDetails)
            // console.log('result :', newStockDetails)
    })}

    useEffect(() => {
        console.log('showStockArray has changed')
        stockStats()
    }, [props.showStockArray])
    

    return (
        <div>
            { props.showStockArray ? 
            <table>
                <thead>
                    <tr>
                        <th >Ticker</th>
                        <th>Price</th>
                        <th>$ Chng</th>
                        <th>% Chng</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >  
                 { stockDetails === null ? null :
                  stockDetails.map( (stock, i) => {
   
                     return (
                         <div className="stock-row">
                        <tr className="container" key={i}>
                            <td className="pick-list"  onClick={()=> props.getStockDetails()}>{stock[0][1]['Global Quote']['01. symbol']}</td>
                            <td className="pick-list" onClick={()=> props.getStockDetails()}>{stock[0][1]['Global Quote']['05. price']}</td>
                            <td className="pick-list" onClick={()=> props.getStockDetails()}>{stock[0][1]['Global Quote']['09. change']}</td>
                            <td className="pick-list" onClick={()=> props.getStockDetails()}>{stock[0][1]['Global Quote']['10. change percent']}</td> 
                           
                         </tr>
                        <button type="button" onClick={()=>deleteStock(i)}>x</button>   
                        </div>
                    )}
                     )} 
                </tbody> 
        </table> :
            null
            }
                
        </div>
    )
    
}
