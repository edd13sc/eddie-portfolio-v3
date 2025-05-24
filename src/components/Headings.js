import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { TextRepeater } from '../util/ui/TextRepeater';
import { useNavigate } from 'react-router-dom';
import WaterLensCursor from '../util/ui/WaterRippleFX';
export const PageHeading = ({ text, navigateIcon }) => {
    const [isBackHover, setBackHover] = useState(false);
    const navigate = useNavigate();
    return (_jsx(WaterLensCursor, { children: _jsxs("div", { className: 'i uppercase font-medium pl-4 pt-8 pb-8 border-b border-b-gray-800 w-full \r\n            flex flex-col justify-center gap-4 w-full overflow-hidden', style: { fontSize: '12em', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }, children: [_jsxs("div", { className: 'w-fit flex flex-col justify-center ml-2 cursor-pointer', onMouseEnter: () => { setBackHover(true); }, onMouseLeave: () => { setBackHover(false); }, onClick: () => navigate(-1), children: [_jsx(HiMiniArrowLongLeft, { size: 40, color: isBackHover ? '#0736FE' : '#white', className: 'bg-neutral-100 cursor-pointer' }), _jsx(TextRepeater, { stacked: true, maskingEnabled: true, text: _jsx(HiMiniArrowLongLeft, { size: 40, color: '#1d4ed8', className: 'bg-neutral-100' }), repetitions: 6, fontSize: '1em', strokeColor: 'white', backgroundColor: '#1d4ed8', spacing: '6x', parentClassName: 'absolute mt-[-3px] z-10 ml-[-4px] contents !opacity-0', childClassName: ` ${isBackHover ? 'opacity-30 text-white hover:text-[#0736FE]' : 'opacity-0'} transition-all duration-700 linear transition-discrete cursor-pointer` })] }), _jsxs("div", { className: 'w-full flex flex-col justify-center select-none', onMouseEnter: () => { setBackHover(true); }, onMouseLeave: () => { setBackHover(false); }, children: [_jsxs("p", { className: 'opacity-0', children: [" ", text] }), _jsxs("p", { className: ` absolute z-100 ${isBackHover ? 'text-[#0736FE]' : 'text-white'} font-bold transition-all duration-700 linear transition-discrete`, style: {
                                zIndex: 100
                            }, children: [" ", text] }), _jsx(TextRepeater, { stacked: true, maskingEnabled: true, text: text, repetitions: 8, fontSize: '1em', strokeColor: 'white', backgroundColor: '#010101', spacing: '6px', parentClassName: 'absolute mt-[-3px] z-10 ml-[-4px] contents !opacity-0', childClassName: `${isBackHover ? 'opacity-40' : 'opacity-0'} transition-all duration-700 linear transition-discrete` })] }), _jsxs("video", { autoPlay: true, muted: true, loop: true, className: `'w-vw absolute scale-y-130 z-90 select-none h-full pointer-events-none 
                            ${isBackHover ? 'opacity-60' : 'opacity-20'} t-0 l-0 r-0 b-0'`, style: {
                        mixBlendMode: 'screen',
                        width: '100vw',
                        // height: '100%'
                    }, children: [_jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/grunge_textures.mp4", type: "video/mp4" }), "Your browser does not support the video tag."] })] }) }));
};
