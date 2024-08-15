import React, { useRef } from 'react'
import { AddFile } from '../../../api/UploadedFiles'
import './styles.scss'

export const UploadFiles = ({ setUploadedFiles, setUploadMessage }) => {
  const fileInputRef = useRef(null)
  const dropZoneRef = useRef(null)

  const handleFileUpload = async (file) => {
    if (!file) return

    try {
      const result = await AddFile(file)
      const fileInfos = result.fileInfos || [] 
      setUploadedFiles(fileInfos)
      setUploadMessage('File uploaded successfully!')
    } catch (error) {
      console.error('Error during file upload:', error)
      setUploadMessage('File upload failed!')
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFileUpload(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files[0]
    handleFileUpload(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="upload-files">
      <button onClick={handleChooseFile} className="choose-file-button">
        Choose File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div
        ref={dropZoneRef}
        className="drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & Drop your file here</p>
      </div>
    </div>
  )
}

export default UploadFiles
