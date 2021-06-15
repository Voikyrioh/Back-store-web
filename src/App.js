import * as React from 'react';
import './App.sass';
import 'antd/dist/antd.css';
import {SourceInfoList} from "./components/SourceInfoList/SourceInfoList";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Layout, Menu} from "antd";
import {HomePage} from "./components/HomePage/HomePage";
import {ShopsList} from "./components/ShopsList/ShopsList";
import {LoginPage} from "./components/Auth/LoginPage/LoginPage";
import {RegistrationPage} from "./components/Auth/RegistrationPage/RegistrationPage";

class App extends React.Component {
    
    title = 'STOCK FOR RETARDED'
    isLogged = false;
    routes = {
        homePage: <HomePage />,
        sourceInfoList: <SourceInfoList />,
        shopList: <ShopsList />,
        login: <LoginPage />,
        register: <RegistrationPage />
    }

    menu = [
        {content: <Menu.Item key="homePage">Home</Menu.Item>, condition: () => true},
        {content: <Menu.Item key="sourceInfoList">Sources</Menu.Item>, condition: () => true},
        {content: <Menu.Item key="shopList">Shops</Menu.Item>, condition: () => true},
        {content: <Menu.Item key="login">Connexion</Menu.Item>, condition: () => !this.state?.logged},
        {content: <Menu.Item key="logout">Déconnexion</Menu.Item>, condition: () => this.isLogged},
        {content: <Menu.Item key="register">Inscription</Menu.Item>, condition: () => !this.state?.logged}
    ]

    constructor(props) {
        super(props);
        this.state = {
            selectedRoute: this.routes['homePage'],
            logged: true,
            role: null
        };
    }
    
    header = (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" style={{width: '300px', float: "left"}}>
                <h1 style={{color: 'white', padding: 0, margin: 0}}>{this.title}</h1>
            </div>
            {this.getUserMenuItems()}
        </Header>
    )

    getUserMenuItems() {
        this.checkIfUserIsConnected();
        
        return (
        <Menu theme="dark" mode="horizontal"
             defaultSelectedKeys={['0']}
             onSelect={(event) => {
                 this.setState({selectedRoute: this.routes[event?.selectedKeys[0]]});
         }}>
            { this.menu.map(item => (item.condition()) ? (item.content) : null) }
        </Menu>)
    }
    
    render() {
        return (
            <Layout className="base-layout">
                {this.header}
                <Content className="base-content">
                    <Layout className="site-layout-background">
                        <Content className="main-content">
                            {this.state.selectedRoute}
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Made by <a target="_blank" href="https://github.com/Voikyrioh">Voikyrioh</a> the very first retarded, dev with <a target="_blank" href="https://fr.reactjs.org/">React.js ©</a> designed with <a target="_blank" href="https://ant.design/">Ant Design ©</a></Footer>
            </Layout>
        );
    }

    checkIfUserIsConnected() {
        const sessionExpiration = sessionStorage.getItem('session_expiration');
        if (sessionExpiration && new Date() > new Date(parseInt(sessionExpiration, 10))) {
            const sessionRole = sessionStorage.getItem('session_role');
            this.setState({logged: true, role: sessionRole})
        } else {
            this.setState({logged: false, role: null})
            this.isLogged = false
            setTimeout(() => {
                this.setState({logged: true, role: null})
                this.isLogged = true
            }, 5000)
        }
    }
}

export default App;
