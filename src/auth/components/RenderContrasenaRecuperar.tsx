import React, { useState } from 'react'
import { usePassword } from '../hooks/useContrasenaRecuperar'
import{useRestore} from '../hooks/useChangePassword'
export const PasswordRecoveryWizard = () => {
  const { codigoAuth, loading, error, handlePassword } = usePassword()
const {  handleRestore } = useRestore()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [inputCode, setInputCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [success, setSuccess] = useState(false)

  const onSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, code } = await handlePassword({ email })
    if (success && code) {
      setStep(2)
      setCodigoLocal(code) // Guardamos el código local para comparar sin depender del estado del hook
    }
  }
  
  // Crea un estado local para el código a comparar
  const [codigoLocal, setCodigoLocal] = useState('')
  console.log('Código local:', codigoLocal)
  // Validar código ingresado con el recibido
  const onSubmitCode = (e: React.FormEvent) => {
    e.preventDefault()
    const inputNum = Number(inputCode.trim())
    const codeNum = Number(codigoLocal)
  
    if (!isNaN(inputNum) && inputNum === codeNum) {
      setStep(3)
      setError(null)
      
    } else {
      setError('Código incorrecto, inténtalo de nuevo.')
    }
  }
  

const onSubmitNewPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    const data = {
      email,
      password: newPassword,
    }
    await handleRestore(data)
}

  // Para mostrar error local (no confundir con hook error)
  const [localError, setError] = useState<string | null>(null)

  // Para limpiar error al cambiar input
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value)
    if (localError) setError(null)
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-8 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Recuperación de Contraseña
      </h2>

      {error && (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      )}
      {localError && (
        <p className="text-red-600 font-semibold text-center">{localError}</p>
      )}

      {/* Step 1: Email input */}
      {step === 1 && (
        <form onSubmit={onSubmitEmail} className="space-y-4">
          <label className="block text-gray-700 font-medium">Correo Electrónico</label>
          <input
            type="email"
            placeholder="tuemail@gmail.com"
            value={email}
            onChange={handleInputChange(setEmail)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? 'Enviando...' : 'Enviar código de recuperación'}
          </button>
        </form>
      )}

      {/* Step 2: Código */}
      {step === 2 && (
        <form onSubmit={onSubmitCode} className="space-y-4">
          <label className="block text-gray-700 font-medium">Ingrese el código recibido</label>
          <input
  type="number"
  placeholder="Código"
  value={inputCode}
  onChange={handleInputChange(setInputCode)}
  required
  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Validar código
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
          >
            Volver
          </button>
        </form>
      )}

      {/* Step 3: Cambiar contraseña */}
      {step === 3 && !success && (
        <form onSubmit={onSubmitNewPassword} className="space-y-4">
          <label className="block text-gray-700 font-medium">Correo Electrónico</label>
          <input
            type="email"
            value={email}
            readOnly
            className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
          />
          <label className="block text-gray-700 font-medium mt-4">Nueva Contraseña</label>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={handleInputChange(setNewPassword)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <label className="block text-gray-700 font-medium">Confirmar Contraseña</label>
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={handleInputChange(setConfirmPassword)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Cambiar contraseña
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className="w-full py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
          >
            Volver
          </button>
        </form>
      )}

      {/* Paso final: Éxito */}
      {success && (
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-2xl font-bold text-green-600">Contraseña cambiada con éxito</h3>
          <p className="text-gray-700 text-center">Ya puedes iniciar sesión con tu nueva contraseña.</p>
        </div>
      )}
    </div>
  )
}
