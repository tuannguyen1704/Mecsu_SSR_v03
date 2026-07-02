type QueryValue = string | number | boolean | null | undefined;

interface ApiGetOptions {
  query?: Record<string, QueryValue>;
  cache?: RequestCache;
  revalidate?: number;
  signal?: AbortSignal;
}

const DEFAULT_API_BASE_URL = "https://web-dev.mecsu.vn";
const DEFAULT_API_TIMEOUT_MS = 10_000;

function getApiBaseUrl() {
  return (process.env.MECSU_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

function buildApiUrl(path: string, query?: Record<string, QueryValue>) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${getApiBaseUrl()}${normalizedPath}`);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === null || typeof value === "undefined") {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url;
}

function getApiTimeoutMs() {
  const timeoutMs = Number(process.env.MECSU_API_TIMEOUT_MS);

  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return DEFAULT_API_TIMEOUT_MS;
  }

  return timeoutMs;
}

function getFetchErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }

  return String(error);
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly url?: string,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export async function apiGet<T>(
  path: string,
  { query, cache, revalidate, signal }: ApiGetOptions = {},
): Promise<T> {
  const url = buildApiUrl(path, query);
  const timeoutController = signal ? undefined : new AbortController();
  const timeoutId = timeoutController
    ? setTimeout(() => timeoutController.abort(), getApiTimeoutMs())
    : undefined;
  let response: Response;

  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache,
      next:
        cache !== "no-store" && typeof revalidate === "number"
          ? {
              revalidate,
            }
          : undefined,
      signal: signal ?? timeoutController?.signal,
    });
  } catch (error) {
    throw new ApiClientError(
      `GET ${url.pathname} failed: ${getFetchErrorMessage(error)}`,
      undefined,
      url.toString(),
    );
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  if (!response.ok) {
    throw new ApiClientError(
      `GET ${url.pathname} failed with status ${response.status}`,
      response.status,
      url.toString(),
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiClientError(
      `GET ${url.pathname} returned invalid JSON`,
      response.status,
      url.toString(),
    );
  }
}
