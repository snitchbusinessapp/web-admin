import { useStore } from "../store";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  [key: string]: unknown;
}

async function readJsonSafely(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export interface ApiResult<T> {
  data?: T;
  statusCode: number;
  error?: {
    detail: string;
  };
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResult<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = JSON.parse(await response.text());
    const detail =
      typeof error?.detail === "string"
        ? error.detail
        : JSON.stringify(error?.detail ?? error);
    return { error: { detail }, statusCode: response.status };
  }

  const responseJson: ApiResponse<T> | unknown = await readJsonSafely(response);
  const data =
    responseJson &&
    typeof responseJson === "object" &&
    "data" in responseJson &&
    responseJson.data !== undefined
      ? (responseJson.data as T)
      : (responseJson as T);

  return { data, statusCode: response.status };
}

export async function authenticatedApiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResult<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const user = useStore.getState().user;
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user?.token?.jwt}`,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.text();
    const parsedError = JSON.parse(error) as { detail: string };
    return { statusCode: response.status, error: parsedError };
  }

  const responseJson: ApiResponse<T> | unknown = await readJsonSafely(response);
  const data =
    responseJson &&
    typeof responseJson === "object" &&
    "data" in responseJson &&
    responseJson.data !== undefined
      ? (responseJson.data as T)
      : (responseJson as T);

  return { data, statusCode: response.status };
}
