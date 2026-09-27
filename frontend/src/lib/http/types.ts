export type HttpOptions = Omit<RequestInit, "body"> & {
  json?: unknown;
};

export type ApiErrorBody = {
  error?: {
    code?: string;
    message: string;
  };
  detail?: unknown;
};
