import React, {useState} from 'react';
import {Button, Drawer, Menu, Tooltip} from "antd";
import {BarChartOutlined, DesktopOutlined, MenuFoldOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import "./Administration.sass"
import {UserList} from "./UserList/UserList";
import {ItemList} from "./ItemList/ItemList";
import {ShopList} from "./ShopList/ShopList";
import {Stats} from "./Stats/Stats";

export function Administration() {
    const routes = {
        users: <UserList/>,
        products: <ItemList/>,
        shops: <ShopList/>,
        stats: <Stats/>,
    }

    const [visible, setVisibility] = useState(false)
    const [selectedRoute, setSelectedRoute] = useState('users')
    const [adminRoute, setAdminRoute] = useState(routes['users'])

    return <div>
        <Tooltip title={"Afficher le menu"}>
            <Button
                icon={<MenuFoldOutlined/>}
                onClick={() => {setVisibility(true)}}
                className={'admin-drawer-button'}
            />
        </Tooltip>
        <Drawer
            title="Menu Admin"
            placement="left"
            closable={false}
            onClose={() => {setVisibility(false)}}
            visible={visible}
            getContainer={false}
            className="admin-drawer"
        >
            <Menu
                theme={'dark'}
                mode={'vertical'}
                className="admin-menu"
                activeKey={selectedRoute}
                selectedKeys={[selectedRoute]}
                onSelect={(selection) => { setAdminRoute(routes[selection.selectedKeys[0]]); setSelectedRoute(selection.selectedKeys[0]) }}

            >
                <Menu.Item key="users" icon={<UserOutlined />}>
                    Gérer les utilisateurs
                </Menu.Item>
                <Menu.Item key="products" icon={<DesktopOutlined />}>
                    Modifier les articles
                </Menu.Item>
                <Menu.Item key="shops" icon={<ShopOutlined />}>
                    Modifier les magasins
                </Menu.Item>
                <Menu.Item key="stats" icon={<BarChartOutlined />}>
                    Statistiques
                </Menu.Item>
            </Menu>
        </Drawer>
        <div>
            {adminRoute}
        </div>
    </div>
}
