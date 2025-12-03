import axios from "axios";
import { RegisterData, LoginData, AuthResponse } from "../types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async register(data: RegisterData) {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/register`,
      data
    );
    return response.data;
  },

  async login(data: LoginData) {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  },
};
