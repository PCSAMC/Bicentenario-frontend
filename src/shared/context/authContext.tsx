import { createContext, useContext, useEffect, useState } from 'react'
import { AuthUser } from '../../auth/types/authUserData.type'

interface AuthContextType {
  user: AuthUser | null
  // Cambiamos el tipo a AuthUser para que coincida con lo que esperamos
  login: (userData: AuthUser) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (userData: AuthUser) => {
    // Guardar los datos del usuario en el estado y en localStorage
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Verificar si se guardó correctamente en el localStorage
    const storedUser = localStorage.getItem('user');
    console.log('Usuario autenticado:', userData);
    console.log('Usuario guardado en localStorage:', storedUser); // Muestra lo que está guardado en el localStorage
  
    // Opción: Si quieres asegurarte de que es el mismo objeto
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    console.log('Usuario deserializado desde localStorage:', parsedUser);
  };
  
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)