import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8800', // Replace this with your actual backend URL
})

export default api
