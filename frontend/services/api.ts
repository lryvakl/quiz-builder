const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type FetchOptions = {
  method?: string;
  body?: any;
  headers?: HeadersInit;
  requireAuth?: boolean;
};

async function request<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, requireAuth = true } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (requireAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    const errorText = await res.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Something went wrong");
    } catch {
      throw new Error(errorText || `Error ${res.status}`);
    }
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),
  post: <T>(url: string, body: any) =>
    request<T>(url, { method: "POST", body }),
  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
  getPublic: <T>(url: string) =>
    request<T>(url, { method: "GET", requireAuth: false }),
};
