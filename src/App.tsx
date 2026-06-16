import { useState, useEffect } from 'react'
import { ApiKeyInput } from './components/ApiKeyInput'
import { FileUpload } from './components/FileUpload'
import { EvaluationResult } from './components/EvaluationResult'
import { extractFirstThreeLines } from './utils/pdfParser'
import { summarizeResume } from './utils/summarizer'
import { evaluateResume, EvaluationResult as EvaluationResultType } from './utils/evaluator'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [summarizedText, setSummarizedText] = useState('')
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key)
    localStorage.setItem('openai_api_key', key)
  }

  const handleFileSelected = async (file: File) => {
    setIsLoading(true)
    setSummarizedText('')
    setEvaluationResult(null)
    try {
      const text = await extractFirstThreeLines(file)
      setExtractedText(text)

      if (apiKey) {
        try {
          const summary = await summarizeResume(apiKey, text)
          setSummarizedText(summary)

          try {
            const evaluation = await evaluateResume(apiKey, text)
            setEvaluationResult(evaluation)
          } catch (error) {
            console.error('평가 생성 오류:', error)
            setEvaluationResult(null)
          }
        } catch (error) {
          console.error('요약 생성 오류:', error)
          setSummarizedText('요약을 생성하는 중 오류가 발생했습니다.')
        }
      }
    } catch (error) {
      console.error('PDF 파싱 오류:', error)
      setExtractedText('PDF 파일을 읽는 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', height: '100vh' }}>
      <h1 style={{ marginTop: 0 }}>이력서 리뷰어</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100vh - 80px)' }}>
        {/* 왼쪽 섹션 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h2 style={{ marginTop: 0 }}>API Key 입력</h2>
            <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} apiKey={apiKey} />
          </div>

          <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', flex: 1 }}>
            <h2 style={{ marginTop: 0 }}>이력서 업로드</h2>
            <FileUpload onFileSelected={handleFileSelected} isLoading={isLoading} />
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ marginTop: 0 }}>평가 결과</h2>
          <EvaluationResult evaluationResult={evaluationResult} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}

export default App
