import axios from 'axios'

const API_BASE_URL = 'https://1223-14-161-33-35.ngrok-free.app/api/user/uploadFile'

export const AddFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(API_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error('Failed to upload file')
  }
}
