import { createHttpError } from "@/lib/http/error";

type ApiResult<T> = {
  data?: T;
  error?: unknown;
  response: Response;
};

export function unwrap<T>(result: ApiResult<T>): T {
  if (result.error !== undefined) {
    throw createHttpError(result.response, result.error);
  }

  return result.data as T;
}
