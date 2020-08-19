import React from 'react'
import "react-bootstrap";
import Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


export default function CompanyOverview (props) {
    
    return (
        <>
            {props.overview ?
            <>
                <div>
                {/* <Button type="primary" onClick={() => props.setModalVisible(true)}>
                Update account info
                </Button> */}
                <Button type="primary" onClick={() => props.getIncomeStatement(props.overview.Symbol)}>Income Statement</Button>
                <Button onClick={() => props.getBalanceSheet(props.overview.Symbol)}>Balance Sheet</Button>
                <Button onClick={() => props.getCashFlowStatement(props.overview.Symbol)}>Cash Flow Statement</Button>
                </div>

                <div>
                    {/* Modal to display the income statement on button click*/}
                    <Modal
                            title="Income Statement"
                            centered
                            visible={props.modalVisible}
                            onOk={() => props.setModalVisible(false)}
                            onCancel={() => props.setModalVisible(false)}
                            >    
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
