import { useState } from 'react'
import { RestorePasswordEnviar} from '../types/ContrasenaRecuperarData.type'
import { RestorePassword } from '../services/RestorePassword'
import { useNavigate } from 'react-router-dom'

export const useRestore = () => {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
  // Ahora devuelve el código para usar inmediatamente
  const handleRestore = async (data: RestorePasswordEnviar) => {
    try {
      setLoading(true)
      setError(null)
      const response = await RestorePassword(data)
      if (response.code === 200) {
        navigate('/login')
        console.log(response.message);

      } else {
        setError(response.message || 'Error desconocido')
       
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
  
    } finally {
      setLoading(false)
    }
  }

  return {loading, error, handleRestore }
}
