import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { authService } from "../services/auth";
import Spinner from "@/components/utils/Spinner";
import AuthInput from "@/components/inputs/AuthInput";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
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
      await authService.register(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-(--color-bg) text-(--color-text)">
      <div className="glass w-full max-w-md p-8 rounded-2xl animate-slide-up shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Join us to start creating quizzes
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <AuthInput
            label="Name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-(--color-accent) hover:bg-(--color-accent-hover) text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-(--color-accent)/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner className="w-5 h-5 text-white" />
                <span>Creating account...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--color-accent) hover:text-(--color-accent-hover) font-semibold transition-colors hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
