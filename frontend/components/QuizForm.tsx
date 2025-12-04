import { useState } from "react";
import { createQuiz } from "@/services/quizzes";
import QuestionList from "./QuestionList";
import AddQuestionButton from "./buttons/AddQuestionButton";
import { QuizPayload, Question } from "@/types/types";
import Spinner from "@/components/utils/Spinner";
import TextInput from "@/components/inputs/TextInput";

interface QuizFormProps {
  onShowSnackbar?: (message: string, type: "success" | "error") => void;
}

export default function QuizForm({ onShowSnackbar }: QuizFormProps) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: "",
        type: "INPUT",
        options: [],
        correctAnswers: null,
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: number, key: string, value: any) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          if (key === "type") {
            return { ...q, [key]: value, correctAnswers: null, options: [] };
          }
          return { ...q, [key]: value };
        }
        return q;
      })
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const hasErrors = questions.some(
      (q) =>
        q.correctAnswers === null ||
        (Array.isArray(q.correctAnswers) && q.correctAnswers.length === 0)
    );

    if (hasErrors) {
      onShowSnackbar?.(
        "Please specify correct answers for all questions",
        "error"
      );
      setSubmitting(false);
      return;
    }

    const payload: QuizPayload = {
      title,
      questions: questions.map((q) => ({
        text: q.text,
        type: q.type,
        options: q.options,
        correctAnswers: q.correctAnswers,
      })),
    };

    try {
      await createQuiz(payload);
      onShowSnackbar?.("Quiz created successfully!", "success");
      setTitle("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      onShowSnackbar?.("Failed to create quiz", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 p-8 transition-all duration-300 animate-slide-up"
    >
      <TextInput
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name your quiz..."
        required
      />

      <div>
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
        disabled={submitting}
        className="w-full mt-8 py-4 rounded-xl font-bold text-white text-lg tracking-wide
             bg-linear-to-r from-(--color-accent) to-(--color-accent-hover)
             shadow-lg shadow-(--color-accent)/30
             hover:shadow-(--color-accent)/50 hover:scale-[1.02] hover:-translate-y-0.5
             active:scale-95 active:translate-y-0
             transition-all duration-300 ease-out
             disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
             flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <Spinner className="w-5 h-5 text-white" />
            <span>Creating...</span>
          </>
        ) : (
          "Submit Quiz"
        )}
      </button>
    </form>
  );
}
