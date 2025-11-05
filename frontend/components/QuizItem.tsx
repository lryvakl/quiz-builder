import Link from 'next/link';
import { QuizSummary } from '@/services/quizzes';
import { Trash2, ArrowRight } from 'lucide-react';

interface QuizItemProps {
    quiz: QuizSummary;
    onDelete: (id: number) => void;
}

export default function QuizItem({ quiz, onDelete }: QuizItemProps) {
    return (
        <div className="flex justify-between items-center bg-card border border-border rounded-2xl p-5 text-text transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            {/* Info */}
            <div>
                <h2 className="text-lg font-semibold text-text tracking-wide">
                    {quiz.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                    {quiz.questionsCount}{' '}
                    {quiz.questionsCount === 1 ? 'question' : 'questions'}
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Link
                    href={`/quizzes/${quiz.id}`}
                    className="p-2 rounded-lg hover:bg-accent/10 text-accent hover:text-accentHover transition"
                    title="View details"
                >
                    <ArrowRight className="w-6 h-6" />
                </Link>

                <button
                    onClick={() => onDelete(quiz.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition"
                    title="Delete quiz"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}