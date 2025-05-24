import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { PageHeading } from '../../components/Headings';
import { ProjectCard } from '../../components/ProjectCard/ProjectCard';
import { projectsList } from './list';
// import { listFiles } from '../../util/data/extractDataFromGoogle';
const ProjectsList = () => {
    useEffect(() => {
        // listFiles('myFolder/').catch(console.error);
    }, []);
    return (_jsxs("div", { className: 'flex w-full flex-col', children: [_jsx(PageHeading, { text: 'Projects' }), _jsx("div", { className: 'flex p-4 pt-8', children: projectsList.map((proj) => {
                    return (_jsx(ProjectCard, { ...proj }));
                }) })] }));
};
export default ProjectsList;
