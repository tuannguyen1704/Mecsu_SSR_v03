type QueryValue = string | number | boolean | null | undefined;

interface ApiGetOptions {
  query?: Record<string, QueryValue>;
  cache?: RequestCache;
  revalidate?: number;
  signal?: AbortSignal;
}

const DEFAULT_API_BASE_URL = "https://web-dev.mecsu.vn";

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
  const response = await fetch(url, {
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
    signal,
  });

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
