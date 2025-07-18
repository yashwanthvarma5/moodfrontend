import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Navbar } from "./Navbar";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col w-full ${currentTheme.background}`}
    >
      <Navbar />
      <main className="flex-grow w-full">{children}</main>
      <Toaster />
    </div>
  );
};
