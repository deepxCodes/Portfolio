import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


import "@fontsource/inter/400.css"; // Regular Inter font
import "@fontsource/poppins/700.css"; // Bold Poppins
import "@fontsource/space-grotesk/400.css"; // Regular Space Grotesk
import "@fontsource/michroma"; 
import "@fontsource/orbitron/700.css"; // Bold weight
import "@fontsource-variable/inter"; // Loads default variable font
import "@fontsource-variable/inter/wght.css"; // Weight axis
import "@fontsource-variable/inter/wght-italic.css"; // Italic weight axis
import "@fontsource/sora"; 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
