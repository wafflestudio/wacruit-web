import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import initMocks from "./mocks/index";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./pages/Home";
import Solve from "./pages/Solve";
import Resume from "./pages/Resume";
import Recruit from "./pages/Recruit";
import Dashboard from "./pages/Dashboard";
import Sso from "./pages/Sso";
import Announcement from "./pages/Announcement";
import { CookiesProvider } from "react-cookie";
import { dashboardLoader } from "./pages/Loader/DashboardLoader";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    errorElement: <div>error</div>,
    index: true,
  },
  {
    path: "recruiting/:recruit_id",
    element: <Recruit />,
    errorElement: <div>error</div>,
    children: [
      { path: "resume", element: <Resume /> },
      { path: "solve/:problem_number", element: <Solve /> },
      {
        path: "",
        element: <Dashboard />,
        loader: dashboardLoader(queryClient),
        errorElement: <div>리크루팅을 찾을 수 없습니다</div>,
      },
    ],
  },
  { path: "announcement", element: <Announcement /> },
  { path: "/sso/:recruit_id", element: <Sso /> },
]);

if (import.meta.env.DEV && import.meta.env.VITE_API_TYPE === "MSW") {
  await initMocks();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>,
);
