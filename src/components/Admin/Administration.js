import React, {useState} from 'react';
import {Button, Drawer, Menu, Tooltip} from "antd";
import {MenuFoldOutlined} from "@ant-design/icons";
import "./Administration.sass"
import {Link, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {Routes} from "../../services/Routes";

export function Administration() {
    const [visible, setVisibility] = useState(false)

    let location = useLocation();
    let history = useHistory();
    const adminRoute = Routes.find(route => route.name === 'Administration');

    React.useEffect(() => {
        const current = adminRoute.routes.find(route => route.url === '/' + location?.pathname.split('/')[2]);
        if (!current && location?.pathname === adminRoute.url && adminRoute.routes) {
            history.push(adminRoute.url + adminRoute.routes[0]?.url);
        } else if (!current) {
            history.push('/home');
        }
    }, [location]);

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
                activeKey={location?.pathname}
                selectedKeys={[location?.pathname]}
            >
                {
                    Routes.find(route => route.name === 'Administration').routes?.map(route =>
                        <Menu.Item key={adminRoute.url + route.url} icon={route.icon}>
                            <Link to={adminRoute.url + route.url}>
                                {route.name}
                            </Link>
                        </Menu.Item>
                    )
                }
            </Menu>
        </Drawer>
        <Switch>
            {Routes.find(route => route.name === 'Administration').routes?.map(route => {return <Route path={adminRoute.url + route.url}>{route.component}</Route>})}
        </Switch>
    </div>
}
