import { User } from "lucide-react";
import { UserProfile } from "@/types/types";
import LogoutButton from "../buttons/LogoutButton";

interface Props {
  user: UserProfile["user"];
}

export default function UserCard({ user }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
      <div className="flex items-end gap-6">
        {/* Avatar Placeholder */}
        <div className="w-32 h-32 rounded-3xl bg-linear-to-br from-(--color-accent) to-purple-600 p-1 shadow-2xl shadow-(--color-accent)/30">
          <div className="w-full h-full bg-[#0d0d0d] rounded-[22px] flex items-center justify-center">
            <User className="w-14 h-14 text-gray-400" />
          </div>
        </div>

        <div className="mb-2">
          <h1 className="text-4xl font-bold text-white mb-1">
            {user.name || "User"}
          </h1>
          <p className="text-gray-400 flex items-center gap-2">{user.email}</p>
        </div>
      </div>

      <LogoutButton></LogoutButton>
    </div>
  );
}
