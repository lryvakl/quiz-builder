import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllQuizzes, deleteQuiz, QuizSummary } from '@/services/quizzes';
import { ListChecks, Plus } from 'lucide-react';
import Snackbar from '@/components/Snackbar';
import QuizList from '@/components/QuizList';

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
            setSnackbar({ message: 'Quiz deleted successfully', type: 'success' });
        } catch (err) {
            console.error(err);
            setSnackbar({ message: 'Failed to delete quiz', type: 'error' });
        }
    };

    if (loading)
        return <p className="text-center text-gray-400 mt-10">Loading...</p>;

    return (
        <>
            <main className="max-w-3xl mx-auto p-6 bg-bg min-h-screen text-text">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-semibold flex items-center gap-3 text-text">
                        <ListChecks className="w-7 h-7 text-accent" />
                        All Quizzes
                    </h1>

                    <Link
                        href="/create"
                        className="inline-flex items-center gap-2 text-accent hover:text-accentHover font-medium transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create Quiz
                    </Link>
                </div>

                {/* Quiz List */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                    <QuizList quizzes={quizzes} onDelete={handleDelete} />
                </div>
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