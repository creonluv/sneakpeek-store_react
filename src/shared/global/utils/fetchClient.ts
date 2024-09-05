const BASE_URL = "http://localhost:9091/api";

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface RequestOptions extends RequestInit {
  method: string;
  body?: string;
  headers?: HeadersInit;
}

async function request<T>(
  url: string,
  method: string = "GET",
  data: any = null
): Promise<T> {
  const options: RequestOptions = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  await wait(300);
  const response = await fetch(BASE_URL + url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  put: <T>(url: string, data: any) => request<T>(url, "PUT", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
