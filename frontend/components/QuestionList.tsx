import QuestionItem from './QuestionItem';
import type { Question } from './QuizForm';

interface Props {
    questions: Question[];
    onRemove: (id: number) => void;
    onUpdate: (id: number, key: keyof Question, value: any) => void;
}

export default function QuestionList({ questions, onRemove, onUpdate }: Props) {
    if (questions.length === 0) {
        return (
            <p className="text-gray-500 text-center mt-4">
                No questions yet. Add one below 👇
            </p>
        );
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Questions
            </h2>

            <div className="space-y-4">
                {questions.map((q) => (
                    <QuestionItem
                        key={q.id}
                        question={q}
                        onRemove={onRemove}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        </div>
    );
}