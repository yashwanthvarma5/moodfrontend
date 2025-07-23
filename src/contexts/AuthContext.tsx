import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import API from "../utils/api"; // ✅ Centralized Axios instance

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("vibetrackr-user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user: backendUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("vibetrackr-user", JSON.stringify(backendUser));
      setUser(backendUser);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
        confirmPassword: password,
      });
      const { token, user: backendUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("vibetrackr-user", JSON.stringify(backendUser));
      setUser(backendUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vibetrackr-user");
    localStorage.removeItem("vibetrackr-moods");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
