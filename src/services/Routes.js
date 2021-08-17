import {HomePage} from "../components/HomePage/HomePage";
import {SourceInfoList} from "../components/SourceInfoList/SourceInfoList";
import {ShopsList} from "../components/ShopsList/ShopsList";
import {Administration} from "../components/Admin/Administration";
import React from "react";

export const Routes = [
    {
        name: 'Home',
        component: <HomePage/>,
        url: '/home',
        condition: () => true,
    },
    {
        name: 'Sources',
        component: <SourceInfoList />,
        url: '/sources',
        condition: (session) => session?.username,
    },
    {
        name: 'Shops',
        component: <ShopsList />,
        url: '/shops',
        condition: (session) => session?.username,
    },
    {
        name: 'Administration',
        component: <Administration />,
        url: '/admin',
        condition: (session) => session?.role === 'ADMINIDIOT',
    },
];
