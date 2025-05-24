import React, { useState, useEffect, useRef } from 'react';

const WaterLensCursor = ({ children, intensity = 1, size = 240, fadeSpeed = 0.05 }) => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const [effectIntensity, setEffectIntensity] = useState(0);
    const containerRef = useRef(null);
    const moveTimeoutRef = useRef(null);
    const intensityAnimationRef = useRef();

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const newPos = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
                setMousePos(newPos);

                setIsMoving(true);
                setEffectIntensity(intensity);

                if (moveTimeoutRef.current) {
                    clearTimeout(moveTimeoutRef.current);
                }

                moveTimeoutRef.current = setTimeout(() => {
                    setIsMoving(false);
                }, 100);
            }
        };

        const handleMouseLeave = () => {
            setIsMoving(false);
            setEffectIntensity(0);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (container) {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
            if (moveTimeoutRef.current) {
                clearTimeout(moveTimeoutRef.current);
            }
            if (intensityAnimationRef.current) {
                cancelAnimationFrame(intensityAnimationRef.current);
            }
        };
    }, [intensity]);

    // Smooth intensity animation
    useEffect(() => {
        if (!isMoving && effectIntensity > 0) {
            const animate = () => {
                setEffectIntensity(prev => {
                    const newIntensity = prev - fadeSpeed;
                    if (newIntensity <= 0) {
                        return 0;
                    }
                    intensityAnimationRef.current = requestAnimationFrame(animate);
                    return newIntensity;
                });
            };
            intensityAnimationRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (intensityAnimationRef.current) {
                cancelAnimationFrame(intensityAnimationRef.current);
            }
        };
    }, [isMoving, effectIntensity, fadeSpeed]);

    const generateWaterDistortion = (rect) => {
        if (effectIntensity === 0) return {};

        const distance = Math.sqrt(
            (mousePos.x - rect.left - rect.width / 2) ** 2 +
            (mousePos.y - rect.top - rect.height / 2) ** 2
        );

        const maxDistance = 300;
        const baseIntensity = Math.max(0, 1 - distance / maxDistance);
        const finalIntensity = baseIntensity * effectIntensity;

        if (finalIntensity < 0.01) return {};

        const waveAmount = finalIntensity * 15;
        const time = Date.now() * 0.003;

        return {
            filter: `
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='water-${time}'%3E%3CfeTurbulence baseFrequency='0.015 0.025' numOctaves='2' result='noise' seed='${Math.floor(time)}'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='${waveAmount}'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E#water-${time}")
      `,
            transform: `scale(${1 + finalIntensity * 0.02})`,
        };
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ cursor: 'none' }}
        >
            {/* Content */}
            <div className="relative z-10">
                {React.Children.map(children, (child, index) => {
                    if (React.isValidElement(child)) {
                        const childRef = useRef(null);
                        return React.cloneElement(child, {
                            ref: childRef,
                            style: {
                                ...child.props.style,
                                ...generateWaterDistortion(childRef.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 })
                            }
                        });
                    }
                    return child;
                })}
            </div>

            {/* Water lens effect */}
            {effectIntensity > 0 && (
                <div
                    className="absolute z-20 pointer-events-none"
                    style={{
                        left: mousePos.x - size / 2,
                        top: mousePos.y - size / 2,
                        width: `${size}px`,
                        height: `${size}px`,
                        opacity: effectIntensity,
                    }}
                >
                    {/* Main distorted water lens */}
                    <div
                        className="absolute inset-0"
                        style={{
                            borderRadius: '50%',
                            backdropFilter: `blur(${0.5 * effectIntensity}px)`,
                            background: `radial-gradient(circle, rgba(255,255,255,${0.08 * effectIntensity}) 0%, rgba(255,255,255,${0.04 * effectIntensity}) 40%, transparent 70%)`,
                            boxShadow: `inset 0 0 30px rgba(255,255,255,${0.15 * effectIntensity}), 0 0 20px rgba(255,255,255,${0.08 * effectIntensity})`,
                            filter: `
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='lensDistort'%3E%3CfeTurbulence baseFrequency='0.02 0.03' numOctaves='1' result='noise' seed='${Math.floor(Date.now() * 0.002)}'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='${effectIntensity * 8}'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E#lensDistort")
              `,
                            transform: `scale(${0.8 + effectIntensity * 0.4}) rotate(${Date.now() * 0.02}deg)`,
                        }}
                    />

                    {/* Inner fluid core */}
                    <div
                        className="absolute"
                        style={{
                            left: `${size * 0.1}px`,
                            top: `${size * 0.1}px`,
                            width: `${size * 0.8}px`,
                            height: `${size * 0.8}px`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, rgba(255,255,255,${0.05 * effectIntensity}) 0%, transparent 60%)`,
                            filter: `
                url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='innerWave'%3E%3CfeTurbulence baseFrequency='0.03 0.02' numOctaves='1' result='noise' seed='${Math.floor(Date.now() * 0.003)}'/%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='${effectIntensity * 12}'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E#innerWave")
              `,
                            transform: `scale(${1 + effectIntensity * 0.2}) rotate(${-Date.now() * 0.015}deg)`,
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default WaterLensCursor;