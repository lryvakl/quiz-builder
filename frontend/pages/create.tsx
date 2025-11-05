import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import QuizForm from '@/components/QuizForm';
import Snackbar from '@/components/Snackbar';

export default function CreatePage() {
    const router = useRouter();
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
        null
    );

    return (
        <div className="relative min-h-screen">
            <button
                onClick={() => router.push('/quizzes')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gray-400 hover:text-accent transition-all duration-300 p-2 rounded-full hover:bg-white/5"
                title="Back to quizzes"
            >
                <ArrowLeft className="w-8 h-8" />
            </button>

            <main className="max-w-2xl mx-auto mt-20 px-6">
                <h1 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
                    Create a New Quiz
                </h1>

                <div className="glass border border-border rounded-2xl p-8 shadow-md">
                    <QuizForm onShowSnackbar={(msg, type) => setSnackbar({ message: msg, type })} />
                </div>
            </main>

            {snackbar && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar(null)}
                />
            )}
        </div>
    );
}