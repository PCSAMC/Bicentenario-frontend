import { useState } from 'react'
import { PasswordDataEnviar } from '../types/ContrasenaRecuperarData.type'
import { RecoveryPassword } from '../services/contrasenaRecuperarService'

export const usePassword = () => {
  const [codigoAuth, setCodigoAuth] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ahora devuelve el código para usar inmediatamente
  const handlePassword = async (credentials: PasswordDataEnviar): Promise<{ success: boolean; code?: string }> => {
    try {
      setLoading(true)
      setError(null)
      const response = await RecoveryPassword(credentials)
      if (response.code === 200) {
        setCodigoAuth(response.codeAuth)
        return { success: true, code: response.codeAuth }
      } else {
        setError(response.message || 'Error desconocido')
        return { success: false }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  return { codigoAuth, loading, error, handlePassword }
}
