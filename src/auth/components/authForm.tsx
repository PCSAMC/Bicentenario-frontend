import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { loginCredentials } from '../types/credentialsData.types'
import { registerData } from '../types/registerData.types'
import { useLogin } from '../hooks/useLogin'
import { useRegister } from '../hooks/useRegister'

interface Props {
  initialMode?: 'login' | 'register'
}

function AuthForm({ initialMode = 'login' }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { handleLogin, loading: loginLoading, error: loginError } = useLogin()
  const { handleRegister, error: registerError } = useRegister()

  const error = mode === 'login' ? loginError : registerError

  const handleSubmit = () => {
    if (mode === 'login') {
      const credentials: loginCredentials = { email, password }
      handleLogin(credentials)
    } else {
      const data: registerData = { name, email, password, age: Number(age) }
      handleRegister(data)
    }
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
   
    setEmail('')
    setPassword('')
    if (mode === 'register') {
      setName('')
    }
  }

  const boliviaColors = {
    red: '#D52B1E',    
    yellow: '#F9E300',  
    green: '#007934'    
  }

  return (
    <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl w-full max-w-4xl bg-white">
      <div className="relative md:w-1/2 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `url('/assets/salar.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}></div>

        {/* Capa roja translúcida por encima de la imagen */}
        <div className="absolute inset-0 bg-red-700 opacity-50 mix-blend-multiply"></div>

        {/* Gradiente superior (opcional, si quieres mantenerlo) */}
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(135deg, ${boliviaColors.red}CC, ${boliviaColors.green}99)`,
          mixBlendMode: 'multiply'
        }}></div>

        {/* Contenido */}
        <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
          <div className="w-full flex items-center">
            <div className="text-white font-bold text-x">
              <span className="text-red-500 hover:animate-pulse">B</span>
              <span className="text-yellow-400 hover:animate-pulse">i</span>
              <span className="text-green-500 hover:animate-pulse">c</span>
              <span className="text-white hover:text-yellow-400 transition-colors duration-300">entenario</span>
            </div>
          </div>

          <div className="text-center py-8">
            <h2 className="text-4xl font-light mb-2">
              <span className="font-bold">Bicentenario</span>
            </h2>
            <h3 className="text-2xl font-light mb-6">
              de <span className="font-bold">Bolivia</span>
            </h3>
            <div className="flex justify-center space-x-1 my-4">
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: boliviaColors.red }}></div>
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: boliviaColors.yellow }}></div>
              <div className="w-8 h-1 rounded-full" style={{ backgroundColor: boliviaColors.green }}></div>
            </div>
            <p className="text-white text-opacity-90 max-w-xs mx-auto">
              Celebrando 200 años de independencia, libertad y soberanía
            </p>
          </div>

          <div>
            <p className="text-sm text-white text-opacity-90 text-center italic">
              "La patria no es solo el suelo en que nacimos, es el legado de quienes soñaron con nuestra libertad"
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white text-gray-800 p-8 md:w-1/2">
        <div className="relative flex items-center justify-center mb-8 bg-gray-100 rounded-full p-1 w-full max-w-xs mx-auto">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-1/2 z-10 relative ${
              mode === 'login' ? 'text-white' : 'text-gray-600'
            }`}
            onClick={() => setMode('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 w-1/2 z-10 relative ${
              mode === 'register' ? 'text-white' : 'text-gray-600'
            }`}
            onClick={() => setMode('register')}
          >
            Registrarse
          </button>
        
          <div 
            className="absolute top-1 bottom-1 w-1/2 rounded-full transition-all duration-300 shadow-md"
            style={{ 
              left: mode === 'login' ? '4px' : '50%',
              backgroundColor: boliviaColors.red
            }}
          ></div>
        </div>
        
        <h3 className="text-2xl font-medium text-gray-800 mb-6">
          {mode === 'login' ? 'Bienvenido de vuelta' : 'Únete a la celebración'}
        </h3>
        
        {mode === 'register' && (
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 mb-2">NOMBRE COMPLETO</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
            />
          </div>
        )}

{mode === 'register' && (
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 mb-2">NOMBRE COMPLETO</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Ingresa tu edad "
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
            />
          </div>
        )}
        
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-500 mb-2">E-MAIL</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
          />
        </div>
        
        <div className="mb-6 relative">
          <label className="block text-xs font-medium text-gray-500 mb-2">CONTRASEÑA</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
            className="w-full p-3 pr-10 bg-gray-50 rounded-lg border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-[38px] text-gray-500 hover:text-red-400"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        </div>
        
        {/* Recordarme con estilo boliviano */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div 
              className="w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300"
              style={{ backgroundColor: rememberMe ? boliviaColors.red : '#CBD5E0' }}
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div 
                className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 top-0.5 ${rememberMe ? 'left-5' : 'left-1'}`}
              ></div>
            </div>
            <span className="ml-2 text-sm text-gray-600">Recordarme</span>
          </div>
          
          {mode === 'login' && (
            <a href="#" className="text-sm hover:text-red-700 transition-colors duration-300" style={{ color: boliviaColors.red }}>
              ¿Olvidaste tu contraseña?
            </a>
          )}
        </div>
        
        {mode === 'register' && (
          <div className="flex items-center mb-6">
            <input 
              type="checkbox" 
              className="w-4 h-4 border-2 border-gray-300 rounded focus:ring-red-500 text-red-600"
              style={{ accentColor: boliviaColors.red }}
            />
            <span className="ml-2 text-sm text-gray-600">
              Al registrarte aceptas los <a href="#" className="hover:text-red-700 transition-colors duration-300" style={{ color: boliviaColors.red }}>Términos y Condiciones</a>
            </span>
          </div>
        )}

        
        
        {error && <p className="text-sm mb-4" style={{ color: boliviaColors.red }}>{error}</p>}
        <button
          onClick={handleSubmit}
          className="w-full text-white font-medium py-3 px-4 rounded-lg 
              shadow-md hover:shadow-lg transition-all duration-300 
              bg-red-700 hover:bg-amber-400"
        >
          {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' 
            ? (<>¿No tienes cuenta? <button onClick={toggleMode} className="font-medium hover:text-red-700 transition-colors duration-300" style={{ color: boliviaColors.red }}>Regístrate</button></>)
            : (<>¿Ya tienes cuenta? <button onClick={toggleMode} className="font-medium hover:text-red-700 transition-colors duration-300" style={{ color: boliviaColors.red }}>Inicia sesión</button></>)
          }
        </p>
      </div>
    </div>
  )
}

export default AuthForm