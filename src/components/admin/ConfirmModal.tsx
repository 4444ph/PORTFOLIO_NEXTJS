interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      
      {/* Modal */}
      <div className="relative bg-slate-900 border border-slate-700 rounded-xl max-w-md w-full p-6 shadow-2xl animate-scale-in">
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <span className="material-symbols-outlined text-3xl">warning</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-slate-300 mb-8 leading-relaxed">
          {message}
        </p>
        
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20 transition font-medium flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
