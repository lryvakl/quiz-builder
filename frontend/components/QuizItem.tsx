import Link from "next/link";
import { QuizSummary } from "../types/types";
import { ArrowRight } from "lucide-react";
import QuizResultBadge from "./QuizResultBadge";
import RemoveButton from "./buttons/RemoveButton";
interface QuizItemProps {
  quiz: QuizSummary;
  onDelete: (id: number) => void;
}

export default function QuizItem({ quiz, onDelete }: QuizItemProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-card border border-border rounded-2xl p-5 text-text transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)] gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-text tracking-wide">
            {quiz.title}
          </h2>

          {quiz.myResult && (
            <QuizResultBadge
              score={quiz.myResult.score}
              total={quiz.myResult.total}
            />
          )}
        </div>

        <p className="text-sm text-gray-400 flex items-center gap-2">
          <span className="bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-300">
            {quiz.questionsCount} Qs
          </span>

          {quiz.myResult && (
            <span className="text-xs text-accent">Completed</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <Link
          href={`/quizzes/${quiz.id}`}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent hover:bg-accent hover:text-white transition-all duration-300 font-medium text-sm"
          title={quiz.myResult ? "Retake quiz" : "Start quiz"}
        >
          {quiz.myResult ? "Retake" : "Start"}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <RemoveButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(quiz.id);
          }}
          title="Delete quiz"
          className="border border-transparent hover:border-red-500/20"
        />
      </div>
    </div>
  );
}
