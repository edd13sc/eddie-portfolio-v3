import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Atropos from 'atropos/react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { HiMiniDevicePhoneMobile, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { PiDevices } from "react-icons/pi";
export const ProjectCard = (props) => {
    const [isImgHovered, setImgHovered] = useState(false);
    return (_jsxs("div", { className: "overflow-hidden w-full min-w-[250px] max-w-[600px] border border-gray-800 cursor-pointer  \r\n        transition-all duration-700 linear transition-discrete flex flex-col gap-6 h-fit", style: {
            borderRadius: !isImgHovered ? '0' : '10px'
        }, children: [_jsx("img", { src: props.imgUrl, className: 'bg-gray-700 w-full h-[200px] transition-all duration-200 linear transition-discrete', style: {
                    objectFit: 'cover',
                    filter: !isImgHovered ? 'saturate(1)contrast(1.25) brightness(1)' : 'saturate(0)contrast(1)brightness(0.1)',
                    borderRadius: !isImgHovered ? '0' : '5px'
                } }), _jsx(Atropos, { className: 'p-6 hover:mt-[-200px] mt-[-120px] transition-all duration-700 linear transition-discrete', children: _jsxs("div", { className: 'flex flex-col gap-6 w-full p-4 bg-[#010101] border border-gray-800 hover:invert-[1]', style: {
                        borderRadius: !isImgHovered ? '0' : '10px'
                    }, onMouseEnter: () => setImgHovered(true), onMouseLeave: () => setImgHovered(false), children: [_jsxs("div", { className: 'pd-details flex flex-col gap-3 ', style: { fontFamily: 'Plus Jakarta Sans', }, children: [_jsx("p", { className: 'font-bold', style: { fontSize: '1.5em' }, children: props.projectName }), _jsx("p", { className: 'text-sm font-base h-[80px] overflow-hidden text-ellipsis line-clamp-4 overflow-hidden', children: props.projectDescription }), _jsxs("p", { className: 'text-sm font-base overflow-hidden text-ellipsis line-clamp-1 overflow-hidden flex items-center \r\n                                        gap-2 mt-2 opacity-70', children: [props.platform === 'Web' && _jsx(HiOutlineGlobeAlt, { size: 18 }), props.platform === 'Mobile' && _jsx(HiMiniDevicePhoneMobile, { size: 18 }), props.platform === 'System' && _jsx(PiDevices, { size: 18 }), props.platform] })] }), _jsxs("div", { className: 'pd-actions flex w-full gap-4 justify-between items-center', children: [_jsxs(Link, { to: props.hrefLink, className: 'pd-actions-view flex w-full justify-between items-center p-3 py-2 bg-white \r\n                            text-black uppercase font-bold bg-[#FFFFFF] hover:rounded-lg hover:bg-[#010101] hover-border hover:border-gray-600', children: ["Read", _jsx(FaArrowRight, {})] }), _jsx("div", { className: '', onClick: () => null, children: _jsx(HiDownload, {}) })] })] }) })] }));
};
