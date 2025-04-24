// 📁 /hooks/useGuestLogin.ts
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { AuthUser } from '../../../auth/types/authUserData.type' 

const guestUser: AuthUser = {
  id: 'guest',
  name: 'Invitado',
  email: 'invitado@demo.com',
  role: 'invitado',
  token: 'guest-token'
}

export const useGuestLogin = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const continuarComoInvitado = async () => {
    localStorage.setItem('user', JSON.stringify(guestUser))
    await login({ email: guestUser.email, password: 'guest' })
    navigate('/home')
  }

  return { continuarComoInvitado }
}
