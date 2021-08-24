import {HomePage} from "../components/HomePage/HomePage";
import {SourceInfoList} from "../components/SourceInfoList/SourceInfoList";
import {ShopsList} from "../components/ShopsList/ShopsList";
import {Administration} from "../components/Admin/Administration";
import React from "react";
import {UserList} from "../components/Admin/UserList/UserList";
import {ItemList} from "../components/Admin/ItemList/ItemList";
import {ShopList} from "../components/Admin/ShopList/ShopList";
import {Stats} from "../components/Admin/Stats/Stats";
import {BarChartOutlined, DesktopOutlined, ShopOutlined, UserOutlined} from "@ant-design/icons";
import {Account} from "../components/Users/Account/Account";

export const Routes = [
    {
        name: 'Home',
        component: <HomePage/>,
        url: '/home',
        topNav: true,
        condition: () => true,
    },
    {
        name: 'Sources',
        component: <SourceInfoList />,
        url: '/sources',
        topNav: true,
        condition: (session) => session?.username,
    },
    {
        name: 'Shops',
        component: <ShopsList />,
        url: '/shops',
        topNav: true,
        condition: (session) => session?.username,
    },
    {
        name: 'Acoount',
        component: <Account />,
        url: '/account',
        topNav: false,
        condition: (session) => session?.username,
    },
    {
        name: 'Administration',
        component: <Administration />,
        url: '/admin',
        topNav: true,
        condition: (session) => session?.role === 'ADMINIDIOT',
        routes: [
            {
                name: 'Gérer les utilisateurs',
                icon: <UserOutlined/>,
                url: '/users',
                component: <UserList/>
            },
            {
                name: 'Modifier les articles',
                icon: <DesktopOutlined/>,
                url: '/products',
                component: <ItemList/>
            },
            {
                name: 'Modifier les magasins',
                icon: <ShopOutlined/>,
                url: '/shops',
                component: <ShopList/>
            },
            {
                name: 'Statistiques',
                icon: <BarChartOutlined/>,
                url: '/stats',
                component: <Stats/>
            }
        ]
    }
];
