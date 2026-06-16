import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { FileUpload } from './components/FileUpload';
import { EvaluationResult } from './components/EvaluationResult';
import { extractFirstThreeLines } from './utils/pdfParser';
import { summarizeResume } from './utils/summarizer';
import { evaluateResume } from './utils/evaluator';
function App() {
    const [apiKey, setApiKey] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [summarizedText, setSummarizedText] = useState('');
    const [evaluationResult, setEvaluationResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const savedApiKey = localStorage.getItem('openai_api_key');
        if (savedApiKey) {
            setApiKey(savedApiKey);
        }
    }, []);
    const handleApiKeySubmit = (key) => {
        setApiKey(key);
        localStorage.setItem('openai_api_key', key);
    };
    const handleFileSelected = async (file) => {
        setIsLoading(true);
        setSummarizedText('');
        setEvaluationResult(null);
        try {
            const text = await extractFirstThreeLines(file);
            setExtractedText(text);
            if (apiKey) {
                try {
                    const summary = await summarizeResume(apiKey, text);
                    setSummarizedText(summary);
                    try {
                        const evaluation = await evaluateResume(apiKey, text);
                        setEvaluationResult(evaluation);
                    }
                    catch (error) {
                        console.error('평가 생성 오류:', error);
                        setEvaluationResult(null);
                    }
                }
                catch (error) {
                    console.error('요약 생성 오류:', error);
                    setSummarizedText('요약을 생성하는 중 오류가 발생했습니다.');
                }
            }
        }
        catch (error) {
            console.error('PDF 파싱 오류:', error);
            setExtractedText('PDF 파일을 읽는 중 오류가 발생했습니다.');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsxs("div", { style: { padding: '20px', height: '100vh' }, children: [_jsx("h1", { style: { marginTop: 0 }, children: "\uC774\uB825\uC11C \uB9AC\uBDF0\uC5B4" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100vh - 80px)' }, children: [_jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '20px' }, children: [_jsxs("div", { style: { border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }, children: [_jsx("h2", { style: { marginTop: 0 }, children: "API Key \uC785\uB825" }), _jsx(ApiKeyInput, { onApiKeySubmit: handleApiKeySubmit, apiKey: apiKey })] }), _jsxs("div", { style: { border: '1px solid #ddd', padding: '20px', borderRadius: '8px', flex: 1 }, children: [_jsx("h2", { style: { marginTop: 0 }, children: "\uC774\uB825\uC11C \uC5C5\uB85C\uB4DC" }), _jsx(FileUpload, { onFileSelected: handleFileSelected, isLoading: isLoading })] })] }), _jsxs("div", { style: { border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }, children: [_jsx("h2", { style: { marginTop: 0 }, children: "\uD3C9\uAC00 \uACB0\uACFC" }), _jsx(EvaluationResult, { evaluationResult: evaluationResult, isLoading: isLoading })] })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map