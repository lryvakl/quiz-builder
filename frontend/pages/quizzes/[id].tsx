import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getQuizById, submitQuiz } from "@/services/quizzes";
import { QuizDetails, QuizResult } from "../../types/types";
import { HelpCircle } from "lucide-react";
import BackButton from "@/components/buttons/BackButton";
import DetailQuizItem from "@/components/DetailQuizItem";
import QuizResultScreen from "@/components/QuizResultScreen";

import Loader from "@/components/utils/Loader";
import Spinner from "@/components/utils/Spinner";

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [quiz, setQuiz] = useState<QuizDetails | null>(null);
  const [answers, setAnswers] = useState<Record<number, any>>({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const loadQuiz = async () => {
      try {
        const data = await getQuizById(Number(id));
        setQuiz(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, [id]);

  const handleAnswerChange = (questionId: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setSubmitting(true);

    const payload = {
      answers: Object.entries(answers).map(([qId, val]) => ({
        questionId: Number(qId),
        answer: val,
      })),
    };

    try {
      const res = await submitQuiz(quiz.id, payload);
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  if (result) return <QuizResultScreen result={result} />;

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  if (!quiz) return null;

  return (
    <main className="relative min-h-screen px-6 py-16 flex flex-col items-center text-gray-200">
      <BackButton />

      <header className="mb-10 text-center animate-slide-up">
        <div className="flex items-center justify-center gap-3 mb-2">
          <HelpCircle className="w-7 h-7 text-(--color-accent)" />
          <h1 className="text-3xl font-bold text-gray-100 tracking-wide">
            {quiz.title}
          </h1>
        </div>
        <p className="text-gray-400">{quiz.questions.length} Questions</p>
      </header>

      <section className="w-full max-w-2xl space-y-6 animate-slide-up">
        {quiz.questions.map((q) => (
          <DetailQuizItem
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(val) => handleAnswerChange(q.id, val)}
          />
        ))}

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full mt-8 py-4 bg-(--color-accent) hover:bg-(--color-accent-hover) text-white font-bold text-lg rounded-xl shadow-lg transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <Spinner className="w-5 h-5 text-white" />
              <span>Submitting...</span>
            </>
          ) : (
            "Submit Quiz"
          )}
        </button>
      </section>
    </main>
  );
}
