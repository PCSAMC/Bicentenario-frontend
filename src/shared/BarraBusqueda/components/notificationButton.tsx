// components/Notifications/NotificationButton.tsx
import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  count: number;
  onClick: () => void;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ count, onClick }) => {
  return (
    <button 
      className="p-2 rounded-full bg-gray-100 text-gray-700 relative"
      onClick={onClick}
      aria-label="Notificaciones"
    >
      <Bell size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
};