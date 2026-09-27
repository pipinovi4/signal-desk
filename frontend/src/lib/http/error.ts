import { ApiErrorBody } from "@/lib/http/types";

export class HttpError extends Error {
  readonly status: number;
  readonly code: string | null;
  readonly details: unknown;

  constructor({
    status,
    code,
    message,
    details,
  }: {
    status: number;
    code: string | null;
    message: string;
    details: unknown;
  }) {
    super(message);

    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function createHttpError(response: Response, body: unknown): HttpError {
  const errorBody = isApiErrorBody(body) ? body : null;

  return new HttpError({
    status: response.status,
    code: errorBody?.error?.code ?? null,
    message:
      errorBody?.error?.message ??
      `Request failed with status ${response.status}`,
    details: errorBody?.detail ?? body,
  });
}

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return typeof value === "object" && value !== null;
}
