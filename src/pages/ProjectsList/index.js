import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { PageHeading } from '../../components/Headings';
// import { listFiles } from '../../util/data/extractDataFromGoogle';
const ProjectsList = () => {
    useEffect(() => {
        // listFiles('myFolder/').catch(console.error);
    }, []);
    return (_jsx("div", { className: 'flex', children: _jsx(PageHeading, { text: 'Projects' }) }));
};
export default ProjectsList;
