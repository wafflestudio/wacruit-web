import { useLocation } from "react-router-dom";

export const useRouteLocation = () => {
  const location = useLocation();
  return { path: location.pathname };
};
