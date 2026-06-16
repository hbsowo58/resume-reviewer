import { EvaluationResult as EvaluationResultType } from '../utils/evaluator'

interface EvaluationResultProps {
  evaluationResult: EvaluationResultType | null
  isLoading: boolean
}

export function EvaluationResult({ evaluationResult, isLoading }: EvaluationResultProps) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <p style={{ color: '#666', fontSize: '16px' }}>평가 중...</p>
      </div>
    )
  }

  if (!evaluationResult) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#999',
        }}
      >
        <p style={{ fontSize: '14px' }}>평가 결과가 여기에 표시됩니다</p>
      </div>
    )
  }

  const gradeColor = (grade: string) => {
    const colors: Record<string, string> = {
      A: '#27AE60',
      B: '#52C77A',
      C: '#F39C12',
      D: '#E67E22',
      E: '#E74C3C',
      F: '#95A5A6',
    }
    return colors[grade] || '#000'
  }

  const getGradeWidth = (grade: string) => {
    const widths: Record<string, number> = { A: 100, B: 80, C: 60, D: 40, E: 20, F: 0 }
    return widths[grade] || 0
  }

  const criteria = [
    { key: 'responsibility', label: '책임감', icon: '📌', data: evaluationResult.responsibility },
    { key: 'character', label: '성격', icon: '🎭', data: evaluationResult.character },
    { key: 'sociability', label: '사교성', icon: '🤝', data: evaluationResult.sociability },
    { key: 'integrity', label: '성실성', icon: '🎓', data: evaluationResult.integrity },
    { key: 'competency', label: '역량', icon: '💼', data: evaluationResult.competency },
  ]

  return (
    <div style={{ overflow: 'auto', height: '100%', paddingRight: '8px' }}>
      {/* 최종 등급 섹션 */}
      <div
        style={{
          background: `linear-gradient(135deg, ${gradeColor(evaluationResult.finalGrade)} 0%, ${gradeColor(evaluationResult.finalGrade)}dd 100%)`,
          borderRadius: '12px',
          padding: '30px 20px',
          marginBottom: '25px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', opacity: 0.9 }}>최종 평가 등급</p>
        <div style={{ fontSize: '72px', fontWeight: 'bold', letterSpacing: '4px' }}>
          {evaluationResult.finalGrade}
        </div>
      </div>

      {/* 기준별 평가 섹션 */}
      <div style={{ marginBottom: '10px' }}>
        <p style={{ margin: '15px 0 12px 0', color: '#555', fontSize: '13px', fontWeight: '600' }}>
          평가 기준별 결과
        </p>

        {criteria.map((criterion) => (
          <div
            key={criterion.key}
            style={{
              marginBottom: '14px',
              padding: '12px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px', marginRight: '8px' }}>{criterion.icon}</span>
              <span style={{ flex: 1, color: '#333', fontSize: '13px', fontWeight: '500' }}>
                {criterion.label}
              </span>
              <div
                style={{
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
                }}
              >
                {criterion.data.grade}
              </div>
            </div>

            {/* 등급 진행률 바 */}
            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#e0e0e0',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '8px',
              }}
            >
              <div
                style={{
                  width: `${getGradeWidth(criterion.data.grade)}%`,
                  height: '100%',
                  backgroundColor: gradeColor(criterion.data.grade),
                  borderRadius: '3px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>

            {/* 평가 이유 */}
            <p style={{ margin: '0', color: '#777', fontSize: '11px', lineHeight: '1.4' }}>
              {criterion.data.reason}
            </p>
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div
        style={{
          marginTop: '20px',
          padding: '12px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          fontSize: '11px',
          color: '#666',
        }}
      >
        <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#333' }}>등급 기준</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {['A', 'B', 'C', 'D', 'E', 'F'].map((grade) => (
            <div key={grade} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '2px',
                  backgroundColor: gradeColor(grade),
                  marginRight: '6px',
                }}
              />
              <span>{grade}: {['탁월', '우수', '보통', '미흡', '부족', '불충분'][['A', 'B', 'C', 'D', 'E', 'F'].indexOf(grade)]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
