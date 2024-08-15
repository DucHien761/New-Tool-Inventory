import axios from 'axios'

const API_BASE_URL = 'http://localhost:8081/api/user/saveFile'

export const AddFile = async (file, userId) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(`${API_BASE_URL}?userId=${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    

    return response.data
  } catch (error) {

    console.error('Error uploading file:', error.response || error.message)
    throw new Error('Failed to upload file: ' + (error.response?.data?.message || error.message))
  }
}
