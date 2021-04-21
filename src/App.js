import * as React from 'react';
import './App.sass';
import 'antd/dist/antd.css';
import {SourceInfoList} from "./components/SourceInfoList/SourceInfoList";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Layout, Menu} from "antd";

class App extends React.Component {
    title = 'STOCK FOR RETARDED'
    
    header = (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" style={{width: '300px', float: "left"}}>
                <h1 style={{color: 'white', padding: 0, margin: 0}}>{this.title}</h1>
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} onSelect={() => {}}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Sources</Menu.Item>
                <Menu.Item key="3">Shops</Menu.Item>
            </Menu>
        </Header>
    )
    
    render() {
        return (
            <Layout className="base-layout">
                {this.header}
                <Content className="base-content">
                    <Layout className="site-layout-background">
                        <Content className="main-content">
                            <SourceInfoList />
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Made by <a target="_blank" href="https://github.com/Voikyrioh">Voikyrioh</a> the very first retarded, dev with <a target="_blank" href="https://fr.reactjs.org/">React.js ©</a> designed with <a target="_blank" href="https://ant.design/">Ant Design ©</a></Footer>
            </Layout>
        );
    }
}

export default App;
