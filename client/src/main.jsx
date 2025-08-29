import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// ✅ Font imports (make sure these packages are installed)
import "@fontsource/inter/400.css"; // Regular Inter font
import "@fontsource/poppins/700.css"; // Bold Poppins
import "@fontsource/space-grotesk/400.css"; // Regular Space Grotesk

// ✅ Optional: Variable fonts (only if you need them and they're installed)
import "@fontsource-variable/inter"; // Loads default variable font
import "@fontsource-variable/inter/wght.css"; // Weight axis
import "@fontsource-variable/inter/wght-italic.css"; // Italic weight axis

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
