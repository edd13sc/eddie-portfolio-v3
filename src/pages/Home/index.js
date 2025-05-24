import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// import React from 'react'
import WaterLensCursor from '../../util/ui/WaterRippleFX';
import DynamicGrid from './layout';
const Home = () => {
    return (_jsx(_Fragment, { children: _jsx(WaterLensCursor, { children: _jsx(DynamicGrid, {}) }) }));
};
export default Home;
