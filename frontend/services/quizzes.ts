import { QuizPayload, QuizSummary, QuizDetails } from "../types/types";
import { SubmissionPayload, QuizResult } from "../types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("You need to be logged in to perform this action");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export async function createQuiz(data: QuizPayload): Promise<void> {
  const headers = getAuthHeaders();

  const res = await fetch(`${BASE_URL}/quizzes`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Please log in again");
    }
    const err = await res.text();
    throw new Error(`Failed to create quiz: ${err}`);
  }
}

export async function deleteQuiz(id: number): Promise<void> {
  const headers = getAuthHeaders();

  const res = await fetch(`${BASE_URL}/quizzes/${id}`, {
    method: "DELETE",
    headers: headers,
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error(`Failed to delete quiz ${id}`);
  }
}

export async function getAllQuizzes(): Promise<QuizSummary[]> {
  const headers = getAuthHeaders();
  const res = await fetch(`${BASE_URL}/quizzes`, {
    headers: headers as any,
  });

  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function getQuizById(id: number): Promise<QuizDetails> {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);

  if (!res.ok) throw new Error(`Quiz ${id} not found`);
  return res.json();
}

export async function submitQuiz(
  quizId: number,
  data: SubmissionPayload
): Promise<QuizResult> {
  const res = await fetch(`${BASE_URL}/quizzes/${quizId}/submit`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();

    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Failed to submit quiz");
    } catch {
      throw new Error(`Failed to submit quiz: ${errorText}`);
    }
  }

  const responseData = await res.json();
  return responseData.result;
}
