import { api } from "./api";
import { RegisterData, LoginData, AuthResponse } from "../types/types";

export const authService = {
  async register(data: RegisterData) {
    return api.post<AuthResponse>("/register", data);
  },

  async login(data: LoginData) {
    const response = await api.post<AuthResponse>("/login", data);

    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    return response;
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
