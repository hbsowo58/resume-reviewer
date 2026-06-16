export interface EvaluationResult {
    responsibility: {
        grade: string;
        reason: string;
    };
    character: {
        grade: string;
        reason: string;
    };
    sociability: {
        grade: string;
        reason: string;
    };
    integrity: {
        grade: string;
        reason: string;
    };
    competency: {
        grade: string;
        reason: string;
    };
    finalGrade: string;
}
export declare function evaluateResume(apiKey: string, resumeText: string): Promise<EvaluationResult>;
//# sourceMappingURL=evaluator.d.ts.map