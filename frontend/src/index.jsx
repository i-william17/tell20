import React from "react";
import { createRoot } from "react-dom/client";
import "react-international-phone/style.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
