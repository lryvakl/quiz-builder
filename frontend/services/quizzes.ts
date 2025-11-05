

export interface QuestionPayload {
    text: string;
    type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
    options?: string[];
    correctAnswers?: string[];
}

export interface QuizPayload {
    title: string;
    questions: QuestionPayload[];
}

export interface QuizSummary {
    id: number;
    title: string;
    questionsCount: number;
}

export interface QuizDetails extends QuizPayload {
    id: number;
    createdAt: string;
}

// ---------------------------------------------------

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

// Create a new quiz
export async function createQuiz(data: QuizPayload): Promise<void> {
    const res = await fetch(`${BASE_URL}/quizzes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Failed to create quiz: ${err}`);
    }
}

// Get all quizzes
export async function getAllQuizzes(): Promise<QuizSummary[]> {
    const res = await fetch(`${BASE_URL}/quizzes`);
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
}

// Get a quiz by id
export async function getQuizById(id: number): Promise<QuizDetails> {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`);
    if (!res.ok) throw new Error(`Quiz ${id} not found`);
    return res.json();
}

// Delete a quiz
export async function deleteQuiz(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/quizzes/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete quiz ${id}`);
}
