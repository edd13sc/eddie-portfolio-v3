import { jsx as _jsx } from "react/jsx-runtime";
// import React from 'react'
import { useMemo } from "react";
import { PageHeading } from "../../components/Headings";
const Project = () => {
    const heading = useMemo(() => _jsx(PageHeading, { text: "" }), []);
    return (_jsx("div", { children: heading }));
};
export default Project;
