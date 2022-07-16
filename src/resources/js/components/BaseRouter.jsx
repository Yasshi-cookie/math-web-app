import React from 'react';
import {
    useRoutes,
} from 'react-router-dom';
import Amidakuji from './Amidakuji';
import Home from './Home';

const BaseRouter = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "amidakuji", element: <Amidakuji /> },
    ]);
}

export default BaseRouter
