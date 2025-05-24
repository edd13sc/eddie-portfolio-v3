import React, { useState } from 'react';
import { CgArrowLongLeftL } from "react-icons/cg";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { TextRepeater } from '../util/ui/TextRepeater';
import { useNavigate, useNavigation } from 'react-router-dom';
import WaterLensCursor from '../util/ui/WaterRippleFX';

interface IPageHeadingInterface {
    text?: string;
    navigateIcon?: boolean;
}

export const PageHeading: React.FC<IPageHeadingInterface> = ({ text, navigateIcon }) => {
    const [isBackHover, setBackHover] = useState(false);
    const navigate = useNavigate()
    return (
        <WaterLensCursor>
            <div
                className='i uppercase font-medium pl-4 pt-8 pb-8 border-b border-b-gray-800 w-full 
            flex flex-col justify-center gap-4 w-full overflow-hidden'
                style={{ fontSize: '12em', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}
            >
                <div
                    className='w-fit flex flex-col justify-center ml-2 cursor-pointer'
                    onMouseEnter={() => { setBackHover(true) }}
                    onMouseLeave={() => { setBackHover(false) }}
                    onClick={() => navigate(-1)}
                >
                    <HiMiniArrowLongLeft
                        size={40}
                        color={isBackHover ? '#0736FE' : '#white'}
                        className='bg-neutral-100 cursor-pointer' />
                    <TextRepeater
                        stacked
                        maskingEnabled
                        text={<HiMiniArrowLongLeft size={40} color='#1d4ed8' className='bg-neutral-100' />}
                        repetitions={6}
                        fontSize='1em'
                        strokeColor='white'
                        backgroundColor='#1d4ed8'
                        spacing='6x'
                        parentClassName='absolute mt-[-3px] z-10 ml-[-4px] contents !opacity-0'
                        childClassName={` ${isBackHover ? 'opacity-30 text-white hover:text-[#0736FE]' : 'opacity-0'} transition-all duration-700 linear transition-discrete cursor-pointer`}
                    />
                </div>

                <div
                    className='w-full flex flex-col justify-center select-none'
                    onMouseEnter={() => { setBackHover(true) }}
                    onMouseLeave={() => { setBackHover(false) }}
                >
                    <p className='opacity-0'> {text}</p>

                    <p className={` absolute z-100 ${isBackHover ? 'text-[#0736FE]' : 'text-white'} font-bold transition-all duration-700 linear transition-discrete`}
                        style={{
                            zIndex: 100
                        }}
                    > {text}</p>
                    <TextRepeater
                        stacked
                        maskingEnabled
                        text={text}
                        repetitions={8}
                        fontSize='1em'
                        strokeColor='white'
                        backgroundColor='#010101'
                        spacing='6px'
                        parentClassName='absolute mt-[-3px] z-10 ml-[-4px] contents !opacity-0'
                        childClassName={`${isBackHover ? 'opacity-40' : 'opacity-0'} transition-all duration-700 linear transition-discrete`}
                    />
                </div>
                <video
                    autoPlay
                    muted
                    loop
                    className={`'w-vw absolute scale-y-130 z-90 select-none h-full pointer-events-none 
                            ${isBackHover ? 'opacity-60' : 'opacity-20'} t-0 l-0 r-0 b-0'`}
                    style={{
                        mixBlendMode: 'screen',
                        width: '100vw',
                        // height: '100%'
                    }}
                >
                    <source src="https://storage.cloud.google.com/engineered-imagination/grunge_textures.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </div>
        </WaterLensCursor>

    )
}
