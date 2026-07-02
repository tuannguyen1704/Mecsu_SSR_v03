import { ApiClientError } from "./api-client";

export function shouldThrowCatalogApiError() {
  return process.env.MECSU_STRICT_API_ERRORS === "true";
}

export function warnCatalogApiFallback(
  context: string,
  error: unknown,
  fallback: string,
) {
  console.warn("[catalog-api] fallback because API failed", {
    context,
    fallback,
    ...getCatalogApiErrorDetails(error),
  });
}

function getCatalogApiErrorDetails(error: unknown) {
  if (error instanceof ApiClientError) {
    return {
      status: error.status,
      url: error.url,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
    };
  }

  return {
    message: String(error),
  };
}
