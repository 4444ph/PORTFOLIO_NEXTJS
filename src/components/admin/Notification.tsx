import { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = 
    type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' :
    type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' :
    'bg-blue-500/10 border-blue-500/50 text-blue-400';

  return (
    <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg border ${bgColor} shadow-lg flex items-center gap-3 animate-slide-in`}>
      <span className="font-medium text-sm">{message}</span>
      <button 
        onClick={onClose}
        className="text-current opacity-70 hover:opacity-100"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
}
