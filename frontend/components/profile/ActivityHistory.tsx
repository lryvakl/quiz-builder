import { Calendar } from "lucide-react";
import { UserProfile } from "@/types/types";

interface Props {
  history: UserProfile["history"];
}

export default function ActivityHistory({ history }: Props) {
  const getScoreColorClass = (score: number, total: number) => {
    const percentage = score / total;
    if (percentage >= 0.7)
      return "bg-green-500/10 text-green-400 border-green-500/20";
    if (percentage >= 0.4)
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    return "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-(--color-accent)" /> Recent Activity
      </h2>

      <div
        className="space-y-4 animate-slide-up"
        style={{ animationDelay: "0.1s" }}
      >
        {history.length === 0 ? (
          <div className="text-center py-10 text-gray-500 glass rounded-2xl border border-white/5">
            No quizzes taken yet. Go take some!
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="glass p-5 rounded-2xl border border-white/5 flex items-center justify-between hover:bg-white/2 transition-colors"
            >
              <div>
                <h3 className="font-semibold text-gray-200 text-lg">
                  {item.quizTitle}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(item.date).toLocaleDateString()} at{" "}
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-1.5 rounded-lg text-sm font-bold border ${getScoreColorClass(
                    item.score,
                    item.total
                  )}`}
                >
                  {item.score} / {item.total}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
