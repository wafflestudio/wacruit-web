import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import "./index.css";
import initMocks from "./mocks/index";
import { theme } from "./shared/styles/designSystem";
import { PATH } from "./shared/routes/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./pages/Home";
import Solve from "./pages/SolveV2";
import Resume from "./pages/Resume";
import Recruit from "./pages/Recruit";
import Dashboard from "./pages/Dashboard";
import Sso from "./pages/Sso";
import Announcement from "./pages/Announcement";
import { dashboardLoader } from "./pages/Loader/DashboardLoader";
import { resumeLoader } from "./pages/Loader/ResumeLoader";
import Result, { NoResult } from "./pages/Result";
import { resultLoader } from "./pages/Loader/ResultLoader";
import RecruitList from "./pages/RecruitList";
import Project from "./pages/Project";
import ProjectDetail from "./pages/ProjectDetail";
import Review from "./pages/Review";
import Member from "./pages/Member";
import HomeV2 from "./pages/HomeV2";
import RecruitInfoV2 from "./pages/RecruitInfoV2";

const queryClient = new QueryClient();

const {
  HOME_V2,
  ANNOUNCEMENT,
  RECRUITING_LIST,
  RECRUITING_INFO,
  RECRUITING_DETAIL,
  PROJECT_LIST,
  PROJECT_DETAIL,
  REVIEW_LIST,
  MEMBER,
} = PATH;

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    errorElement: <div>error</div>,
    index: true,
  },
  {
    path: HOME_V2,
    element: <HomeV2 />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_INFO,
    element: <RecruitInfoV2 />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_LIST,
    element: <RecruitList />,
    errorElement: <div>error</div>,
  },
  {
    path: PROJECT_LIST,
    element: <Project />,
    errorElement: <div>error</div>,
  },
  {
    path: PROJECT_DETAIL,
    element: <ProjectDetail />,
    errorElement: <div>error</div>,
  },
  {
    path: REVIEW_LIST,
    element: <Review />,
    errorElement: <div>error</div>,
  },
  {
    path: MEMBER,
    element: <Member />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_DETAIL,
    element: <Recruit />,
    errorElement: <div>error</div>,
    children: [
      {
        path: "resume",
        element: <Resume />,
        loader: resumeLoader(queryClient),
        errorElement: <div>자기소개서 에러</div>,
      },
      { path: "solve/:problem_number", element: <Solve /> },
      {
        path: "",
        element: <Dashboard />,
        loader: dashboardLoader(queryClient),
        errorElement: <div>리크루팅을 찾을 수 없습니다</div>,
      },
      {
        path: "result",
        element: <Result />,
        loader: resultLoader(queryClient),
        errorElement: <NoResult />,
      },
    ],
  },
  { path: ANNOUNCEMENT, element: <Announcement /> },
  { path: "/sso/:recruit_id", element: <Sso /> },
]);

if (import.meta.env.DEV && import.meta.env.VITE_API_TYPE === "MSW") {
  await initMocks();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
