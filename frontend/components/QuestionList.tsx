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
            <div className="text-center py-8 rounded-xl border border-border bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
                <p className="text-gray-400 text-sm tracking-wide">
                    No questions yet
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-4 tracking-wide border-b border-border pb-2">
                Questions
            </h2>

            <div className="flex flex-col gap-5">
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