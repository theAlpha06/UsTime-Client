import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthContextProvider } from "./auth/authContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    </BrowserRouter>
  </AuthContextProvider>
);

serviceWorkerRegistration.register();
