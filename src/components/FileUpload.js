import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FileUpload({ onFileSelected, isLoading }) {
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            onFileSelected(file);
        }
    };
    return (_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' }, children: [_jsx("input", { type: "file", accept: ".pdf", onChange: handleFileChange, disabled: isLoading, style: { padding: '8px' } }), isLoading && _jsx("p", { style: { color: '#666', margin: '10px 0 0 0' }, children: "\uCC98\uB9AC \uC911..." })] }));
}
//# sourceMappingURL=FileUpload.js.map