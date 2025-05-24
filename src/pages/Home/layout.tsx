import { useEffect, useState } from 'react';
import { portrailImagesOfMe } from '../../util/data/portraitImgs';
import { Link } from 'react-router-dom';
import Atropos from 'atropos/react';

const DynamicGrid = () => {
    const [hoveredCell, setHoveredCell] = useState<number>(0);
    const [currentPortraitImg, setCurrentPortraitImg] = useState(portrailImagesOfMe[2]?.url)

    const handleMouseEnter = (cellId: any) => {
        setHoveredCell(cellId);
    };

    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

    // Dynamic grid template based on hovered cell
    const getGridTemplate = () => {
        switch (hoveredCell) {
            case 1:
                return {
                    gridTemplateColumns: '3fr 0.8fr 0.8fr', // Cell 1 expands
                    gridTemplateRows: '0.8fr 1fr 1fr',
                };
            case 2:
                return {
                    gridTemplateColumns: '1.5fr 1fr 1fr',
                    gridTemplateRows: '1.5fr 1fr 0.8fr', // Cell 2 expands
                };
            case 3:
                return {
                    gridTemplateColumns: '1.8fr 1.5fr 1.8fr',
                    gridTemplateRows: '0.8fr 1.5fr 0.8fr', // Cell 3 expands
                };
            case 4:
                return {
                    gridTemplateColumns: '1.5fr 0.8fr 1.5fr',
                    gridTemplateRows: '0.8fr 1fr 1fr', // Cell 4 expands
                };
            case 5:
                return {
                    gridTemplateColumns: '1.5fr 0.8fr 0.8fr',
                    gridTemplateRows: '0.8fr 1fr 1.5fr', // Cell 5 expands
                };
            default:
                return {
                    gridTemplateColumns: '2fr 1fr 2fr', // Symmetric: cell 1 and 4 same width
                    gridTemplateRows: '1fr 1fr 1fr', // cell 2 and 5 same height
                };
        }
    };

    const gridStyle = getGridTemplate();

    useEffect(() => {
        // Preload all images
        portrailImagesOfMe.forEach(image => {
            const img = new Image();
            img.src = image.url;
        });
    }, [portrailImagesOfMe]);

    useEffect(() => {

        let interval;

        if (hoveredCell === 3) {
            let index = 0;
            interval = setInterval(() => {
                setCurrentPortraitImg(portrailImagesOfMe[index]?.url);
                index = (index + 1) % portrailImagesOfMe.length;
            }, 80);
        } else {
            // setCurrentPortraitImg(portrailImagesOfMe[2]?.url);
            return
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [hoveredCell, portrailImagesOfMe]);

    return (
        <div className='w-full h-dvh overflow-hidden flex justify-center items-center'>

            <video
                autoPlay
                muted
                loop
                className={`'w-vw absolute scale-y-130 z-10 select-none h-full pointer-events-none 
                            ${hoveredCell === 3 ? 'opacity-60' : 'opacity-0'} t-0 l-0 r-0 b-0'`}
                style={{
                    mixBlendMode: 'screen',
                    width: '105vw',
                    height: '100vh'
                }}
            >
                <source src="https://storage.cloud.google.com/engineered-imagination/grunge_textures.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div
                className="w-full h-dvh grid transition-all duration-300 linear"
                style={{
                    ...gridStyle,
                    gridTemplateAreas: `
                    "cell1 cell2 cell2"
                    "cell1 cell3 cell4"
                    "cell5 cell5 cell4"
                    `
                }}
            >
                {/* Cell 1 - Large left cell */}
                <Link to='projects'
                    className="bg-gray-800 border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden"
                    style={{
                        gridArea: 'cell1',
                        transform: hoveredCell === 1 ? 'scale(1)' : 'scale(1)',
                        backgroundColor: hoveredCell === 1 ? '#010101' : '#010101',
                        borderColor: hoveredCell === 1 ? 'white' : '',
                        zIndex: hoveredCell === 1 ? 10 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span
                        className={`font-medium text-white transition-all duration-500 uppercase ${hoveredCell !== 1 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            fontSize: hoveredCell === 1 ? '3rem' : '2rem',
                            transform: hoveredCell === 1 ? 'scale(1.1)' : 'scale(1)',
                            fontFamily: 'Space Grotesk'
                        }}
                    >
                        <Atropos>
                            Projects
                        </Atropos>

                    </span>

                    <video
                        autoPlay
                        muted
                        loop
                        className={`' h-full absolute z-10 select-none h-full pointer-events-none bg-[#0736FE] scale-[2.1]
                                    ${hoveredCell === 1 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            mixBlendMode: 'screen'
                        }}
                    >
                        <source src="https://storage.googleapis.com/engineered-imagination/design_showcase.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                </Link>

                {/* Cell 2 - Top right wide cell */}
                <Link to='about'
                    className="bg-gray-800 border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden"
                    style={{
                        gridArea: 'cell2',
                        transform: hoveredCell === 2 ? 'scale(1)' : 'scale(1)',
                        backgroundColor: hoveredCell === 2 ? '#0736FE' : '#010101',
                        borderColor: hoveredCell === 2 ? 'white' : '',
                        zIndex: hoveredCell === 2 ? 10 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span
                        className="font-medium text-white transition-all duration-500 uppercase"
                        style={{
                            fontSize: hoveredCell === 2 ? '3rem' : '36rem',
                            transform: hoveredCell === 2 ? 'scale(1.1)' : 'scale(1)',
                            fontFamily: 'Space Grotesk'
                        }}
                    >
                        {/* <Atropos
                            activeOffset={40}
                            shadow={false}
                        > */}
                        About
                        {/* </Atropos> */}
                    </span>
                    <video
                        autoPlay
                        muted
                        loop
                        className={`max-w-[1200px] min-w-[1500px] scale-[0.8] absolute z-10 select-none pointer-events-none
                            ${hoveredCell === 2 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            mixBlendMode: 'screen',
                            transform: 'rotate(90deg)'
                        }}
                    >
                        <source src="https://storage.googleapis.com/engineered-imagination/video_overlays.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>

                {/* Cell 3 - Middle small cell */}
                <Link to='about'
                    className="bg-gray-800 border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden"
                    style={{
                        gridArea: 'cell3',
                        transform: hoveredCell === 3 ? 'scale(1)' : 'scale(1)',
                        backgroundColor: hoveredCell === 3 ? '#0736FE' : '#010101',
                        borderColor: hoveredCell === 3 ? 'white' : '',
                        zIndex: hoveredCell === 3 ? 10 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span
                        className="font-medium text-white transition-all duration-800 uppercase flex justify-center items-center
                    w-full h-full
                    "
                        style={{
                            fontSize: hoveredCell === 3 ? '3rem' : '2rem',
                            transform: hoveredCell === 3 ? 'scale(1.1)' : 'scale(1)',
                            fontFamily: 'Space Grotesk',
                        }}
                    >
                        <img
                            src={currentPortraitImg}
                            alt='Image of Eddie'
                            className='h-full w-full absolute z-20 opacity-90 fit-cover transition-all duration-800 ease-out'
                            style={{
                                filter: hoveredCell === 3 ? 'saturate(0) contrast(170%) blur(10px)' : 'saturate(0) contrast(1) blur(0)',
                                mixBlendMode: hoveredCell === 3 ? 'screen' : undefined,
                                objectFit: 'cover'
                            }}
                        />
                        <img
                            src={currentPortraitImg}
                            alt='Image of Eddie'
                            className='h-full w-full absolute z-10 opacity-100 fit-cover transition-all duration-800 ease-out'
                            style={{
                                filter: hoveredCell === 3 ? 'saturate(0) contrast(190%) invert(0)' : 'saturate(1) contrast(0.75)',
                                objectFit: 'cover'
                            }}
                        />
                    </span>
                </Link>

                {/* Cell 4 - Tall right cell */}
                <Link to='skills'
                    className="bg-gray-800 border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden"
                    style={{
                        gridArea: 'cell4',
                        transform: hoveredCell === 4 ? 'scale(1)' : 'scale(1)',
                        backgroundColor: '#010101',
                        borderColor: hoveredCell === 4 ? 'white' : '',
                        zIndex: hoveredCell === 4 ? 10 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span
                        className="font-medium transition-all duration-500 uppercase absolute z-20"
                        style={{
                            fontSize: hoveredCell === 4 ? '4rem' : '3rem',
                            transform: hoveredCell === 4 ? 'scale(1.1)' : 'scale(1)',
                            fontFamily: 'Space Grotesk',
                            color: hoveredCell === 4 ? 'black' : 'white'
                        }}
                    >
                        Services
                    </span>
                    <video
                        autoPlay
                        muted
                        loop
                        className={`max-w-[1200px] min-w-[800px] absolute z-10 select-none pointer-events-none invert-[1]
                                    ${hoveredCell === 4 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            mixBlendMode: 'screen',
                            transform: 'rotate(90deg)'
                        }}
                    >
                        <source src="https://storage.googleapis.com/engineered-imagination/video_overlays.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>

                {/* Cell 5 - Bottom wide cell */}
                <Link to='contact'
                    className="bg-gray-800 border-2 border-gray-200 transition-all duration-500 ease-out cursor-pointer flex items-center justify-center overflow-hidden"
                    style={{
                        gridArea: 'cell5',
                        transform: hoveredCell === 5 ? 'scale(1)' : 'scale(1)',
                        backgroundColor: hoveredCell === 5 ? '#0736FE' : '#010101',
                        borderColor: hoveredCell === 5 ? 'white' : '',
                        zIndex: hoveredCell === 5 ? 10 : 1,
                    }}
                    onMouseEnter={() => handleMouseEnter(5)}
                    onMouseLeave={handleMouseLeave}
                >
                    <span
                        className="font-base text-white transition-all duration-500 uppercase flex items-center"
                        style={{
                            fontSize: hoveredCell === 5 ? '6rem' : '34rem',
                            transform: hoveredCell === 5 ? 'scale(1.1)' : 'scale(1)',
                            fontFamily: 'Space Grotesk'
                        }}
                    >
                        Contact
                    </span>
                    <video
                        autoPlay
                        muted
                        loop
                        className={`max-w-[1200px] min-w-[1500px] scale-[0.8] absolute z-10 select-none pointer-events-none
                                    ${hoveredCell === 5 ? 'opacity-100' : 'opacity-0'}`}
                        style={{
                            mixBlendMode: 'screen',
                            // transform: 'rotate(90deg)'
                        }}
                    >
                        <source src="https://storage.googleapis.com/engineered-imagination/video_overlays.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </Link>
            </div>
        </div >

    );
};

export default DynamicGrid;