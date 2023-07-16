import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import initMocks from "./mocks/index";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Rookie from "./pages/Rookie";
import Solve from "./pages/Solve";
import Resume from "./pages/Resume";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    errorElement: <div>error</div>,
    index: true,
  },
  {
    path: "/rookie",
    element: <Rookie />,
    errorElement: <div>error</div>,
  },
  {
    path: "/rookie/resume",
    element: <Resume />,
    errorElement: <div>error</div>,
  },
  {
    path: "/solve/:problem_number",
    element: <Solve />,
    errorElement: <div>error</div>,
  },
]);

if (process.env.NODE_ENV === "development") {
  await initMocks();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
