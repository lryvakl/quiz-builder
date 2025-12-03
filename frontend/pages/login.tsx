import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../services/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authService.login(formData);
      router.push("/quizzes");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--color-bg) text-(--color-text)">
      <div className="glass w-full max-w-md p-8 rounded-2xl animate-slide-up shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">Log in</h1>
        <p className="text-gray-400 text-center mb-8">
          Enter your login details
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-(--color-bg) border-(--color-border) text-(--color-text) rounded-xl px-4 py-3 outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) transition-all placeholder-gray-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium ml-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-(--color-bg) border-(--color-border) text-(--color-text) rounded-xl px-4 py-3 outline-none focus:border-(--color-accent) focus:ring-1 focus:ring-(--color-accent) transition-all placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-(--color-accent) hover:bg-(--color-accent-hover) text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-(--color-accent)/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Log in"}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-400 text-sm">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="text-(--color-accent) hover:text-(--color-accent-hover) font-semibold transition-colors hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
