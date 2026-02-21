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
import Solve from "./pages/SolveV2";
import Resume from "./pages/Resume";
import Recruit from "./pages/Recruit";
import Dashboard from "./pages/Dashboard";
import Announcement from "./pages/Announcement";
import { dashboardLoader } from "./pages/Loader/DashboardLoader";
import { resumeLoader } from "./pages/Loader/ResumeLoader";
import Result, { NoResult } from "./pages/Result";
import { resultLoader } from "./pages/Loader/ResultLoader";
import RecruitList from "./pages/RecruitList";
import ProjectV2 from "./pages/ProjectV2";
import ProjectDetailV2 from "./pages/ProjectDetailV2";
import Review from "./pages/Review";
import Member from "./pages/Member";
import HomeV2 from "./pages/HomeV2";
import RecruitInfoV3 from "./pages/RecruitInfoV3";
import LoginRedirect from "./pages/LoginRedirect";
import { ProgrammersRecruitInfoPage } from "./pages/ProgrammersRecruitInfoPage";

const queryClient = new QueryClient();

const {
  HOME_V2,
  ANNOUNCEMENT,
  LOGIN_REDIRECT,
  RECRUITING_LIST,
  RECRUITING_INFO,
  RECRUITING_DETAIL,
  RECRUITING_PROGRAMMERS_DETAIL,
  PROJECT_LIST,
  PROJECT_DETAIL,
  REVIEW_LIST,
  MEMBER,
} = PATH;

const router = createBrowserRouter([
  {
    path: "",
    element: <HomeV2 />,
    errorElement: <div>error</div>,
    index: true,
  },
  {
    path: HOME_V2,
    element: <HomeV2 />,
    errorElement: <div>error</div>,
  },
  {
    path: LOGIN_REDIRECT,
    element: <LoginRedirect />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_INFO,
    element: <RecruitInfoV3 />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_LIST,
    element: <RecruitList />,
    errorElement: <div>error</div>,
  },
  {
    path: RECRUITING_PROGRAMMERS_DETAIL,
    element: <ProgrammersRecruitInfoPage />,
    errorElement: <div>프로그래머스 페이지를 불러올 수 없습니다.</div>,
  },
  {
    path: PROJECT_LIST,
    element: <ProjectV2 />,
    errorElement: <div>error</div>,
  },
  {
    path: PROJECT_DETAIL,
    element: <ProjectDetailV2 />,
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
