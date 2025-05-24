import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// @ts-ignore
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Error404 from './pages/Error404';
import Project from './pages/Project';
import ProjectsList from './pages/ProjectsList';
import Skills from './pages/Skills';
function App() {
    return (_jsx(_Fragment, { children: _jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/projects", element: _jsx(ProjectsList, {}) }), _jsx(Route, { path: "/project/:id", element: _jsx(Project, {}) }), _jsx(Route, { path: "/project/field/:id", element: _jsx(Project, {}) }), _jsx(Route, { path: "/skills", element: _jsx(Skills, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "*", element: _jsx(Error404, {}) })] }) }) }));
}
export default App;
