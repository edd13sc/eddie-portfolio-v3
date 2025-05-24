import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const TextRepeater = ({ text, repetitions = 5, direction = "horizontal", fontSize = "2rem", strokeWidth = "2px", strokeColor = "#333", spacing = "0.5rem", stacked = false, maskingEnabled = false, backgroundColor = "#ffffff", fontFamily = 'Plus Jakarta Sans', parentClassName = '', childClassName = '' }) => {
    const repeatedElements = Array.from({ length: repetitions }, (_, index) => {
        // Calculate opacity: starts at 1, gradually decreases to 0.1
        const opacity = 1 - (index / (repetitions - 1)) * 0.9;
        // Calculate position offset for stacked mode
        const gapValue = parseFloat(spacing);
        const offsetX = stacked && direction === 'horizontal' ? index * gapValue : 0;
        const offsetY = stacked && direction === 'vertical' ? index * gapValue : 0;
        return (_jsxs("div", { className: childClassName, style: {
                position: stacked ? 'absolute' : (direction === 'vertical' ? 'block' : 'inline-block'),
                transform: stacked ? `translate(${offsetX}px, ${offsetY}px)` : 'none',
                zIndex: repetitions - index,
                marginRight: !stacked && direction === 'horizontal' ? spacing : '0',
                marginBottom: !stacked && direction === 'vertical' ? spacing : '0',
                display: stacked ? 'block' : (direction === 'vertical' ? 'block' : 'inline-block'),
            }, children: [maskingEnabled && stacked && (_jsx("span", { style: {
                        fontSize,
                        fontWeight: 'bold',
                        color: backgroundColor,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        pointerEvents: 'none',
                        fontFamily: fontFamily
                    }, className: childClassName, children: text })), _jsx("span", { style: {
                        fontSize,
                        fontWeight: 'bold',
                        color: 'transparent',
                        WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
                        textStroke: `${strokeWidth} ${strokeColor}`,
                        opacity,
                        position: 'relative',
                        zIndex: 1,
                        fontFamily: fontFamily
                    }, children: text })] }, index));
    });
    return (_jsx("div", { className: parentClassName, style: {
            display: stacked ? 'relative' : 'flex',
            flexDirection: !stacked ? (direction === 'vertical' ? 'column' : 'row') : undefined,
            alignItems: !stacked ? (direction === 'vertical' ? 'flex-start' : 'center') : undefined,
            flexWrap: !stacked ? (direction === 'horizontal' ? 'nowrap' : 'wrap') : undefined,
            backgroundColor: stacked && maskingEnabled ? backgroundColor : 'transparent',
            padding: stacked ? '20px' : '0',
            overflow: 'visible',
            fontFamily: 'Plus Jakarta Sans'
        }, children: repeatedElements }));
};
