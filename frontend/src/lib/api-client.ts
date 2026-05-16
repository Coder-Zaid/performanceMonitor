import { useAuth } from "@clerk/nextjs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

/**
 * Core fetch function. Accepts an optional token so it can be used from
 * both server components (pass token explicitly) and client components
 * (call via apiClient which automatically retrieves the Clerk session token).
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions & { token?: string } = {}
): Promise<T> {
  const { params, token, ...fetchOptions } = options;

  const url = new URL(`${BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401) {
    throw new Error('Unauthorized — please log in again.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

/**
 * Client-side API client that automatically retrieves the Clerk session token
 * and attaches it as the Authorization header on every request.
 *
 * Usage in a client component:
 *   const { getApiClient } = useApiClient();
 *   const data = await getApiClient().get('/departments');
 */
export function useApiClient() {
  const { getToken } = useAuth();

  const authenticatedFetch = async <T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> => {
    const token = await getToken();
    return apiFetch<T>(endpoint, { ...options, token: token ?? undefined });
  };

  const client = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
      authenticatedFetch<T>(endpoint, { ...options, method: 'GET' }),
    post: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
      authenticatedFetch<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
      authenticatedFetch<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
    patch: <T>(endpoint: string, body?: any, options?: RequestOptions) =>
      authenticatedFetch<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(endpoint: string, options?: RequestOptions) =>
      authenticatedFetch<T>(endpoint, { ...options, method: 'DELETE' }),
  };

  return { getApiClient: () => client };
}

/**
 * Legacy export kept for backward compatibility.
 * NOTE: This does NOT attach an auth token. Only use for public endpoints.
 * For protected endpoints, use `useApiClient()` in client components.
 */
export const apiClient = {
  get: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body?: any, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body?: any, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string, options?: RequestOptions) => apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
};
