import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginCredentials } from '../types/credentialsData.types'
import { useAuth } from '../../shared/context/authContext'
import { AuthService } from '../services/authServices'



export const useLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (credentials: loginCredentials) => {
    try {
      setLoading(true)
      setError('')
      const loginResponse = await AuthService.login(credentials) as LoginResponse
      console.log('Login response:', loginResponse)
      
      if (loginResponse.code === 200) {
        console.log('Login exitoso:', loginResponse.message, loginResponse.code)
        // Si la respuesta tiene una propiedad data, usamos esa, de lo contrario usamos toda la respuesta
        if (loginResponse.data) {
          console.log('Login response data:', loginResponse.data) 
          login(loginResponse.data)
        } else {
          // Si no hay data, pasamos la respuesta sin el código y el mensaje
          const { code, message, ...userData } = loginResponse
          login(userData)
        }
        navigate('/home')
      } else {
        setError(`Error: ${loginResponse.message || 'Error desconocido'}`)
      }
    } catch (err) {
      setError('Credenciales incorrectas')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  return { handleLogin, loading, error }
}