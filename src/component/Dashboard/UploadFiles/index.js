import React, { useRef } from 'react'
import { AddFile } from '../../../api/UploadedFiles'
import './styles.scss'

export const UploadFiles = ({ setUploadMessage, setData, setFileNames }) => {
  const fileInputRef = useRef(null)
  const dropZoneRef = useRef(null)

  const handleFileUpload = async (file) => {
    if (!file) return

    const allowedTypes = ['text/csv', 'application/vnd.ms-excel']
    if (!allowedTypes.includes(file.type)) {
      setUploadMessage('Invalid file type. Please upload a CSV file.')
      return
    }

    try {
      const res = await AddFile(file)
      const { fileName, csvData } = res
      setFileNames(fileName || '')
      setData(csvData) 
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
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.add('drag-over')
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (dropZoneRef.current) {
      dropZoneRef.current.classList.remove('drag-over')
    }
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
        onDragLeave={handleDragLeave}
      >
        <p>Drag & Drop your file here</p>
      </div>
    </div>
  )
}

export default UploadFiles
