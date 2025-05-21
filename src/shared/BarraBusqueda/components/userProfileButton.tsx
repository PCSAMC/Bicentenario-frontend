import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types/barra.types';

interface UserProfileButtonProps {
  user?: UserType;
  onClick: () => void;
}

export const UserProfileButton: React.FC<UserProfileButtonProps> = ({ user, onClick }) => {
  return (
    <button 
      className="flex items-center space-x-1 p-1 rounded-full bg-gray-100"
      onClick={onClick}
      aria-label="Perfil de usuario"
    >
      <div className="rounded-full bg-blue-500 text-white p-1">
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-5 h-5 rounded-full" 
          />
        ) : (
          <User size={18} />
        )}
      </div>
      <ChevronDown size={16} className="text-gray-500 hidden md:block" />
    </button>
  );
};