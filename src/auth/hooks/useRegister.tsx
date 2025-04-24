// 📁 /auth/hooks/useRegister.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerData } from '../types/registerData.types';
import { AuthService } from '../services/authServices';
import { useAuth } from '../../shared/context/authContext';
import { register } from 'module';

export const useRegister = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleRegister = async (data: registerData) => {
    try {
      setError('');
      
      const registerResponse = await AuthService.register(data);
      console.log('Registro exitoso:', registerResponse.message, registerResponse.code);
      if (registerResponse.code==201){
      await login({ email: data.email, password: data.password });
      navigate('/home');
      }else {
        alert(`Code: ${registerResponse.code}, Message: ${registerResponse.message}`);
      }

    } catch (err : any) {
      alert( err.response.data.message);
    }
  };

  return { handleRegister, error };
};
