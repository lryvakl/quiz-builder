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

export interface QuestionPayload {
  text: string;
  type: "BOOLEAN" | "INPUT" | "CHECKBOX";
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
