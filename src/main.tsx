import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Header } from "./pages/common/Header.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { GoalsProductsProvider } from "./contexts/ProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Header />
    <UserProvider>
      <GoalsProductsProvider>
        <App />
      </GoalsProductsProvider>
    </UserProvider>
  </React.StrictMode>
);
