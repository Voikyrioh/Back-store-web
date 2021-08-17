import React, {useState, useEffect, useRef} from 'react';
import './App.sass';
import 'antd/dist/antd.css';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Layout, Menu, Modal, Popover} from "antd";
import LoginForm from "./components/Auth/LoginForm/LoginForm";
import RegistrationForm from "./components/Auth/RegistrationForm/RegistrationForm";
import Avatar from "antd/es/avatar/avatar";
import {logout} from "./services/AuthService/AuthService";
import {
    Switch,
    Route,
    Link,
    useLocation, useHistory
} from "react-router-dom";
import {getRandomBgColor} from "./services/Tools/Utils";
import {Routes} from "./services/Routes";
import UserSessionTimeoutModal from "./components/Modals/UserSessionTimeoutModal";

let title = 'STOCK FOR RETARDED'
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

function App(props) {
    const [userSession, setUserSession] = useState(getUserSession());
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    let location = useLocation();
    let history = useHistory();

    let userBgColor = sessionStorage.getItem('user-background-color');

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

    if (!userBgColor) {
        userBgColor = getRandomBgColor();
        sessionStorage.setItem('user-background-color', userBgColor);
    }

    let sessionTimeout = useRef(0);

    function logoutUser() {
        logout(setUserSession);
        history?.push('/home')
        if (sessionTimeout) {
            clearTimeout(sessionTimeout.current);
        }
    }

    function getLogged() {
        return userSession?.username ? loggedBlock : unloggedBlock
    }

    function showRegistrationModal(event) {
        setShowRegisterModal(true);
    }

    React.useEffect(() => {
        const current = Routes.find(route => route.url === '/' + location?.pathname.split('/')[1]);
        if (!current || !current?.condition(userSession)) {
            history.push('/home')
        }
    }, [location]);

    useEffect(() => {
        function registerSessionStopState(time) {
            sessionTimeout.current = setTimeout(() => {
                history?.push('/home');
                setUserSession({ username: null, role: ''});
                localStorage.removeItem('user_session_expiration');
                localStorage.removeItem('user_session');
                Modal.error(UserSessionTimeoutModal);
            }, time);
        }

        let sessionExpiration = localStorage.getItem('user_session_expiration')

        if (sessionExpiration && !isNaN(Number.parseInt(sessionExpiration, 10))){
            let loginExpDate = new Date(Number.parseInt(sessionExpiration, 10));
            registerSessionStopState(loginExpDate - new Date());
        }
    }, [userSession, sessionTimeout]);

    return (
        <Layout className="base-layout">
            <RegistrationForm show={showRegisterModal} setModal={setShowRegisterModal} onLogged={setUserSession}/>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex'}}>
                <div className="logo" style={{width: '300px', float: "left"}}>
                    <h1 style={{color: 'white', padding: 0, margin: 0}}>{title}</h1>
                </div>
                <Menu theme="dark" mode="horizontal"
                      defaultSelectedKeys={['0']}
                      activeKey={location?.pathname}
                      selectedKeys={[location?.pathname]}
                >
                        {Routes?.filter(route => route.condition(userSession)? route : null).map(route => {return <Menu.Item key={route.url}><Link to={route.url}>{route.name}</Link></Menu.Item>})}
                </Menu>
                {getLogged()}
            </Header>
            <Content className="base-content">
                <Layout className="site-layout-background">
                    <Content className="main-content">
                        <Switch>
                            {Routes?.filter(route => route.condition(userSession)? route : null).map(route => {return <Route path={route.url}>{route.component}</Route>})}
                        </Switch>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Made by <a target="_blank" href="https://github.com/Voikyrioh">Voikyrioh</a> the very first retarded, developed with <a target="_blank" href="https://fr.reactjs.org/">React.js ©</a> designed with <a target="_blank" href="https://ant.design/">Ant Design ©</a></Footer>
        </Layout>
    );
}

export default App;
