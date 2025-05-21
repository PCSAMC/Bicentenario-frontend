import { useState, useEffect } from 'react'
import { GetFolderEnviar, GetFolderResponse, folderSaved } from '../types/foldersData.types'
import { GetFolderUser } from '../service/GetFolders'

export const useGetFolderUser = (idUser: number | null) => {
  const [folders, setFolder] = useState<folderSaved[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!idUser) return; // Si no hay idUser, no hace nada

    const getFolders = async () => {
      try {
        setLoading(true)
        setError('')
        const data: GetFolderEnviar = { idUser }
        const Response = await GetFolderUser(data) as GetFolderResponse
        console.log('get response folder data:', Response)
        
        if (Response.code === 200) {
          const foldersArray = Array.isArray(Response.folders) ? Response.folders : [Response.folders];
          setFolder(foldersArray)
          console.log(Response.message)
        } else {
          setError(`Error: ${Response.message || 'Error desconocido'}`)
        }
      } catch (err) {
        console.log(err)
        setError('Error inesperado al obtener carpetas')
      } finally {
        setLoading(false)
      }
    }

    getFolders()
  }, [idUser])

  return { folders, loading, error }
}
