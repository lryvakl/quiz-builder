import { QuizSummary } from '@/services/quizzes';
import QuizItem from './QuizItem';

interface QuizListProps {
    quizzes: QuizSummary[];
    onDelete: (id: number) => void;
}

export default function QuizList({ quizzes, onDelete }: QuizListProps) {
    if (quizzes.length === 0)
        return <p className="text-gray-500">No quizzes yet. Create your first one!</p>;

    return (
        <div className="grid gap-4">
            {quizzes.map(quiz => (
                <QuizItem key={quiz.id} quiz={quiz} onDelete={onDelete} />
            ))}
        </div>
    );
}
