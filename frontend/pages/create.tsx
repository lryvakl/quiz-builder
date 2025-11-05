import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import QuizForm from '@/components/QuizForm';

export default function CreatePage() {
    const router = useRouter();

    return (
        <div className="relative min-h-screen bg-gray-50">
            <button
                onClick={() => router.push('/quizzes')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all px-3 py-2"
                title="Back to quizzes"
            >
                <ArrowLeft className="w-10 h-10" />
            </button>

            <main className="max-w-2xl mx-auto mt-20 px-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
                    <span className="text-blue-600">➕</span> Create a New Quiz
                </h1>

                <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                    <QuizForm />
                </div>
            </main>
        </div>
    );
}