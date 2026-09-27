import { api } from "@/shared/api/client";
import { unwrap } from "@/lib/http/unwrap";

import type { components } from "@/shared/api/generated/schema";

type RegisterRequest = components["schemas"]["RegisterSchema"];

type LoginRequest = components["schemas"]["LoginSchema"];

type UserRead = components["schemas"]["UserRead"];

export async function register(body: RegisterRequest) {
  const result = await api.POST("/v1/auth/register", {
    body,
  });

  return unwrap(result);
}

export async function login(body: LoginRequest) {
  const result = await api.POST("/v1/auth/login", {
    body,
  });

  return unwrap(result);
}

export async function refresh(): Promise<void> {
  const response = await api.POST("/v1/session/refresh");

  unwrap(response);
}

export async function logout(): Promise<void> {
  const response = await api.POST("/v1/session/logout");

  unwrap(response);
}

export async function me(): Promise<UserRead | null> {
  const result = await api.GET("/v1/session/me");

  if (result.error !== undefined && result.response.status === 401) {
    return null;
  }

  return unwrap(result);
}
