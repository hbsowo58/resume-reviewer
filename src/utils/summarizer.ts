import { createOpenAIClient } from './openaiClient'

export async function summarizeResume(apiKey: string, resumeText: string): Promise<string> {
  const client = createOpenAIClient(apiKey)

  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1024,
    messages: [
      {
        role: 'system',
        content: '당신은 이력서 분석 전문가입니다. 이력서 내용을 간결하고 명확하게 요약하세요.',
      },
      {
        role: 'user',
        content: `다음은 이력서의 일부입니다. 이 내용을 간결하게 요약해주세요:\n\n${resumeText}`,
      },
    ],
  })

  const textContent = completion.choices[0]?.message?.content
  if (textContent) {
    return textContent
  }

  return '요약을 생성할 수 없습니다.'
}
