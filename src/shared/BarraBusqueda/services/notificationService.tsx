import { Notification } from '../types/barra.types';

// Datos de ejemplo para simular una API
const mockNotifications: Notification[] = [
  {
    id: 1,
    text: 'Nuevo evento cultural en La Paz por el Bicentenario',
    time: 'Hace 1 hora',
    read: false
  },
  {
    id: 2,
    text: 'Actualización de contenido histórico sobre Simón Bolívar',
    time: 'Hace 3 horas',
    read: false
  },
  {
    id: 3,
    text: 'Nuevo tour virtual del Museo Casa de la Libertad disponible',
    time: 'Hace 1 día',
    read: false
  }
];

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications;
  },
  
  markAsRead: async (id: number): Promise<void> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // En un entorno real, esto haría una llamada a una API
    const index = mockNotifications.findIndex(n => n.id === id);
    if (index !== -1) {
      mockNotifications[index].read = true;
    }
  },
  
  markAllAsRead: async (): Promise<void> => {
    // Simular retardo de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // En un entorno real, esto haría una llamada a una API
    mockNotifications.forEach(n => n.read = true);
  }
};
