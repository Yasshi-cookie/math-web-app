import React from 'react';
import {
    useRoutes,
} from 'react-router-dom';
import Amidakuji from './Amidakuji';
import Home from './Home';
import BreakBricks from './BreakBricks';

const BaseRouter = () => {
    return useRoutes([
        { path: "/", element: <Home /> },
        { path: "amidakuji", element: <Amidakuji /> },
        { path: "break_bricks", element: <BreakBricks /> },
    ]);
}

export default BaseRouter
