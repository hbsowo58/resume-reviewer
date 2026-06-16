import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function EvaluationResult({ evaluationResult, isLoading }) {
    if (isLoading) {
        return (_jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }, children: _jsx("p", { style: { color: '#666', fontSize: '16px' }, children: "\uD3C9\uAC00 \uC911..." }) }));
    }
    if (!evaluationResult) {
        return (_jsx("div", { style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#999',
            }, children: _jsx("p", { style: { fontSize: '14px' }, children: "\uD3C9\uAC00 \uACB0\uACFC\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4" }) }));
    }
    const gradeColor = (grade) => {
        const colors = {
            A: '#27AE60',
            B: '#52C77A',
            C: '#F39C12',
            D: '#E67E22',
            E: '#E74C3C',
            F: '#95A5A6',
        };
        return colors[grade] || '#000';
    };
    const getGradeWidth = (grade) => {
        const widths = { A: 100, B: 80, C: 60, D: 40, E: 20, F: 0 };
        return widths[grade] || 0;
    };
    const criteria = [
        { key: 'responsibility', label: '책임감', icon: '📌', data: evaluationResult.responsibility },
        { key: 'character', label: '성격', icon: '🎭', data: evaluationResult.character },
        { key: 'sociability', label: '사교성', icon: '🤝', data: evaluationResult.sociability },
        { key: 'integrity', label: '성실성', icon: '🎓', data: evaluationResult.integrity },
        { key: 'competency', label: '역량', icon: '💼', data: evaluationResult.competency },
    ];
    return (_jsxs("div", { style: { overflow: 'auto', height: '100%', paddingRight: '8px' }, children: [_jsxs("div", { style: {
                    background: `linear-gradient(135deg, ${gradeColor(evaluationResult.finalGrade)} 0%, ${gradeColor(evaluationResult.finalGrade)}dd 100%)`,
                    borderRadius: '12px',
                    padding: '30px 20px',
                    marginBottom: '25px',
                    color: 'white',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }, children: [_jsx("p", { style: { margin: '0 0 10px 0', fontSize: '12px', opacity: 0.9 }, children: "\uCD5C\uC885 \uD3C9\uAC00 \uB4F1\uAE09" }), _jsx("div", { style: { fontSize: '72px', fontWeight: 'bold', letterSpacing: '4px' }, children: evaluationResult.finalGrade })] }), _jsxs("div", { style: { marginBottom: '10px' }, children: [_jsx("p", { style: { margin: '15px 0 12px 0', color: '#555', fontSize: '13px', fontWeight: '600' }, children: "\uD3C9\uAC00 \uAE30\uC900\uBCC4 \uACB0\uACFC" }), criteria.map((criterion) => (_jsxs("div", { style: {
                            marginBottom: '14px',
                            padding: '12px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            border: '1px solid #eee',
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', marginBottom: '8px' }, children: [_jsx("span", { style: { fontSize: '18px', marginRight: '8px' }, children: criterion.icon }), _jsx("span", { style: { flex: 1, color: '#333', fontSize: '13px', fontWeight: '500' }, children: criterion.label }), _jsx("div", { style: {
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '6px',
                                            backgroundColor: gradeColor(criterion.data.grade),
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                        }, children: criterion.data.grade })] }), _jsx("div", { style: {
                                    width: '100%',
                                    height: '6px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                    marginBottom: '8px',
                                }, children: _jsx("div", { style: {
                                        width: `${getGradeWidth(criterion.data.grade)}%`,
                                        height: '100%',
                                        backgroundColor: gradeColor(criterion.data.grade),
                                        borderRadius: '3px',
                                        transition: 'width 0.3s ease',
                                    } }) }), _jsx("p", { style: { margin: '0', color: '#777', fontSize: '11px', lineHeight: '1.4' }, children: criterion.data.reason })] }, criterion.key)))] }), _jsxs("div", { style: {
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#666',
                }, children: [_jsx("p", { style: { margin: '0 0 8px 0', fontWeight: '600', color: '#333' }, children: "\uB4F1\uAE09 \uAE30\uC900" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }, children: ['A', 'B', 'C', 'D', 'E', 'F'].map((grade) => (_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("div", { style: {
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '2px',
                                        backgroundColor: gradeColor(grade),
                                        marginRight: '6px',
                                    } }), _jsxs("span", { children: [grade, ": ", ['탁월', '우수', '보통', '미흡', '부족', '불충분'][['A', 'B', 'C', 'D', 'E', 'F'].indexOf(grade)]] })] }, grade))) })] })] }));
}
//# sourceMappingURL=EvaluationResult.js.map