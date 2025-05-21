import { useState, useCallback } from 'react'
import {UserData} from '../types/PerfilData.types'
import { GetUserIdService } from '../service/GetUserIdService'

export const useUserId = () => {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getUserById = useCallback(async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      const res = await GetUserIdService({ id })
      if (res && res.code === 200) {
        setUser(res.user)
      } else {
        throw new Error(res?.message || 'Respuesta inválida del servidor')
      }
    } catch (e: any) {
      setError(e.message || 'Error al obtener usuario')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return { user, loading, error, getUserById }
}
