import { QuizPayload, QuizSummary, QuizDetails } from "../types/types";

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
  const res = await fetch(`${BASE_URL}/quizzes`);

  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}
export async function getQuizById(id: number): Promise<QuizDetails> {
  const res = await fetch(`${BASE_URL}/quizzes/${id}`);

  if (!res.ok) throw new Error(`Quiz ${id} not found`);
  return res.json();
}
