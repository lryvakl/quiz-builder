import { QuestionPayload } from '@/services/quizzes';


interface Props {
    question: QuestionPayload;
}

export default function DetailQuizItem({ question }: Props) {
    return (
        <div className="relative flex flex-col items-center justify-start px-6 text-gray-200">
            <div
                className="glass border border-border rounded-2xl p-6 mt-6 shadow-md
                   transition-all duration-300 hover:shadow-lg hover:border-accent/40
                   w-full max-w-2xl"
            >
                <h2 className="font-semibold text-2xl text-gray-100 mb-6 tracking-wide">
                    {question.text}
                </h2>

                {question.type === 'BOOLEAN' && (
                    <div className="flex gap-6 text-gray-400">
                        <label className="flex items-center gap-2 hover:text-gray-200 transition">
                            <input type="radio" disabled className="accent-accent bg-transparent" />
                            True
                        </label>
                        <label className="flex items-center gap-2 hover:text-gray-200 transition">
                            <input type="radio" disabled className="accent-accent bg-transparent" />
                            False
                        </label>
                    </div>
                )}

                {question.type === 'INPUT' && (
                    <input
                        type="text"
                        disabled
                        placeholder="Short answer..."
                        className="w-full bg-transparent border border-border rounded-lg px-3 py-2
                       text-gray-300 placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-accent/40
                       transition-all"
                    />
                )}

                {question.type === 'CHECKBOX' && (
                    <ul className="space-y-2 text-gray-400">
                        {Array.isArray(question.options) &&
                            question.options.map((opt: string, i: number) => (
                                <li key={i}>
                                    <label className="flex items-center gap-2 hover:text-gray-200 transition">
                                        <input type="checkbox" disabled className="accent-accent bg-transparent" />
                                        {opt}
                                    </label>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
        </div>
    );
}