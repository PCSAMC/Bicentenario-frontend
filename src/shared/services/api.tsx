// 📁 /shared/services/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.API_URL, // cambia esto a la URL de tu backend
  withCredentials: true,                // útil si usas cookies/sesiones
})

export default api
