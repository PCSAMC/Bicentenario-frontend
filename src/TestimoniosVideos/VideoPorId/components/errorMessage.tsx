// components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;  // Recibimos el mensaje de error
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;
