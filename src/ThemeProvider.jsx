import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }) {
<<<<<<< HEAD
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
=======
  const [mode, setMode] = useState(() => localStorage.getItem("mode") || "light");
  const [palette, setPalette] = useState(() => localStorage.getItem("palette") || "blue");
>>>>>>> 3aa2f09ae87276ca2317e7294239b1ea6bda4c8e

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  useEffect(() => {
<<<<<<< HEAD
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
=======
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-palette", palette);
    localStorage.setItem("palette", palette);
>>>>>>> 3aa2f09ae87276ca2317e7294239b1ea6bda4c8e
  }, [palette]);

  const value = useMemo(() => ({ mode, palette, toggleMode, setPalette }), [mode, palette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}