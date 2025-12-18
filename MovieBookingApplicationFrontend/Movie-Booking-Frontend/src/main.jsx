import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ShowProvider } from "./context/ShowContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ShowProvider>
        <App />
      </ShowProvider>
    </AuthProvider>
  </StrictMode>
);
