import React from 'react';

interface IPageHeadingInterface {
    text?: string;
}

export const PageHeading: React.FC<IPageHeadingInterface> = ({ text }) => {
    return (
        <div
            className='i uppercase font-medium pb-8 border-b border-b-1 w-full'
            style={{ fontSize: '12em', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}
        >
            {text}
        </div>
    )
}
