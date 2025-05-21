import { User } from '../types/barra.types';

// Datos de ejemplo para simular una API
const mockUser: User = {
  id: 'user-1',
  name: 'Juan Pérez',
  avatar: '/images/avatar.jpg',
  role: 'visitor'
};

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },
  
  updateUserPreferences: async (preferences: any): Promise<void> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // En un entorno real, esto haría una llamada a una API
    console.log('Updating user preferences:', preferences);
  }
};