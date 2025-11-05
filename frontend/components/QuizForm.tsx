import { useState } from 'react';
import { createQuiz } from '@/services/quizzes';
import QuestionList from './QuestionList';
import AddQuestionButton from './AddQuestionButton';

export interface Question {
    id: number;
    text: string;
    type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
    options?: string[];
}

interface QuizFormProps {
    onShowSnackbar?: (message: string, type: 'success' | 'error') => void;
}

export default function QuizForm({ onShowSnackbar }: QuizFormProps) {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);

    const addQuestion = () => {
        setQuestions((prev) => [...prev, { id: Date.now(), text: '', type: 'INPUT', options: [] }]);
    };

    const removeQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: number, key: keyof Question, value: any) => {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, [key]: value } : q)));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title,
            questions: questions.map(({ id, ...rest }) => rest),
        };

        try {
            await createQuiz(payload);
            onShowSnackbar?.('Quiz created successfully!', 'success');
            setTitle('');
            setQuestions([]);
        } catch (err) {
            console.error(err);
            onShowSnackbar?.('Failed to create quiz', 'error');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 p-8 transition-all duration-300 animate-slide-up"
        >
            <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 tracking-wide">
                    Quiz Title
                </label>
                <input
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Name your quiz..."
                    className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-gray-100 placeholder:text-gray-500 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all duration-300"
                />
            </div>

            <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-xl p-6">
                <QuestionList
                    questions={questions}
                    onRemove={removeQuestion}
                    onUpdate={updateQuestion}
                />
                <div className="mt-6 text-center">
                    <AddQuestionButton onAdd={addQuestion} />
                </div>
            </div>

            <button
                type="submit"
                className="mt-2 bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-accent focus:outline-none"
            >
                Submit Quiz
            </button>
        </form>
    );
}