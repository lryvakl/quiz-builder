import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllQuizzes, deleteQuiz, QuizSummary } from '@/services/quizzes';
import { Trash2 } from 'lucide-react';
import Snackbar from '@/components/Snackbar';

export default function QuizzesPage() {
    const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
        null
    );

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAllQuizzes();
                setQuizzes(data);
            } catch (err) {
                console.error(err);
                setSnackbar({ message: 'Failed to load quizzes', type: 'error' });
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteQuiz(id);
            setQuizzes((prev) => prev.filter((q) => q.id !== id));
            setSnackbar({ message: '🗑️ Quiz deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setSnackbar({ message: 'Failed to delete quiz', type: 'error' });
        }
    };

    if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

    return (
        <>
            <main className="max-w-3xl mx-auto p-6">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold flex items-center gap-2">📘 All Quizzes</h1>
                    <Link
                        href="/create"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                    >
                        <span className="text-lg">＋</span> Create Quiz
                    </Link>
                </div>

                {quizzes.length === 0 ? (
                    <p className="text-gray-500">No quizzes yet. Create your first one!</p>
                ) : (
                    <div className="grid gap-4">
                        {quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="group flex justify-between items-center border border-gray-200 bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition-all duration-200"
                            >
                                <div>
                                    <Link
                                        href={`/quizzes/${quiz.id}`}
                                        className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                                    >
                                        {quiz.title}
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {quiz.questionsCount}{' '}
                                        {quiz.questionsCount === 1 ? 'question' : 'questions'}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleDelete(quiz.id)}
                                    className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                                    title="Delete quiz"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {snackbar && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar(null)}
                />
            )}
        </>
    );
}