import { QuizSummary } from '@/services/quizzes';
import QuizItem from './QuizItem';

interface QuizListProps {
    quizzes: QuizSummary[];
    onDelete: (id: number) => void;
}

export default function QuizList({ quizzes, onDelete }: QuizListProps) {
    if (quizzes.length === 0)
        return (
            <p className="text-gray-400 text-center py-10">
                No quizzes yet. <span className="text-accent">Create your first one!</span>
            </p>
        );

    return (
        <div className="grid gap-5">
            {quizzes.map((quiz) => (
                <div
                    key={quiz.id}
                    className="glass border border-border rounded-2xl p-[1px] transition-all duration-300 hover:border-accentHover hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                >
                    <QuizItem quiz={quiz} onDelete={onDelete} />
                </div>
            ))}
        </div>
    );
}