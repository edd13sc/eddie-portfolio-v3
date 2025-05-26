import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { Skeleton, Row, Col, Empty, Alert, Spin } from 'antd';
import { FixedSizeList as List } from 'react-window';
import { PageHeading } from '../../components/Headings';
import { projectsList } from './list';
// Lazy load the ProjectCard component
const ProjectCard = lazy(() => import('../../components/ProjectCard/ProjectCard').then(module => ({
    default: module.ProjectCard
})));
// Error Boundary Component
class ProjectsErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ProjectsList Error:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback;
            if (FallbackComponent && this.state.error) {
                return _jsx(FallbackComponent, { error: this.state.error });
            }
            return (_jsx(Alert, { message: "Error Loading Projects", description: "Something went wrong while loading the projects. Please try refreshing the page.", type: "error", showIcon: true }));
        }
        return this.props.children;
    }
}
// Skeleton loader for individual project cards
const ProjectCardSkeleton = () => (_jsxs("div", { className: "w-full min-w-[250px] max-w-[600px] p-4", children: [_jsx(Skeleton.Image, { style: { width: '100%', height: '200px' }, active: true }), _jsxs("div", { className: "mt-4 space-y-3", children: [_jsx(Skeleton.Input, { style: { width: '60%' }, active: true }), _jsx(Skeleton, { paragraph: { rows: 3 }, active: true }), _jsxs("div", { className: "flex justify-between items-center mt-4", children: [_jsx(Skeleton.Button, { style: { width: '120px' }, active: true }), _jsx(Skeleton.Avatar, { size: "small", active: true })] })] })] }));
// Grid container for better responsive layout
const ProjectsGrid = ({ projects, loading, error }) => {
    // Memoize the project cards to prevent unnecessary re-renders
    const memoizedProjects = useMemo(() => projects, [projects]);
    if (error) {
        return (_jsx(Alert, { message: "Failed to Load Projects", description: error, type: "error", showIcon: true, className: "m-4" }));
    }
    if (loading) {
        return (_jsx(Row, { gutter: [24, 24], className: "p-4 pt-8", children: Array.from({ length: 6 }).map((_, index) => (_jsx(Col, { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, children: _jsx(ProjectCardSkeleton, {}) }, `skeleton-${index}`))) }));
    }
    if (!memoizedProjects.length) {
        return (_jsx("div", { className: "flex justify-center items-center min-h-[400px]", children: _jsx(Empty, { description: "No projects found", image: Empty.PRESENTED_IMAGE_SIMPLE }) }));
    }
    return (_jsx(Row, { gutter: [24, 24], className: "p-4 pt-8", children: memoizedProjects.map((project) => (_jsx(Col, { xs: 24, sm: 12, md: 8, lg: 8, xl: 6, children: _jsx(Suspense, { fallback: _jsx(ProjectCardSkeleton, {}), children: _jsx(ProjectCard, { ...project }) }) }, project.id))) }));
};
// Virtualized list for better performance with large datasets
const VirtualizedProjectsList = ({ projects, itemsPerRow, itemHeight }) => {
    const rows = useMemo(() => {
        const result = [];
        for (let i = 0; i < projects.length; i += itemsPerRow) {
            result.push(projects.slice(i, i + itemsPerRow));
        }
        return result;
    }, [projects, itemsPerRow]);
    const Row = useCallback(({ index, style }) => {
        const rowProjects = rows[index];
        return (_jsx("div", { style: style, className: "flex gap-6 px-4", children: rowProjects.map((project) => (_jsx("div", { className: "flex-1 min-w-0", children: _jsx(Suspense, { fallback: _jsx(ProjectCardSkeleton, {}), children: _jsx(ProjectCard, { ...project }) }) }, project.id))) }));
    }, [rows]);
    return (_jsx(List, { height: 800, itemCount: rows.length, itemSize: itemHeight, className: "w-full", children: Row }));
};
// Custom hook for projects data management
const useProjectsData = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                // Simulate async loading - replace with actual data fetching
                await new Promise(resolve => setTimeout(resolve, 500));
                // Uncomment and modify this section for Google Drive integration
                // try {
                //   const googleDriveData = await listFiles('myFolder/');
                //   // Process and merge with projectsList if needed
                // } catch (driveError) {
                //   console.warn('Google Drive data unavailable:', driveError);
                // }
                setProjects(projectsList);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load projects');
                console.error('Error loading projects:', err);
            }
            finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);
    return { projects, loading, error, refetch: () => loadProjects() };
};
// Main component with optimizations
const ProjectsList = () => {
    const { projects, loading, error } = useProjectsData();
    const [useVirtualization, setUseVirtualization] = useState(false);
    // Determine if virtualization should be used based on project count
    useEffect(() => {
        setUseVirtualization(projects.length > 20);
    }, [projects.length]);
    // Memoize the heading to prevent unnecessary re-renders
    const heading = useMemo(() => _jsx(PageHeading, { text: "Projects" }), []);
    return (_jsx(ProjectsErrorBoundary, { children: _jsxs("div", { className: "flex w-full flex-col min-h-screen", children: [heading, _jsx(Spin, { spinning: loading && projects.length === 0, size: "large", children: useVirtualization && projects.length > 0 ? (_jsx(VirtualizedProjectsList, { projects: projects, itemsPerRow: 3, itemHeight: 400 })) : (_jsx(ProjectsGrid, { projects: projects, loading: loading, error: error })) })] }) }));
};
export default React.memo(ProjectsList);
