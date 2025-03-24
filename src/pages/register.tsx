import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Registro tradicional:', data);
    navigate('/');
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    console.log('Google Token:', token);

    // Puedes enviar este token a tu backend
    const res = await axios.post('http://localhost:3001/api/auth/google', { token });
    console.log('Usuario Google:', res.data);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50">
      <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-500">Crear cuenta</h2>

        {/* Formulario tradicional */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: true })}
            placeholder="Nombre completo"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            {...register('email', { required: true })}
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            {...register('password', { required: true })}
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            Registrarse
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-4">
          <hr className="border w-full" />
          <span className="px-3 text-gray-400">o</span>
          <hr className="border w-full" />
        </div>

        {/* Botones sociales */}
        <div className="space-y-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log('Error al iniciar con Google')}
          />
          <button
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <FaFacebook />
            Registrarse con Facebook
          </button>
          <button
            className="w-full flex items-center justify-center gap-3 bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition"
          >
            <FaTwitter />
            Registrarse con Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
