import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Image } from 'antd';
import { FaArrowRight } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { HiMiniDevicePhoneMobile, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { PiDevices } from "react-icons/pi";
// Lazy load Atropos component
const Atropos = lazy(() => import('atropos/react'));
// Memoized platform icon component
const PlatformIcon = memo(({ platform }) => {
    const iconProps = { size: 18 };
    switch (platform) {
        case 'Web':
            return _jsx(HiOutlineGlobeAlt, { ...iconProps });
        case 'Mobile':
            return _jsx(HiMiniDevicePhoneMobile, { ...iconProps });
        case 'System':
            return _jsx(PiDevices, { ...iconProps });
        default:
            return null;
    }
});
PlatformIcon.displayName = 'PlatformIcon';
// Skeleton component for loading state
const ProjectCardSkeleton = () => (_jsxs("div", { className: "overflow-hidden w-full min-w-[250px] max-w-[600px] border border-neutral-800 flex flex-col gap-6 h-fit", children: [_jsx(Skeleton, { style: { width: '100%', height: '200px' }, active: true }), _jsx("div", { className: "p-6 mt-[-120px]", children: _jsxs("div", { className: "flex flex-col gap-6 w-full p-4 bg-[#010101] border border-neutral-800", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Skeleton.Input, { style: { width: '60%', height: '24px' }, active: true }), _jsx(Skeleton, { paragraph: { rows: 3, width: ['100%', '100%', '80%'] }, title: false, active: true }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Skeleton.Avatar, { size: "small", shape: "square", active: true }), _jsx(Skeleton.Input, { style: { width: '80px', height: '16px' }, active: true })] })] }), _jsxs("div", { className: "flex w-full gap-4 justify-between items-center", children: [_jsx(Skeleton.Button, { style: { width: '120px' }, active: true }), _jsx(Skeleton.Avatar, { size: "small", active: true })] })] }) })] }));
export const ProjectCard = memo((props) => {
    const [isImgHovered, setImgHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [atroposLoaded, setAtroposLoaded] = useState(false);
    const handleMouseEnter = useCallback(() => {
        setImgHovered(true);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setImgHovered(false);
    }, []);
    const handleImageLoad = useCallback(() => {
        setImageLoaded(true);
    }, []);
    const handleDownload = useCallback(() => {
        // Handle download logic here
        console.log('Download clicked for:', props.projectName);
    }, [props.projectName]);
    // Preload Atropos on component mount
    React.useEffect(() => {
        import('atropos/react').then(() => {
            setAtroposLoaded(true);
        });
    }, []);
    const cardStyle = {
        borderRadius: !isImgHovered ? '0' : '10px',
        transition: 'all 0.7s ease',
    };
    const imageStyle = {
        objectFit: 'cover',
        filter: !isImgHovered
            ? 'saturate(1) contrast(1.25) brightness(1)'
            : 'saturate(0) contrast(1) brightness(0.1)',
        borderRadius: !isImgHovered ? '0' : '5px',
        transition: 'all 0.2s ease',
    };
    const contentStyle = {
        borderRadius: !isImgHovered ? '0' : '10px',
        fontFamily: 'Plus Jakarta Sans',
    };
    return (_jsxs("div", { className: "overflow-hidden w-full min-w-[250px] max-w-[600px] border border-neutral-800 cursor-pointer \r\n            transition-all duration-700 ease-in-out flex flex-col gap-6 h-fit", style: cardStyle, children: [_jsxs("div", { className: "relative", children: [!imageLoaded && (_jsx("div", { className: "absolute inset-0 z-10", children: _jsx(Skeleton, { style: { width: '100%', height: '200px' }, active: true }) })), _jsx(Image, { src: props.imgUrl, alt: props.imgAlt, className: "bg-neutral-700 w-full h-[200px] transition-all duration-200 ease-in-out", style: imageStyle, onLoad: handleImageLoad, loading: "lazy", placeholder: _jsx(Skeleton, { style: { width: '100%', height: '300px' }, active: true }), preview: false })] }), _jsx(Suspense, { fallback: _jsx("div", { className: "p-6 mt-[-120px]", children: _jsx("div", { className: "flex flex-col gap-6 w-full p-4 bg-[#010101] border border-neutral-800", children: _jsx(Skeleton, { paragraph: { rows: 4 }, active: true }) }) }), children: atroposLoaded ? (_jsx(Atropos, { className: "p-6 hover:mt-[-200px] mt-[-120px] transition-all duration-700 ease-in-out", shadow: false, highlight: false, children: _jsxs("div", { className: "flex flex-col gap-6 w-full p-4 bg-[#010101] border border-neutral-800 hover:invert-[1] \r\n                            transition-all duration-300 ease-in-out", style: contentStyle, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [_jsxs("div", { className: "pd-details flex flex-col gap-3", children: [_jsx("h3", { className: "font-bold text-2xl leading-tight", style: { fontSize: '1.5em' }, children: props.projectName }), _jsx("p", { className: "text-sm font-normal h-[80px] overflow-hidden text-ellipsis line-clamp-4", children: props.projectDescription }), _jsxs("div", { className: "text-sm font-normal overflow-hidden text-ellipsis line-clamp-1 flex items-center \r\n                                             gap-2 mt-2 opacity-70", children: [_jsx(PlatformIcon, { platform: props.platform }), _jsx("span", { children: props.platform })] })] }), _jsxs("div", { className: "pd-actions flex w-full gap-4 justify-between items-center", children: [_jsxs(Link, { to: props.hrefLink, className: "pd-actions-view flex w-full justify-between items-center p-3 py-2 \r\n                                    text-black uppercase font-bold bg-white hover:rounded-lg hover:bg-[#010101] \r\n                                    hover:text-white hover:border hover:border-neutral-600 transition-all duration-300 ease-in-out", "aria-label": `Read more about ${props.projectName}`, children: [_jsx("span", { children: "Read" }), _jsx(FaArrowRight, {})] }), _jsx("button", { className: "p-2 hover:bg-neutral-800 rounded transition-colors duration-200", onClick: handleDownload, "aria-label": `Download ${props.projectName}`, type: "button", children: _jsx(HiDownload, { size: 20 }) })] })] }) })) : (_jsx(ProjectCardSkeleton, {})) })] }));
});
ProjectCard.displayName = 'ProjectCard';
