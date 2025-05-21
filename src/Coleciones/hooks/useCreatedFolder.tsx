import { useState } from 'react'
import { CreateFolderResponse , CreateFolderDataEnviar} from '../types/foldersData.types'
import {createdFolder} from '../service/createdFolderService'
export const useCreatedFolder = () => {
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const CreatedFolder = async (data: CreateFolderDataEnviar) => {
    try {
      setLoading(true)
      setError('')
      const Response = await createdFolder(data) as CreateFolderResponse
      console.log('create response folder data:', Response)
      
      if (Response.code === 200) {
        console.log(Response.message)
        // Si la respuesta tiene una propiedad data, usamos esa, de lo contrario usamos toda la respuesta
      } else {
        setError(`Error: ${Response.message || 'Error desconocido'}`)
      }
    } catch (err) {
    
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  return { CreatedFolder, loading, error }
}