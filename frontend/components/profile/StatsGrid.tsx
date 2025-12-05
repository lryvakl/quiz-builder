import { Trophy, History } from "lucide-react";
import { UserProfile } from "@/types/types";

interface Props {
  stats: UserProfile["stats"];
}

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 animate-slide-up">
      {/* Average Score Card */}
      <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-(--color-accent)/30 transition-colors">
        <div className="p-4 rounded-xl bg-(--color-accent)/10 text-(--color-accent)">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            Average Score
          </p>
          <p className="text-3xl font-bold text-white">
            {stats.averageAccuracy}%
          </p>
        </div>
      </div>

      {/* Quizzes Taken Card */}
      <div className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-5 hover:border-(--color-accent)/30 transition-colors">
        <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400">
          <History className="w-8 h-8" />
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
            Quizzes Taken
          </p>
          <p className="text-3xl font-bold text-white">
            {stats.totalQuizzesTaken}
          </p>
        </div>
      </div>
    </div>
  );
}
