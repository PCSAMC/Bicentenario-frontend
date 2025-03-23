import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Login:', data);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">Iniciar sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          {...register('password', { required: true })}
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-500 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
