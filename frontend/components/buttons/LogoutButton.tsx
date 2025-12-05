import { useRouter } from "next/router";
import { authService } from "@/services/auth";
import { useState } from "react";
import { LogOut } from "lucide-react";
import Spinner from "../utils/Spinner";

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
      className="flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-white transition-all duration-300 cursor-pointer
                hover:bg-red-600 
                 border
                 shadow-lg shadow-red-900/20 active:scale-95 
                 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
    >
      {loading ? (
        <>
          <Spinner className="w-4 h-4 text-white" />
        </>
      ) : (
        <>
          <LogOut className="w-4 h-4" />
        </>
      )}
    </button>
  );
}
