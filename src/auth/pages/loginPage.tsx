// 📁 /auth/pages/LoginPage.tsx
import { useEffect, useState } from 'react'
import AuthForm from '../components/authForm'
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const { handleLogin, loading, error } = useLogin()
  

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
    

      <div className="w-full max-w-4xl z-10">
        <AuthForm 
          mode="login"
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  )
}
