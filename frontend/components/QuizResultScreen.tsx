import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { QuizResult } from "../types/types";

interface Props {
  result: QuizResult;
}

export default function QuizResultScreen({ result }: Props) {
  const percentage = Math.round((result.score / result.total) * 100);
  const isSuccess = percentage >= 50;
  const message = isSuccess ? "Great Job!" : "Keep Practicing!";
  const Icon = isSuccess ? CheckCircle : XCircle;
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-slide-up">
      <div
        className={`p-4 rounded-full bg-card border border-border mb-6 shadow-xl ${
          isSuccess ? "shadow-green-500/20" : "shadow-red-500/20"
        }`}
      >
        <Icon className={`w-16 h-16 ${iconColor}`} />
      </div>

      <h1 className="text-4xl font-bold text-gray-100 mb-2">{message}</h1>

      <p className="text-gray-400 text-lg mb-8">
        You scored{" "}
        <span className="text-(--color-accent) font-bold text-3xl">
          {result.score}
        </span>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-white font-bold text-2xl">{result.total}</span>
      </p>

      <div className="w-full max-w-xs bg-gray-800 rounded-full h-2.5 mb-8 overflow-hidden">
        <div
          className="bg-(--color-accent) h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <Link
        href="/quizzes"
        className="px-8 py-3 bg-(--color-accent) text-white rounded-xl hover:bg-(--color-accent-hover) transition font-medium shadow-lg shadow-(--color-accent)/20"
      >
        Back to Quizzes
      </Link>
    </div>
  );
}
