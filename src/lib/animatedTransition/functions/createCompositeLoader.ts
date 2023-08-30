import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs } from "react-router-dom";
import { setDelay } from "./delay";
import { useTransitionStore } from "../stores/useTransitionStore";

export type CompositeLoaderConfig = {
  transitionType: "phased"; // @todo: add "continuous"
  duration: number;
};

export type CompositeLoaderArgs = LoaderFunctionArgs &
  CompositeLoaderConfig & {
    url: URL;
  };

export type PageDataLoader<T extends object> = (
  queryClient: QueryClient,
) => (args: CompositeLoaderArgs) => Promise<T>;

const defaultConfig: CompositeLoaderConfig = {
  transitionType: "phased",
  duration: 500,
};

/**
 * `react-router-dom`에서 사용하는 `LoaderFunction`을 생성하는 함수입니다.
 * dataLoader를 이용한 데이터 준비아 `LoaderFunction`을 반환합니다.
 *
 * 주의) DataFetcher의 값은 반드시 객체 형태로 반환되어야 합니다.
 *
 * @param dataLoader 페이지에서 사용할 데이터를 미리 Fetch하는 함수입니다. 해당 데이터는 _useLoaderData()_ 대신 _usePage()_ hook을 통해 접근할 수 있습니다.
 * @param config (optional) 전환 애니메이션의 타입, 지속시간(기본값: 500ms) 등을 설정합니다.
 * @returns `createBrowserRouter`에서 사용할 Loader 함수를 반환합니다.
 */
export const createCompositeLoader =
  <T extends object>(
    dataLoader: PageDataLoader<T>,
    config?: Partial<CompositeLoaderConfig>,
  ) =>
  (queryClient: QueryClient) =>
  async ({ params, request, context }: LoaderFunctionArgs) => {
    const appliedConfig = { ...defaultConfig, ...config };

    const loaderArg = {
      params,
      request,
      context,
      url: new URL(request.url),
      ...appliedConfig,
    };
    useTransitionStore.getState().startTransition(loaderArg);
    const data = await dataLoader(queryClient)(loaderArg);
    await setDelay(appliedConfig.duration);

    //end transition just after loader activate
    setTimeout(() => {
      useTransitionStore.getState().endTransition();
    }, 0);
    return data;
  };
