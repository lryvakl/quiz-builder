import { api } from "./api";
import {
  QuizPayload,
  QuizSummary,
  QuizDetails,
  SubmissionPayload,
  QuizResult,
} from "../types/types";

export async function createQuiz(data: QuizPayload): Promise<void> {
  return api.post<void>("/quizzes", data);
}

export async function deleteQuiz(id: number): Promise<void> {
  return api.delete<void>(`/quizzes/${id}`);
}

export async function getAllQuizzes(): Promise<QuizSummary[]> {
  return api.get<QuizSummary[]>("/quizzes");
}

export async function getQuizById(id: number): Promise<QuizDetails> {
  return api.get<QuizDetails>(`/quizzes/${id}`);
}

export async function submitQuiz(
  quizId: number,
  data: SubmissionPayload
): Promise<QuizResult> {
  const response = await api.post<{ message: string; result: QuizResult }>(
    `/quizzes/${quizId}/submit`,
    data
  );
  return response.result;
}
