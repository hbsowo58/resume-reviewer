interface FileUploadProps {
  onFileSelected: (file: File) => void
  isLoading: boolean
}

export function FileUpload({ onFileSelected, isLoading }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'application/pdf') {
      onFileSelected(file)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={isLoading}
        style={{ padding: '8px' }}
      />
      {isLoading && <p style={{ color: '#666', margin: '10px 0 0 0' }}>처리 중...</p>}
    </div>
  )
}
