import Link from 'next/link';
import { QuizSummary } from '@/services/quizzes';
import { Trash2 } from 'lucide-react';

interface QuizItemProps {
    quiz: QuizSummary;
    onDelete: (id: number) => void;
}

export default function QuizItem({ quiz, onDelete }: QuizItemProps) {
    return (
        <div className="group flex justify-between items-center border border-gray-200 bg-white shadow-sm rounded-xl p-5 hover:shadow-md transition-all duration-200">
            <div>
                <Link
                    href={`/quizzes/${quiz.id}`}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                >
                    {quiz.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                    {quiz.questionsCount} {quiz.questionsCount === 1 ? 'question' : 'questions'}
                </p>
            </div>

            <button
                onClick={() => onDelete(quiz.id)}
                className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition"
                title="Delete quiz"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    );
}
