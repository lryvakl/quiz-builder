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
        <div className="relative border border-gray-200 rounded-xl p-5 mt-4 bg-white shadow-sm transition hover:shadow-md">
            {/* remove (X) button */}
            <button
                type="button"
                onClick={() => onRemove(id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                title="Remove question"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Question Text */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
                <input
                    type="text"
                    value={text}
                    required
                    onChange={(e) => onUpdate(id, 'text', e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your question..."
                />
            </label>

            {/* Question Type */}
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                Type
                <select
                    value={type}
                    onChange={(e) => onUpdate(id, 'type', e.target.value as Question['type'])}
                    className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                    <option value="INPUT">Short text answer</option>
                    <option value="BOOLEAN">True / False</option>
                    <option value="CHECKBOX">Multiple choice</option>
                </select>
            </label>

            {/* Checkbox Options */}
            {type === 'CHECKBOX' && (
                <label className="block text-sm font-medium text-gray-700 mt-3">
                    Options (comma separated)
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
                        className="mt-1 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g. Option A, Option B, Option C"
                    />
                </label>
            )}
        </div>
    );
}