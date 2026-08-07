const NETWORK_ERROR_MESSAGE = "네트워크 연결을 확인한 뒤 다시 시도해주세요.";

export async function resolveApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Response) {
    const data = (await error.json().catch(() => null)) as {
      detail?: unknown;
    } | null;

    return typeof data?.detail === "string" ? data.detail : fallback;
  }

  if (error instanceof TypeError) return NETWORK_ERROR_MESSAGE;

  return fallback;
}
