import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("mode") || "light";
    } catch {
      return "light";
    }
  });
  const [palette, setPalette] = useState(() => {
    try {
      return localStorage.getItem("palette") || "blue";
    } catch {
      return "blue";
    }
  });

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("data-mode", mode);
      localStorage.setItem("mode", mode);
    } catch (error) {
      console.warn("Failed to set mode:", error);
    }
  }, [mode]);

  useEffect(() => {
    try {
      const root = document.documentElement;
      root.setAttribute("data-palette", palette);
      localStorage.setItem("palette", palette);
    } catch (error) {
      console.warn("Failed to set palette:", error);
    }
  }, [palette]);

  const value = useMemo(() => ({ mode, palette, toggleMode, setPalette }), [mode, palette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}