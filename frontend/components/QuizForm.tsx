import { useState } from 'react';
import { createQuiz } from '@/services/quizzes';
import QuestionList from './QuestionList';
import AddQuestionButton from './AddQuestionButton';
import Snackbar from './Snackbar';

export interface Question {
    id: number;
    text: string;
    type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
    options?: string[];
}

export default function QuizForm() {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(
        null
    );

    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            { id: Date.now(), text: '', type: 'INPUT', options: [] },
        ]);
    };

    const removeQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: number, key: keyof Question, value: any) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, [key]: value } : q))
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            title,
            questions: questions.map(({ id, ...rest }) => rest),
        };

        try {
            await createQuiz(payload);
            setSnackbar({ message: '✅ Quiz created successfully!', type: 'success' });
            setTitle('');
            setQuestions([]);
        } catch (err) {
            console.error(err);
            setSnackbar({ message: '❌ Failed to create quiz', type: 'error' });
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-8 transition-all duration-300"
            >
                {/* TITLE */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Quiz Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Name your quiz..."
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder:text-gray-400 transition"
                    />
                </div>

                {/* QUESTIONS */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <QuestionList
                        questions={questions}
                        onRemove={removeQuestion}
                        onUpdate={updateQuestion}
                    />
                    <div className="mt-6 text-center">
                        <AddQuestionButton onAdd={addQuestion} />
                    </div>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                     Submit Quiz
                </button>
            </form>

            {snackbar && (
                <Snackbar
                    message={snackbar.message}
                    type={snackbar.type}
                    onClose={() => setSnackbar(null)}
                />
            )}
        </>
    );
}