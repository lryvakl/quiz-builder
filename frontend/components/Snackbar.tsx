import { useEffect } from 'react';

interface SnackbarProps {
    message: string;
    type?: 'success' | 'error';
    onClose: () => void;
}

export default function Snackbar({ message, type = 'success', onClose }: SnackbarProps) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000); 
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-transform transform 
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} animate-slide-up`}
        >
            {message}
        </div>
    );
}