import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Alert({ 
  message = "Ceci est un message d'alerte",
  type = "success", 
  duration = 3000, 
  onClose = () => {} 
}) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      onClose();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div className={`
      fixed z-50 top-4 right-4 max-w-md flex items-center p-4 rounded-lg shadow-lg
      transform transition-all duration-300 ease-in-out
      ${closing ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      ${type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : 'bg-red-50 text-red-800 border-l-4 border-red-500'}
    `}>
      <div className="flex-shrink-0">
        {type === 'success' ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
      </div>
      
      <div className="ml-3">
        <p className="text-base font-medium">
          {message}
        </p>
      </div>
      
      <div className="ml-auto pl-3">
        <button
          onClick={handleClose}
          className={`
            inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${type === 'success' ? 'text-green-500 hover:bg-green-100 focus:ring-green-400' : 'text-red-500 hover:bg-red-100 focus:ring-red-400'}
          `}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}