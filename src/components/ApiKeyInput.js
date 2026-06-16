import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function ApiKeyInput({ onApiKeySubmit, apiKey }) {
    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onApiKeySubmit(inputValue);
            setInputValue('');
        }
    };
    return (_jsx("div", { children: apiKey ? (_jsx("div", { children: _jsx("p", { style: { color: 'green' }, children: "\u2713 API Key\uAC00 \uC124\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4" }) })) : (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: "password", value: inputValue, onChange: (e) => setInputValue(e.target.value), placeholder: "sk-...", style: { padding: '8px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' } }), _jsx("button", { type: "submit", style: { padding: '8px 16px', cursor: 'pointer', width: '100%' }, children: "API Key \uC800\uC7A5" })] })) }));
}
//# sourceMappingURL=ApiKeyInput.js.map