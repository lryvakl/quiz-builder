import type { Question } from './QuizForm';
import { X } from 'lucide-react';

interface Props {
    question: Question;
    onRemove: (id: number) => void;
    onUpdate: (id: number, key: keyof Question, value: any) => void;
}

export default function QuestionItem({ question, onRemove, onUpdate }: Props) {
    const { id, text, type, options } = question;

    return (
        <div
            className="relative glass border border-border rounded-2xl p-6 shadow-md
                 transition-all duration-300 hover:shadow-lg hover:border-accent/40
                 text-gray-200 animate-slide-up"
        >
            <button
                type="button"
                onClick={() => onRemove(id)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-400
                   hover:scale-110 transition-all duration-200"
                title="Remove question"
            >
                <X className="w-5 h-5" />
            </button>

            <label className="block text-sm font-medium text-gray-400 mb-2">
                Question Text
            </label>
            <input
                type="text"
                value={text}
                required
                onChange={(e) => onUpdate(id, 'text', e.target.value)}
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2
                   text-gray-200 placeholder:text-gray-500
                   focus:outline-none focus:ring-2 focus:ring-accent/40
                   transition-all"
                placeholder="Enter your question..."
            />

            <label className="block text-sm font-medium text-gray-400 mt-5 mb-2">
                Type
            </label>
            <select
                value={type}
                onChange={(e) => onUpdate(id, 'type', e.target.value as Question['type'])}
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2
                   text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/40
                   transition-all cursor-pointer"
            >
                <option value="INPUT" className="bg-[#0d0d0d] text-gray-200">
                    Short text answer
                </option>
                <option value="BOOLEAN" className="bg-[#0d0d0d] text-gray-200">
                    True / False
                </option>
                <option value="CHECKBOX" className="bg-[#0d0d0d] text-gray-200">
                    Multiple choice
                </option>
            </select>

            {type === 'CHECKBOX' && (
                <>
                    <label className="block text-sm font-medium text-gray-400 mt-5 mb-2">
                        Options (comma separated)
                    </label>
                    <input
                        type="text"
                        value={(options || []).join(', ')}
                        onChange={(e) =>
                            onUpdate(
                                id,
                                'options',
                                e.target.value.split(',').map((s) => s.trim())
                            )
                        }
                        className="w-full bg-transparent border border-border rounded-lg px-3 py-2
                       text-gray-200 placeholder:text-gray-500
                       focus:outline-none focus:ring-2 focus:ring-accent/40
                       transition-all"
                        placeholder="e.g. Option A, Option B, Option C"
                    />
                </>
            )}
        </div>
    );
}