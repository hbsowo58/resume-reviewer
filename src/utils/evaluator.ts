import OpenAI from 'openai'

export interface EvaluationResult {
  responsibility: { grade: string; reason: string }
  character: { grade: string; reason: string }
  sociability: { grade: string; reason: string }
  integrity: { grade: string; reason: string }
  competency: { grade: string; reason: string }
  finalGrade: string
}

const JUDGE_SPEC = `
## 평가 기준

### 1. 책임감 (Responsibility)
- A: 리더십 역할, 주도적 프로젝트 진행, 목표 달성 및 책임 완수 명확하게 표현
- B: 팀 내 중요한 역할, 프로젝트 성공적 완수, 책임 의식이 충분함
- C: 기본적인 업무 책임 수행, 주어진 일 완료
- D: 책임감 표현이 약함, 보조적 역할만 기술
- E: 책임감 관련 내용이 거의 없음
- F: 책임감을 찾을 수 없음

### 2. 성격 (Character)
- A: 뛰어난 전문성, 긍정적 인상, 일관된 가치관 표현
- B: 좋은 전문성, 신뢰할 수 있는 이미지
- C: 평범한 전문성, 중립적 인상
- D: 전문성이 약해 보임, 모호한 인상
- E: 성격이나 전문성 표현이 거의 없음
- F: 부정적 인상이나 신뢰성 결여

### 3. 사교성/친화력 (Sociability)
- A: 팀 리드, 협업 경험 풍부, 커뮤니케이션 능력 우수함
- B: 팀 프로젝트 참여, 협업 경험이 충분함
- C: 기본적인 협업 경험, 팀 참여 기록 있음
- D: 협업 경험이 적거나 약함
- E: 사교성/협업 관련 내용이 거의 없음
- F: 협업이나 대인관계 능력을 찾을 수 없음

### 4. 성실성 (Integrity)
- A: 명문대 졸업(또는 상위권 대학), GPA 3.8 이상 또는 학사학위 이상(석사, 박사)
- B: 상위권 대학 졸업, GPA 3.5 이상 또는 대학원 진학/수료
- C: 일반 4년제 대학 졸업, GPA 3.0 이상 또는 관련 자격증 보유
- D: 일반 대학 졸업, GPA 2.5 이상 또는 2년제 대학 졸업
- E: 대학 졸업 미기재 또는 학점 정보 없음
- F: 학력 정보가 없음

### 5. 역량 (Competency)
- A: 다양한 고급 기술, 깊이 있는 경험, 전문성 뛰어남
- B: 충분한 기술 스택, 실무 경험 풍부
- C: 기본적인 기술 능력, 필요한 경험 보유
- D: 제한된 기술, 경험 부족
- E: 역량 관련 내용이 거의 없음
- F: 기술이나 역량을 찾을 수 없음
`

export async function evaluateResume(apiKey: string, resumeText: string): Promise<EvaluationResult> {
  const client = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  })

  const prompt = `당신은 이력서 평가 전문가입니다. 다음 평가 기준에 따라 이력서를 평가하세요.

${JUDGE_SPEC}

다음 이력서를 평가하고, 다음 JSON 형식으로 응답하세요:
{
  "responsibility": { "grade": "A-F", "reason": "간단한 평가 이유" },
  "character": { "grade": "A-F", "reason": "간단한 평가 이유" },
  "sociability": { "grade": "A-F", "reason": "간단한 평가 이유" },
  "integrity": { "grade": "A-F", "reason": "간단한 평가 이유" },
  "competency": { "grade": "A-F", "reason": "간단한 평가 이유" }
}

이력서:
${resumeText}`

  const completion = await client.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const responseText = completion.choices[0]?.message?.content || ''

  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('평가 결과를 파싱할 수 없습니다.')
  }

  const evaluationData = JSON.parse(jsonMatch[0])

  const finalGrade = calculateFinalGrade({
    responsibility: evaluationData.responsibility.grade,
    character: evaluationData.character.grade,
    sociability: evaluationData.sociability.grade,
    integrity: evaluationData.integrity.grade,
    competency: evaluationData.competency.grade,
  })

  return {
    responsibility: evaluationData.responsibility,
    character: evaluationData.character,
    sociability: evaluationData.sociability,
    integrity: evaluationData.integrity,
    competency: evaluationData.competency,
    finalGrade,
  }
}

function calculateFinalGrade(grades: Record<string, string>): string {
  const gradeValues: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, E: 1, F: 0 }
  const gradeNames = ['A', 'B', 'C', 'D', 'E', 'F']

  const values = Object.values(grades).map((g) => gradeValues[g] || 0)
  const countByGrade: Record<number, number> = {}

  values.forEach((v) => {
    countByGrade[v] = (countByGrade[v] || 0) + 1
  })

  for (let threshold = 5; threshold >= 0; threshold--) {
    const countAboveThreshold = values.filter((v) => v >= threshold).length
    if (countAboveThreshold >= 3) {
      return gradeNames[5 - threshold]
    }
  }

  return 'F'
}
