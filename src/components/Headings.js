import { jsx as _jsx } from "react/jsx-runtime";
export const PageHeading = ({ text }) => {
    return (_jsx("div", { className: 'uppercase font-medium pb-8 border-b border-b-1', style: { fontSize: '12em', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }, children: text }));
};
