"use client";
import { useState, useEffect } from "react";
import { User, Moon, Sun } from "lucide-react";

export default function Topbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="flex items-center justify-between px-6 py-2 border-b bg-white dark:bg-gray-900 text-black dark:text-white sticky top-0 z-10">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
        <User className="w-7 h-7" />
      </div>
    </header>
  );
}
