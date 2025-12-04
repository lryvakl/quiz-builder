import { CheckCircle, AlertCircle } from "lucide-react";

interface Props {
  score: number;
  total: number;
}

export default function QuizResultBadge({ score, total }: Props) {
  const percentage = Math.round((score / total) * 100);

  let colorClass = "bg-red-500/10 text-red-400 border-red-500/20";
  let Icon = AlertCircle;

  if (percentage >= 70) {
    colorClass = "bg-green-500/10 text-green-400 border-green-500/20";
    Icon = CheckCircle;
  } else if (percentage >= 40) {
    colorClass = "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${colorClass}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>
        {score}/{total} ({percentage}%)
      </span>
    </div>
  );
}
