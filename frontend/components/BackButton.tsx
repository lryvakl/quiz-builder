import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    href?: string;
    title?: string;
}

export default function BackButton({ href = '/quizzes', title = 'Back to quizzes' }: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="fixed top-6 left-6 z-50 flex items-center gap-2
                 text-gray-400 hover:text-accent
                 transition-all duration-300
                 p-2 rounded-full hover:bg-white/5
                 focus:outline-none focus:ring-2 focus:ring-accent/40"
            title={title}
        >
            <ArrowLeft className="w-8 h-8" />
        </button>
    );
}