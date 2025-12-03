import { useRouter } from "next/router";
import { authService } from "../services/auth";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    authService.logout();

    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-6 py-2 rounded-xl font-bold text-white transition-all duration-300
                 bg-red-600/80 hover:bg-red-600 
                 border border-red-500/50
                 shadow-lg shadow-red-900/20 active:scale-95"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
