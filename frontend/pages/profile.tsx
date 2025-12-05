import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getUserProfile } from "@/services/user";
import { UserProfile } from "@/types/types";

import Loader from "@/components/utils/Loader";

import ProfileHeader from "@/components/profile/ProfileHeader";
import UserCard from "@/components/profile/UserCard";
import StatsGrid from "@/components/profile/StatsGrid";
import ActivityHistory from "@/components/profile/ActivityHistory";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [router]);

  if (loading) return <Loader />;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text) pb-20">
      <ProfileHeader />

      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <UserCard user={profile.user} />

        <StatsGrid stats={profile.stats} />

        <ActivityHistory history={profile.history} />
      </main>
    </div>
  );
}
