import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllQuizzes, deleteQuiz } from "@/services/quizzes";
import { QuizSummary } from "../types/types";
import { ListChecks, Plus } from "lucide-react";
import Snackbar from "@/components/utils/Snackbar";
import QuizList from "@/components/QuizList";
import { User } from "lucide-react";
import Loader from "@/components/utils/Loader";

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const load = async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
        setSnackbar({ message: "Failed to load quizzes", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
      setSnackbar({ message: "Quiz deleted successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Failed to delete quiz", type: "error" });
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <main className="max-w-3xl mx-auto p-6 bg-bg min-h-screen text-text">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 animate-slide-up">
          <h1 className="text-3xl font-semibold flex items-center gap-3 text-text ">
            <ListChecks className="w-7 h-7 text-accent" />
            All Quizzes
          </h1>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 text-accent hover:text-accentHover font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Quiz
                </Link>

                <Link
                  href="/profile"
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <User className="w-6 h-6 text-gray-300" />
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-(--color-accent) text-white rounded-lg hover:bg-(--color-accent-hover) transition font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Quiz List */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg animate-slide-up">
          {quizzes.length > 0 ? (
            <QuizList
              quizzes={quizzes}
              onDelete={isAuthenticated ? handleDelete : undefined}
            />
          ) : (
            <div className="text-center py-10 text-gray-500">
              No quizzes found. Be the first to create one!
            </div>
          )}
        </div>
      </main>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </>
  );
}
