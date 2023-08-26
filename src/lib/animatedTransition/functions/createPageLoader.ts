import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { useAnimatedTransition } from "../hooks/useAnimatedTransition";
import { setDelay } from "./delay";

export type PageDataFetcher<T extends object> = (
  queryClient: QueryClient,
) => (args: LoaderFunctionArgs) => Promise<T>;

export const createPageLoader =
  <T extends object>(pageDataFetcher: PageDataFetcher<T>, duration: number) =>
  (queryClient: QueryClient) =>
  async ({ request, params }: LoaderFunctionArgs) => {
    useAnimatedTransition.getState().startTransition(request.url);
    const data = await pageDataFetcher(queryClient)({ request, params });
    const delay = await setDelay(duration);

    //end transition just after loader activate
    setTimeout(() => {
      useAnimatedTransition.getState().endTransition();
    }, 0);
    return { ...data, delay };
  };
