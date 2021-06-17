import React, {useState} from 'react';
import './App.sass';
import 'antd/dist/antd.css';
import {SourceInfoList} from "./components/SourceInfoList/SourceInfoList";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Button, Card, Layout, Menu, Popover} from "antd";
import {HomePage} from "./components/HomePage/HomePage";
import {ShopsList} from "./components/ShopsList/ShopsList";
import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm/RegistrationForm";
import {LinkOutlined} from "@ant-design/icons";

let title = 'STOCK FOR RETARDED'
let routes = {
    homePage: <HomePage />,
    sourceInfoList: <SourceInfoList />,
    shopList: <ShopsList />,
    login: <LoginForm />,
    register: <RegistrationForm />
}

/**
 * @typedef {Object} UserSession
 * @property {boolean} logged - Define for this react app if user is logged
 * @property {string|null} role - The role of the user in app
 */

/**
 * Get user session in local storage and validate if session is still valid.
 * @return {UserSession}
 */
function getUserSession() {
    const sessionExpiration = sessionStorage.getItem('session_expiration');
    if (sessionExpiration && new Date() > new Date(parseInt(sessionExpiration, 10))) {
        const sessionRole = sessionStorage.getItem('session_role');
        return {logged: true, role: sessionRole};
    } else {
        if (sessionStorage.getItem('session_expiration') && sessionStorage.getItem('session_role')) {
            sessionStorage.removeItem('session_expiration');
            sessionStorage.removeItem('session_role');
        }
        return {logged: false, role: null};
    }
}

function App(props) {
    const [selectedRoute, changeRoute] = useState(routes['homePage']);
    const [userSession, setUserSession] = useState(getUserSession().logged);

    let menu = [
        {content: <Menu.Item key="homePage">Home</Menu.Item>, condition: () => true},
        {content: <Menu.Item key="sourceInfoList">Sources</Menu.Item>, condition: () => userSession.logged},
        {content: <Menu.Item key="shopList">Shops</Menu.Item>, condition: () => userSession.logged},
    ]

    return (
        <Layout className="base-layout">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex'}}>
                <div className="logo" style={{width: '300px', float: "left"}}>
                    <h1 style={{color: 'white', padding: 0, margin: 0}}>{title}</h1>
                </div>
                <Menu theme="dark" mode="horizontal"
                      defaultSelectedKeys={['0']}
                      onSelect={(event) => {
                          changeRoute(routes[event?.selectedKeys[0]]);
                      }}>
                    { menu.map(item => (item.condition()) ? (item.content) : null) }
                </Menu>
                <div style={{margin: "auto", marginRight: "0", padding: "0 10px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <p style={{color: "white", lineHeight: "25px", marginBottom: "0"}}>
                        Hey tu n'est pas connecté !
                    </p>
                    <p style={{color: "white", lineHeight: "25px", marginBottom: "0"}}>
                        Si tu souhaite accèder au contenu tu peux au choix&nbsp;
                        <Popover placement="bottom" title="Inscription" content={RegistrationForm} trigger="click">
                            <a>t'enregistrer</a>
                        </Popover>
                        &nbsp;ou&nbsp;
                        <Popover placement="bottom" title="Connexion" content={LoginForm} trigger="click">
                            <a>te connecter</a>
                        </Popover>
                        .
                    </p>
                </div>
            </Header>
            <Content className="base-content">
                <Layout className="site-layout-background">
                    <Content className="main-content">
                        {selectedRoute}
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Made by <a target="_blank" href="https://github.com/Voikyrioh">Voikyrioh</a> the very first retarded, dev with <a target="_blank" href="https://fr.reactjs.org/">React.js ©</a> designed with <a target="_blank" href="https://ant.design/">Ant Design ©</a></Footer>
        </Layout>
    );
}

export default App;
