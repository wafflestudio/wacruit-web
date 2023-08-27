import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { useAnimatedTransition } from "../hooks/useAnimatedTransition";
import { setDelay } from "./delay";

export type PageDataFetcher<T extends object> = (
  queryClient: QueryClient,
) => (args: LoaderFunctionArgs) => Promise<T>;

/**
 * `react-router-dom`의 `BrowserRouter`에서 사용하는 `LoaderFunction`을 생성하는 함수입니다.
 * 데이터 Fetcher 함수와 애니메이션 지속시간을 인자로 받아 `LoaderFunction`을 반환합니다.
 *
 * 주의) DataFetcher의 값은 반드시 객체 형태로 반환되어야 합니다.
 *
 * @param pageDataFetcher 페이지에서 사용할 데이터를 미리 Fetch하는 함수입니다. 해당 데이터는 _useLoaderData()_ 대신 _usePage()_ hook을 통해 접근할 수 있습니다.
 * @param duration 전환 애니메이션의 지속시간입니다. (ms 단위)
 * @returns `createBrowserRouter`에서 사용할 Loader 함수를 반환합니다.
 */
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
