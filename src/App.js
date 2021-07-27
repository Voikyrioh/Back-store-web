import React, {useState} from 'react';
import './App.sass';
import 'antd/dist/antd.css';
import {SourceInfoList} from "./components/SourceInfoList/SourceInfoList";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Layout, Menu, Popover} from "antd";
import {HomePage} from "./components/HomePage/HomePage";
import {ShopsList} from "./components/ShopsList/ShopsList";
import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm/RegistrationForm";
import Avatar from "antd/es/avatar/avatar";
import {logout} from "./services/AuthService/AuthService";

let title = 'STOCK FOR RETARDED'
let routes = {
    homePage: <HomePage />,
    sourceInfoList: <SourceInfoList />,
    shopList: <ShopsList />,
    login: <LoginForm />,
    register: <RegistrationForm />
}
/**
 * Get user session in local storage and validate if session is still valid.
 * @return {UserSession}
 */
function getUserSession() {
    const unlogSession = {username: null, role: null};
    const sessionExpiration = localStorage.getItem('user_session_expiration');
    if (sessionExpiration && new Date() < new Date(parseInt(sessionExpiration, 10))) {
        try {
            return JSON.parse(localStorage.getItem('user_session'));
        } catch (e) { return unlogSession;}
    } else {
        if (localStorage.getItem('user_session_expiration') && localStorage.getItem('user_session')) {
            localStorage.removeItem('user_session_expiration');
            localStorage.removeItem('user_session');
        }
        return unlogSession;
    }
}

function getRandomBgColor() {
    let code = Math.random().toString(36).replace(/[^0-9a-f]+/g, 'f').substr(0, 6);
    return`#${code}`;
}

function App(props) {
    const [selectedRoute, changeRoute] = useState(routes['homePage']);
    const [userSession, setUserSession] = useState(getUserSession());
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    let menu = [
        {content: <Menu.Item key="homePage">Home</Menu.Item>, condition: () => true},
        {content: <Menu.Item key="sourceInfoList">Sources</Menu.Item>, condition: () => userSession?.username},
        {content: <Menu.Item key="shopList">Shops</Menu.Item>, condition: () => userSession?.username},
    ]

    let userBgColor = sessionStorage.getItem('user-background-color');

    if (!userBgColor) {
        userBgColor = getRandomBgColor();
        sessionStorage.setItem('user-background-color', userBgColor);
    }

    function logoutUser() {
        logout(setUserSession);
    }

    function showRegistrationModal(event) {
        setShowRegisterModal(true);
    }

    const loggedBlock = (
        <div className={'user-session-block logged'}>
            <Avatar className={'user-avatar'} size="large" style={{ backgroundColor: userBgColor}}>
                {userSession?.username?.toUpperCase().charAt(0)}
            </Avatar>
            <div className={'user-infos'}>
                <p>Salut <a>{userSession?.username}</a> !</p>
                <p>Ce n'est pas toi ? <a onClick={logoutUser}>Déconnexion</a>.</p>
            </div>
        </div>
    );
    const unloggedBlock = (
        <div className={'user-session-block'}>
            <p>
                Hey tu n'est pas connecté !
            </p>
            <p>
                Si tu souhaite accèder au contenu tu peux au choix&nbsp;
                <a onClick={showRegistrationModal}>t'enregistrer</a>
                &nbsp;ou&nbsp;
                <Popover placement="bottom" title="Connexion" content={<LoginForm onLogged={setUserSession}/>} trigger="click">
                    <a>te connecter</a>
                </Popover>
                .
            </p>
        </div>
    );

    const getLogged = () => {
        return userSession?.username ? loggedBlock : unloggedBlock
    }

    return (
        <Layout className="base-layout">
            <RegistrationForm show={showRegisterModal} setModal={setShowRegisterModal} onLogged={setUserSession}/>
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
                {getLogged()}
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
