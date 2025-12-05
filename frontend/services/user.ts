import { UserProfile } from "../types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};
