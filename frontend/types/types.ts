export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

export interface UserProfile {
  user: {
    id: number;
    name: string | null;
    email: string;
    createdAt: string;
  };
  stats: {
    totalQuizzesTaken: number;
    averageAccuracy: number;
  };
  history: {
    id: number;
    quizTitle: string;
    score: number;
    total: number;
    date: string;
  }[];
}

export interface QuestionPayload {
  id?: number;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: string[];
  correctAnswers?: string | boolean | string[] | null;
}

export interface QuizPayload {
  title: string;
  questions: QuestionPayload[];
}

export interface QuizSummary {
  id: number;
  title: string;
  questionsCount: number;
  myResult?: {
    score: number;
    total: number;
  } | null;
}

export interface Question {
  id: number;
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
  options?: string[];
  correctAnswers?: string | boolean | string[] | null;
}

export interface QuizDetails extends Omit<QuizPayload, "questions"> {
  id: number;
  createdAt: string;
  questions: Question[];
}

export interface SubmissionAnswer {
  questionId: number;
  answer: string | boolean | string[];
}

export interface SubmissionPayload {
  answers: SubmissionAnswer[];
}

export interface QuizResult {
  score: number;
  total: number;
  attemptId: number;
}
