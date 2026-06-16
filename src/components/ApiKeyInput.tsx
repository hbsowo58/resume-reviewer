import { useState } from 'react'

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void
  apiKey: string
}

export function ApiKeyInput({ onApiKeySubmit, apiKey }: ApiKeyInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onApiKeySubmit(inputValue)
      setInputValue('')
    }
  }

  return (
    <div>
      {apiKey ? (
        <div>
          <p style={{ color: 'green' }}>✓ API Key가 설정되었습니다</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="sk-..."
            style={{ padding: '8px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }}
          />
          <button
            type="submit"
            style={{ padding: '8px 16px', cursor: 'pointer', width: '100%' }}
          >
            API Key 저장
          </button>
        </form>
      )}
    </div>
  )
}
