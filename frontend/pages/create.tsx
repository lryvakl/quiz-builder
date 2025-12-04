import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, PenTool } from "lucide-react";
import QuizForm from "@/components/QuizForm";
import Snackbar from "@/components/utils/Snackbar";

export default function CreatePage() {
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text) relative overflow-hidden selection:bg-(--color-accent) selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-(--color-accent) opacity-15 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-12 animate-slide-up">
          <button
            onClick={() => router.push("/quizzes")}
            className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-(--color-accent) group-hover:bg-(--color-accent)/20 transition-all duration-300">
              <ArrowLeft className="w-5 h-5 group-hover:text-(--color-accent)" />
            </div>
            <span className="font-medium text-sm tracking-wide">
              Back to Dashboard
            </span>
          </button>
        </div>

        <div
          className="flex items-center justify-center gap-4 mb-10 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-linear-to-br from-(--color-accent)/20 to-transparent border border-(--color-accent)/20 shadow-lg shadow-(--color-accent)/10">
            <PenTool className="w-6 h-6 text-(--color-accent)" />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-gray-400 tracking-tight">
            Create a New Quiz
          </h1>
        </div>

        <div
          className="glass border border-white/10 rounded-3xl shadow-2xl shadow-black/50 animate-slide-up overflow-hidden"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="h-1 w-full bg-linear-to-r from-transparent via-(--color-accent) to-transparent opacity-50" />

          <div className="bg-(--color-card)/30">
            <QuizForm
              onShowSnackbar={(msg, type) =>
                setSnackbar({ message: msg, type })
              }
            />
          </div>
        </div>
      </main>

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
}
