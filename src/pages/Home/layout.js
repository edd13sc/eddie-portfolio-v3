import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { portrailImagesOfMe } from '../../util/data/portraitImgs';
import { Link } from 'react-router-dom';
import Atropos from 'atropos/react';
import PlaceholderImg from '../../assets/gifs/LoaderRender.gif';
const DynamicGrid = () => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [currentPortraitIndex, setCurrentPortraitIndex] = useState(2);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    // Refs for managing cycling
    const portraitIntervalRef = useRef(null);
    const imageCache = useRef([]);
    // Memoized handlers
    const handleMouseEnter = useCallback((cellId) => {
        setHoveredCell(cellId);
    }, []);
    const handleMouseLeave = useCallback(() => {
        setHoveredCell(null);
    }, []);
    // Memoized grid styles
    const gridStyle = useMemo(() => {
        switch (hoveredCell) {
            case 1:
                return {
                    gridTemplateColumns: '3fr 0.8fr 0.8fr',
                    gridTemplateRows: '0.8fr 1fr 1fr',
                };
            case 2:
                return {
                    gridTemplateColumns: '1.5fr 1fr 1fr',
                    gridTemplateRows: '1.5fr 1fr 0.8fr',
                };
            case 3:
                return {
                    gridTemplateColumns: '1.8fr 1.5fr 1.8fr',
                    gridTemplateRows: '0.8fr 1.5fr 0.8fr',
                };
            case 4:
                return {
                    gridTemplateColumns: '1.5fr 0.8fr 1.5fr',
                    gridTemplateRows: '0.8fr 1fr 1fr',
                };
            case 5:
                return {
                    gridTemplateColumns: '1.5fr 0.8fr 0.8fr',
                    gridTemplateRows: '0.8fr 1fr 1.5fr',
                };
            default:
                return {
                    gridTemplateColumns: '2fr 1fr 2fr',
                    gridTemplateRows: '1fr 1fr 1fr',
                };
        }
    }, [hoveredCell]);
    // Preload and cache all images
    useEffect(() => {
        let loadedCount = 0;
        const totalImages = portrailImagesOfMe.length;
        portrailImagesOfMe.forEach((image, index) => {
            const img = new Image();
            img.onload = () => {
                imageCache.current[index] = img;
                loadedCount++;
                if (loadedCount === totalImages) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setImagesLoaded(true);
                }
            };
            img.src = image.url;
        });
    }, []);
    // Smooth portrait cycling effect
    useEffect(() => {
        // Clear any existing interval
        if (portraitIntervalRef.current) {
            clearInterval(portraitIntervalRef.current);
            portraitIntervalRef.current = null;
        }
        if (hoveredCell === 3 && imagesLoaded) {
            // Start cycling
            portraitIntervalRef.current = setInterval(() => {
                setCurrentPortraitIndex(prevIndex => (prevIndex + 1) % portrailImagesOfMe.length);
            }, 100); // Slightly slower for smoother transition
        }
        else {
            // Reset to default image when not hovering
            setCurrentPortraitIndex(2);
        }
        // Cleanup
        return () => {
            if (portraitIntervalRef.current) {
                clearInterval(portraitIntervalRef.current);
                portraitIntervalRef.current = null;
            }
        };
    }, [hoveredCell, imagesLoaded]);
    const currentPortraitImg = portrailImagesOfMe[currentPortraitIndex]?.url;
    return (_jsxs("div", { className: 'w-full h-dvh overflow-hidden flex justify-center items-center', children: [_jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: `absolute inset-0 w-[105vw] h-full object-cover z-10 select-none pointer-events-none transition-opacity duration-300 ${hoveredCell === 3 ? 'opacity-60' : 'opacity-0'}`, style: {
                    mixBlendMode: 'screen',
                    // transform: 'scale(1.3)',
                }, children: _jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/grunge_textures.mp4", type: "video/mp4" }) }, "grunge-video"), _jsxs("div", { className: "w-full h-dvh grid transition-all duration-300 ease-out overflow-hidden", style: {
                    ...gridStyle,
                    gridTemplateAreas: `
            "cell1 cell2 cell2"
            "cell1 cell3 cell4"
            "cell5 cell5 cell4"
          `
                }, children: [_jsxs(Link, { to: 'projects', className: "bg-[#010101] border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer \r\n                    flex items-center justify-center overflow-hidden relative", style: {
                            gridArea: 'cell1',
                            borderColor: hoveredCell === 1 ? 'white' : '',
                            zIndex: hoveredCell === 1 ? 10 : 1,
                        }, onMouseEnter: () => handleMouseEnter(1), onMouseLeave: handleMouseLeave, children: [_jsx("span", { className: `font-medium text-white transition-all duration-500 uppercase z-20 ${hoveredCell !== 1 ? 'opacity-100' : 'opacity-0'}`, style: {
                                    fontSize: hoveredCell === 1 ? '3rem' : '2rem',
                                    transform: hoveredCell === 1 ? 'scale(1.1)' : 'scale(1)',
                                    fontFamily: 'Space Grotesk'
                                }, children: _jsx(Atropos, { children: "Projects" }) }), _jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: `absolute inset-0 w-full h-full object-cover z-10 select-none pointer-events-none 
                            bg-[#0736FE] transition-opacity duration-500 ${hoveredCell === 1 ? 'opacity-100' : 'opacity-0'}`, style: {
                                    mixBlendMode: 'screen',
                                    filter: 'scale(1.2)'
                                }, children: _jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/design_showcase.mp4", type: "video/mp4" }) }, "design-video")] }), _jsxs(Link, { to: 'about', className: "border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden relative", style: {
                            gridArea: 'cell2',
                            backgroundColor: hoveredCell === 2 ? '#0736FE' : '#010101',
                            borderColor: hoveredCell === 2 ? 'white' : '',
                            zIndex: hoveredCell === 2 ? 10 : 1,
                        }, onMouseEnter: () => handleMouseEnter(2), onMouseLeave: handleMouseLeave, children: [_jsx("span", { className: "font-medium text-white transition-all duration-500 uppercase z-20", style: {
                                    fontSize: hoveredCell === 2 ? '3rem' : '2rem',
                                    transform: hoveredCell === 2 ? 'scale(1.1)' : 'scale(1)',
                                    fontFamily: 'Space Grotesk'
                                }, children: "About" }), _jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: `absolute inset-0 max-w-[1200px] min-w-[1500px] scale-[1.2] z-10 select-none pointer-events-none transition-opacity duration-500 ${hoveredCell === 2 ? 'opacity-100' : 'opacity-0'}`, style: {
                                    mixBlendMode: 'screen',
                                    transform: 'rotate(90deg)',
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-750px',
                                    marginTop: '-600px'
                                }, children: _jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/video_overlays.mp4", type: "video/mp4" }) }, "overlay-video-2")] }), _jsx(Link, { to: 'about', className: "border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden relative", style: {
                            gridArea: 'cell3',
                            backgroundColor: hoveredCell === 3 ? '#0736FE' : '#010101',
                            borderColor: hoveredCell === 3 ? 'white' : '',
                            zIndex: hoveredCell === 3 ? 10 : 1,
                        }, onMouseEnter: () => handleMouseEnter(3), onMouseLeave: handleMouseLeave, children: !imagesLoaded ? (_jsx("img", { active: true, src: PlaceholderImg, style: { width: '100%', height: '100%' } })) : (_jsxs(_Fragment, { children: [_jsx("img", { src: currentPortraitImg, alt: 'Image of Eddie', className: 'absolute inset-0 w-full h-full object-cover z-20 opacity-90 transition-all duration-300 ease-out', style: {
                                        filter: hoveredCell === 3 ? 'saturate(0) contrast(170%) blur(10px)' : 'saturate(0) contrast(1) blur(0)',
                                        mixBlendMode: hoveredCell === 3 ? 'screen' : 'normal',
                                    } }), _jsx("img", { src: currentPortraitImg, alt: 'Image of Eddie', className: 'absolute inset-0 w-full h-full object-cover z-10 opacity-100 transition-filter duration-300 ease-out', style: {
                                        filter: hoveredCell === 3 ? 'saturate(0) contrast(190%) invert(0)' : 'saturate(1) contrast(0.75)',
                                    } })] })) }), _jsxs(Link, { to: 'skills', className: "bg-[#010101] border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer \r\n                    flex items-center justify-center overflow-hidden relative", style: {
                            gridArea: 'cell4',
                            borderColor: hoveredCell === 4 ? 'white' : '',
                            zIndex: hoveredCell === 4 ? 10 : 1,
                            background: hoveredCell === 4 ? 'white' : '#010101'
                        }, onMouseEnter: () => handleMouseEnter(4), onMouseLeave: handleMouseLeave, children: [_jsx("span", { className: "font-medium transition-all duration-500 uppercase z-30", style: {
                                    fontSize: hoveredCell === 4 ? '4rem' : '3rem',
                                    transform: hoveredCell === 4 ? 'scale(1.1)' : 'scale(1)',
                                    fontFamily: 'Space Grotesk',
                                    color: hoveredCell === 4 ? 'black' : 'white'
                                }, children: "Services" }), _jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: `max-w-[1200px] min-w-[800px] absolute z-20 select-none pointer-events-none invert-[1]
                            ${hoveredCell === 4 ? 'opacity-100' : 'opacity-0'}`, style: {
                                    mixBlendMode: 'screen',
                                    transform: 'rotate(90deg)',
                                    background: 'white'
                                }, children: _jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/video_overlays.mp4", type: "video/mp4" }) }, "overlay-video-4")] }), _jsxs(Link, { to: 'contact', className: "border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden relative", style: {
                            gridArea: 'cell5',
                            backgroundColor: hoveredCell === 5 ? '#0736FE' : '#010101',
                            borderColor: hoveredCell === 5 ? 'white' : '',
                            zIndex: hoveredCell === 5 ? 10 : 1,
                        }, onMouseEnter: () => handleMouseEnter(5), onMouseLeave: handleMouseLeave, children: [_jsx("span", { className: "font-base text-white transition-all duration-500 uppercase flex items-center z-20", style: {
                                    fontSize: hoveredCell === 5 ? '6rem' : '4rem',
                                    transform: hoveredCell === 5 ? 'scale(1.1)' : 'scale(1)',
                                    fontFamily: 'Space Grotesk'
                                }, children: "Contact" }), _jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", className: `max-w-[1500px] min-w-[900px] absolute z-10 select-none pointer-events-none 
                            ${hoveredCell === 5 ? 'opacity-100' : 'opacity-0'}`, style: {
                                    mixBlendMode: 'screen',
                                    transform: 'rotate(90deg)'
                                }, children: _jsx("source", { src: "https://storage.cloud.google.com/engineered-imagination/video_overlays.mp4", type: "video/mp4" }) }, "overlay-video-5")] })] })] }));
};
export default DynamicGrid;
