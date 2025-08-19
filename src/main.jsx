import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import "./styles/animations.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ThemeProvider from "./ThemeProvider.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <ToastProvider>
          <AuthProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </AuthProvider>
        </ToastProvider>
      </HashRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
