
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../shared/context/authContext'

interface Props {
  children: ReactNode
  role?: 'admin' | 'moderador' | 'registrado'
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, isLoading } = useAuth()

  if (isLoading) return <p className="p-4 text-center">Cargando...</p>
  if (!user) return <Navigate to="/login" />
  if (role && user.role !== role) return <Navigate to="/unauthorized" />

  return <>{children}</>
}