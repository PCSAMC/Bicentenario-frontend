import { useRegister } from '../hooks/useRegister'
import AuthForm from '../components/authForm'

export default function RegisterPage() {
  const { handleRegister, error } = useRegister()


  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
     

      <div className="w-full max-w-4xl z-10">
        <AuthForm 
          mode="register"
          onSubmit={handleRegister}
         
          error={error}
        />
      </div>
    </div>
  )
}
