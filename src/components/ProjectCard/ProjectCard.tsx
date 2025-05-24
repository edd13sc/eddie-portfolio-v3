import React, { useState, useCallback, memo, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton, Image } from 'antd';
import { FaArrowRight } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";
import { HiMiniDevicePhoneMobile, HiOutlineGlobeAlt } from 'react-icons/hi2';
import { PiDevices } from "react-icons/pi";

// Lazy load Atropos component
const Atropos = lazy(() => import('atropos/react'));

export interface IProductCard {
    id: number;
    hrefLink: string;
    imgUrl: string;
    logoUrl: string;
    imgAlt: string;
    projectName: string;
    projectDescription: string;
    pdfUrl: string;
    downloadUrl: string;
    platform: 'Mobile' | 'Web' | 'System';
    tags: string[];
}

// Memoized platform icon component
const PlatformIcon = memo(({ platform }: { platform: IProductCard['platform'] }) => {
    const iconProps = { size: 18 };

    switch (platform) {
        case 'Web':
            return <HiOutlineGlobeAlt {...iconProps} />;
        case 'Mobile':
            return <HiMiniDevicePhoneMobile {...iconProps} />;
        case 'System':
            return <PiDevices {...iconProps} />;
        default:
            return null;
    }
});

PlatformIcon.displayName = 'PlatformIcon';

// Skeleton component for loading state
const ProjectCardSkeleton = () => (
    <div className="overflow-hidden w-full min-w-[250px] max-w-[600px] border border-gray-800 flex flex-col gap-6 h-fit">
        <Skeleton.Image
            style={{ width: '100%', height: '200px' }}
            active
        />
        <div className="p-6 mt-[-120px]">
            <div className="flex flex-col gap-6 w-full p-4 bg-[#010101] border border-gray-800">
                <div className="flex flex-col gap-3">
                    <Skeleton.Input
                        style={{ width: '60%', height: '24px' }}
                        active
                    />
                    <Skeleton
                        paragraph={{ rows: 3, width: ['100%', '100%', '80%'] }}
                        title={false}
                        active
                    />
                    <div className="flex items-center gap-2 mt-2">
                        <Skeleton.Avatar size="small" shape="square" active />
                        <Skeleton.Input style={{ width: '80px', height: '16px' }} active />
                    </div>
                </div>
                <div className="flex w-full gap-4 justify-between items-center">
                    <Skeleton.Button style={{ width: '120px' }} active />
                    <Skeleton.Avatar size="small" active />
                </div>
            </div>
        </div>
    </div>
);

export const ProjectCard: React.FC<IProductCard> = memo((props: IProductCard) => {
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
        objectFit: 'cover' as const,
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

    return (
        <div
            className="overflow-hidden w-full min-w-[250px] max-w-[600px] border border-gray-800 cursor-pointer 
            transition-all duration-700 ease-in-out flex flex-col gap-6 h-fit"
            style={cardStyle}
        >
            {/* Image with lazy loading */}
            <div className="relative">
                {!imageLoaded && (
                    <div className="absolute inset-0 z-10">
                        <Skeleton
                            style={{ width: '100%', height: '200px' }}
                            active
                        />
                    </div>
                )}
                <Image
                    src={props.imgUrl}
                    alt={props.imgAlt}
                    className="bg-gray-700 w-full h-[200px] transition-all duration-200 ease-in-out"
                    style={imageStyle}
                    onLoad={handleImageLoad}
                    loading="lazy"
                    placeholder={
                        <Skeleton.Image
                            style={{ width: '100%', height: '200px' }}
                            active
                        />
                    }
                    preview={false}
                />
            </div>

            {/* Content with Atropos effect */}
            <Suspense fallback={
                <div className="p-6 mt-[-120px]">
                    <div className="flex flex-col gap-6 w-full p-4 bg-[#010101] border border-gray-800">
                        <Skeleton paragraph={{ rows: 4 }} active />
                    </div>
                </div>
            }>
                {atroposLoaded ? (
                    <Atropos
                        className="p-6 hover:mt-[-200px] mt-[-120px] transition-all duration-700 ease-in-out"
                        shadow={false}
                        highlight={false}
                    >
                        <div
                            className="flex flex-col gap-6 w-full p-4 bg-[#010101] border border-gray-800 hover:invert-[1] 
                            transition-all duration-300 ease-in-out"
                            style={contentStyle}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Details section */}
                            <div className="pd-details flex flex-col gap-3">
                                {/* Project name */}
                                <h3
                                    className="font-bold text-2xl leading-tight"
                                    style={{ fontSize: '1.5em' }}
                                >
                                    {props.projectName}
                                </h3>

                                {/* Project description */}
                                <p className="text-sm font-normal h-[80px] overflow-hidden text-ellipsis line-clamp-4">
                                    {props.projectDescription}
                                </p>

                                {/* Platform */}
                                <div className="text-sm font-normal overflow-hidden text-ellipsis line-clamp-1 flex items-center 
                                             gap-2 mt-2 opacity-70">
                                    <PlatformIcon platform={props.platform} />
                                    <span>{props.platform}</span>
                                </div>
                            </div>

                            {/* Actions section */}
                            <div className="pd-actions flex w-full gap-4 justify-between items-center">
                                {/* View project link */}
                                <Link
                                    to={props.hrefLink}
                                    className="pd-actions-view flex w-full justify-between items-center p-3 py-2 
                                    text-black uppercase font-bold bg-white hover:rounded-lg hover:bg-[#010101] 
                                    hover:text-white hover:border hover:border-gray-600 transition-all duration-300 ease-in-out"
                                    aria-label={`Read more about ${props.projectName}`}
                                >
                                    <span>Read</span>
                                    <FaArrowRight />
                                </Link>

                                {/* Download button */}
                                <button
                                    className="p-2 hover:bg-gray-800 rounded transition-colors duration-200"
                                    onClick={handleDownload}
                                    aria-label={`Download ${props.projectName}`}
                                    type="button"
                                >
                                    <HiDownload size={20} />
                                </button>
                            </div>
                        </div>
                    </Atropos>
                ) : (
                    <ProjectCardSkeleton />
                )}
            </Suspense>
        </div>
    );
});

ProjectCard.displayName = 'ProjectCard';