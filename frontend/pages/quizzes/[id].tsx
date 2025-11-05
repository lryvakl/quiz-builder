import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuizById, QuizDetails } from '@/services/quizzes';
import DetailQuizItem from '@/components/DetailQuizItem';
import { HelpCircle, Loader2 } from 'lucide-react';
import BackButton from '@/components/BackButton';

export default function QuizDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const loadQuiz = async () => {
            try {
                const data = await getQuizById(Number(id));
                setQuiz(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load quiz');
            } finally {
                setLoading(false);
            }
        };
        loadQuiz();
    }, [id]);

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
                <Loader2 className="w-8 h-8 animate-spin mb-3" />
                Loading quiz...
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-red-400">
                {error}
            </div>
        );

    if (!quiz)
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-400">
                Quiz not found.
            </div>
        );

    return (
        <main className="relative min-h-screen px-6 py-16 flex flex-col items-center text-gray-200">
            <BackButton />

            <header className="mb-10 text-center animate-slide-up">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <HelpCircle className="w-7 h-7 text-accent" />
                    <h1 className="text-3xl font-bold text-gray-100 tracking-wide">{quiz.title}</h1>
                </div>
                <p className="text-gray-400">
                    {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
                </p>
            </header>

            <section className="w-full max-w-2xl space-y-6 animate-slide-up">
                {quiz.questions.map((q, i) => (
                    <DetailQuizItem key={i} question={q} />
                ))}
            </section>
        </main>
    );
}