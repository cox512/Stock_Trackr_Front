import React, { useState, useEffect } from 'react'
import "react-bootstrap";
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';



export default function CompanyOverview (props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    //Figure out how to combine all Statement calls into one.
    const handleIncomeClick = () => {
        props.getIncomeStatement(props.overview.Symbol);
        handleShow();
    }

    // const incomeStatement = Object.values(props.incomeStatement['annualReports']);

    // useEffect (() => {
    //     console.log(props.incomeStatement)
    // }, [])

    return (
        <>
            {props.overview ?
            <>
                <div>
                {/* <Button type="primary" onClick={() => handleIncomeClick()}>Income Statement</Button>
                <Button onClick={() => props.getBalanceSheet(props.overview.Symbol)}>Balance Sheet</Button>
                <Button onClick={() => props.getCashFlowStatement(props.overview.Symbol)}>Cash Flow Statement</Button> */}
                </div>

                <div>
                    {/* Modal to display the income statement on button click
                    FIND A WAY TO USE ONE MODAL FOR ALL STATEMENTS. could maybe use some regex to get to the words that you want to display.
                    */}
                    <Modal
                        title="Income Statement"
                        size="lg"
                        show={show}
                        onHide={handleClose}
                        centered
                        animation={false}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Income Statement
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {props.annualIncomeStatement ?
                        <Table responsive>
                            <thead>
                                <tr>
                                <th>Period Ending:</th>
                                {props.annualIncomeStatement.map(year => {
                                    return (
                                    <th key={year['fiscalDateEnding']}>{year['fiscalDateEnding']}</th>
                                    )
                                })}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {Object.keys(props.annualIncomeStatement[0]).map((category, index) => {
                                    for (let item of Object.values(props.annualIncomeStatement)){
                                    console.log(Object.values(item));
                                    }
                                    return (
                                    <tr key={index}>
                                        <td>{category}</td>
                                        {Object.values(props.annualIncomeStatement).map((data, index) => {
                                            console.log(data);
                                            return (
                                            <td key={index}>{data}</td>
                                            )

                                        })
                                        
                                        }
                                    </tr>
                                    )})} */}
                            </tbody>
                            </Table> 
                            : null }
                        </Modal.Body>
                    </Modal>
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
            </> : null
        }
    </>)
}
