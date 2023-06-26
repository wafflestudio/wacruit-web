import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import initMocks from "./mocks/index";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

if (process.env.NODE_ENV === "development") {
  await initMocks();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
