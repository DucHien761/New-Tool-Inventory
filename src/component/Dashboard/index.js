import React, { useState } from 'react'
import axios from 'axios'
import UploadFiles from '../Dashboard/UploadFiles/index'
import './styles.scss'

export const Dashboard = () => {
  const columns = [
    "Name",
    "Type",
    "Number",
    "Keeper One",
    "Keeper Second",
    "Borrow Date",
    "Date Received",
    "Product Code",
    "Transfer Method",
    "Code"
  ]

  const [data, setData] = useState([]) 
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadMessage, setUploadMessage] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleCellChange = (e, rowIndex, col) => {
    const updatedData = [...data]
    updatedData[rowIndex][col] = e.target.value
    setData(updatedData)
  }

  const handleDeleteRow = (rowIndex) => {
    const updatedData = data.filter((_, index) => index !== rowIndex)
    setData(updatedData)
  }

  const handleAddRow = () => {
    const newRow = columns.reduce((acc, col) => {
      acc[col] = ''
      return acc
    }, {})

    setData([...data, newRow])
  }

  const handleSave = async () => {
    const userId = "66bb296855be1031160ead63"
    const fileName = uploadedFiles.length > 0 ? uploadedFiles[0].fileName : "device_inventory.csv"
    const createdAt = new Date().toISOString()

    const csvData = data.map((row, index) => ({
      no: index + 1,
      name: row["Name"],
      type: row["Type"],
      number: row["Number"],
      keeperOne: row["Keeper One"],
      keeperSecond: row["Keeper Second"],
      borrowDate: row["Borrow Date"],
      dateReceived: row["Date Received"],
      productCode: row["Product Code"],
      transferMethod: row["Transfer Method"],
      code: row["Code"],
    }))

    const payload = {
      message: "File uploaded successfully",
      userId,
      fileName,
      csvData,
      createdAt
    }

    try {
      const response = await axios.post('https://your-backend-api.com/save', payload)
      if (response.status === 200) {
        setSaveMessage('Data saved successfully!')
        setShowModal(true)
      } else {
        setSaveMessage('Failed to save data')
      }
    } catch (error) {
      console.error('Error during save operation:', error)
      setSaveMessage('Save failed!')
    }
  }

  return (
    <div className="dashboard-container">
      <h2>New Inventory Tool</h2>

      <UploadFiles
        setUploadedFiles={setUploadedFiles}
        setUploadMessage={setUploadMessage}
      />

      <div className="uploaded-files-list">
        {uploadedFiles.length > 0 && (
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.id}>
                {file.fileName} (Uploaded on: {new Date(file.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </div>

      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}

      <table className="data-table">
        <thead>
          <tr>
            <th>No</th>
            {columns.map((col, index) => (
              <th className="column-name" key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}</td>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[col] || ''}
                    onChange={(e) => handleCellChange(e, rowIndex, col)}
                    className="table-input"
                  />
                </td>
              ))}
              <td>
                <button
                  onClick={() => handleDeleteRow(rowIndex)}
                  className="delete-row-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddRow} className="add-row-button">Add New Row</button>

      <button onClick={handleSave} className="save-button">Submit</button>
      {saveMessage && <p className="save-message">{saveMessage}</p>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times</span>
            <p>{saveMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
