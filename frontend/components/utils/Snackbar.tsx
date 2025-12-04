import { useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface SnackbarProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export default function Snackbar({ message, type, onClose }: SnackbarProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 
      rounded-xl backdrop-blur-md shadow-lg border transition-all duration-300 
      animate-slide-up 
      ${
                type === 'success'
                    ? 'border-green-400/40 bg-green-500/10 text-green-200 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
                    : 'border-red-400/40 bg-red-500/10 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
            }`}
        >
            {type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
            ) : (
                <AlertCircle className="w-5 h-5 text-red-400" />
            )}

            <span className="font-medium tracking-wide">{message}</span>

            <button
                onClick={onClose}
                className="ml-2 text-gray-400 hover:text-gray-100 transition"
                title="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}