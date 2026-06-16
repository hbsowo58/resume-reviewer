import OpenAI from 'openai';
export function createOpenAIClient(apiKey) {
    return new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true,
    });
}
//# sourceMappingURL=openaiClient.js.map