import React from 'react';
import { Notification } from '../types/barra.types';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onViewAll: () => void;
}

export const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ 
  notifications, 
  onMarkAsRead, 
  onViewAll 
}) => {
  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 z-10">
      <h3 className="font-bold text-gray-700 mb-2 px-2">Notificaciones</h3>
      <div className="max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">No hay notificaciones</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`p-2 hover:bg-gray-100 rounded-lg cursor-pointer ${
                notification.read ? 'opacity-70' : 'font-medium'
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <p className="text-sm">{notification.text}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200">
        <button 
          className="text-blue-500 text-sm font-medium w-full text-center"
          onClick={onViewAll}
        >
          Ver todas
        </button>
      </div>
    </div>
  );
};