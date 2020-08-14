import React, { useState } from 'react';
import StockSearch from "./StockSearch";
import ShowStock from "./ShowStock";
import axios from 'axios';
import "../App.css";
// import Moment from "react-moment";
// import "moment-timezone";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";

const { SubMenu } = Menu;
const { Header, Footer, Content, Sider } = Layout;

export default function UserPage (props) {

    const [ticker, setTicker] = useState('');
    const [symbol, setSymbol] = useState('');
    const [stockPrice, setStockPrice] = useState('');
    const [watchlists, setWatchlists] = useState([])
    const [addList, setAddList] = useState(false);

    const handleStockData = (data) => {
        setSymbol(data["Meta Data"]["2. Symbol"]);
        setStockPrice(Object.entries(data["Time Series (1min)"])[0][1]["4. close"]);
    }

    const handleChange = (evt) => {
        setWatchlists(evt.target.value)
    }

    const handleWatchlistSet = () => {
        showWatchlists()
        setAddList(true);
    }

    const showWatchlists = () =>{
        // console.log("showWatchlists")
        var config = {
            method: 'GET',
            url: props.baseURL + 'api/v1/watchlists/',
            headers: { 
                'Content-Type': "application.json",
            },
            withCredentials: true,
          };
          axios(config)
          .then((res) => {
            // console.log(res.data)
            return res.data;
          })
          .then((data) => {
            //   console.log(data.data)
                setWatchlists(data.data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    // useEffect(() => {
    //     showWatchlists();
    // }, []);

    return (
        <div className="App">
            <Layout>
            <Header className="header">
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item key="1">nav 1</Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: "0 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                className="site-layout-background"
                style={{ padding: "24px 0" }}
                >
                <Sider className="site-layout-background" width={200}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    style={{ height: "100%" }}
                    >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                        <Menu.Item key="1">option1</Menu.Item>
                        <Menu.Item key="2">option2</Menu.Item>
                        <Menu.Item key="3">option3</Menu.Item>
                        <Menu.Item key="4">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        icon={<LaptopOutlined />}
                        title="subnav 2"
                    >
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub3"
                        icon={<NotificationOutlined />}
                        title="subnav 3"
                    >
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                    </Menu>
                </Sider>
                <Content style={{ padding: "0 24px", minHeight: 280 }}>
                    Content
                </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: "center" }}>©2020 10bagger, inc.</Footer>
            </Layout>
               
            <h3>Hello there, {props.currentUser["fname"]}</h3>
            <h4>What company would you like to know more about today?</h4>
            <StockSearch
                handleChange={props.handleChange}
                handleStockSearch={props.handleStockSearch}
                ticker={ticker}
                handleStockData={handleStockData}
            />
            {/* <button onClick={()=>showWatchlists()}>SHOW WATCHLISTS</button> */}
            {/* <h4>Your Watchlists</h4>
            <ul>
                {watchlists.map(list => {
                    return (
                        <li key={list.id}>{list.title}</li>
                    )
                })}
            </ul> */}

            {stockPrice ? (
                <ShowStock
                    stockPrice={stockPrice}
                    symbol={symbol}
                    baseURL={props.baseURL}
                    watchlists={watchlists}
                    handleChange={handleChange}
                    handleWatchlistSet={handleWatchlistSet}
                    showWatchlists={ showWatchlists }
                    addList={addList}
                    setAddList={setAddList}
                />
            ) : null}   
        </div>
    )
}

