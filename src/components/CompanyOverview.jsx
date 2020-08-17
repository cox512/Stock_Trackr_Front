import React from 'react'

export default function CompanyOverview (props) {
    
    

    return (
        <>
            {props.overview ?
            <>
                <div>
                <button onClick={() => props.getIncomeStatement(props.overview.Symbol)}>Income Statement</button>
                <button onClick={() => props.getBalanceSheet(props.overview.Symbol)}>Balance Sheet</button>
                <button onClick={() => props.getCashFlowStatement(props.overview.Symbol)}>Cash Flow Statement</button>
                </div>

                <div className="overview-div">
                <p><b>Company Name:</b> {props.overview.Name}</p>
                <p><b>Sector:</b> {props.overview.Sector}</p>
                <p><b>Market Cap:</b> {props.overview.MarketCapitalization}</p>
                <p><b>Annual Dividend (per share):</b> {props.overview.DividendPerShare}</p>
                <p><b>Forward P/E:</b>{props.overview.ForwardPE}</p>
                <p><b>52-Week High:</b>{props.overview["52WeekHigh"]}</p>
                <p><b>52-Week Low:</b>{props.overview["52WeekLow"]}</p>
                <p><b>Overview:</b> {props.overview.Description}</p>


                </div>
            </>
             : null
        }
                
    </>
    )
    
}
