import { refresh } from "../../api/auth";

const BASE_URL = "http://localhost:9091/api";

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function handleRefresh() {
  try {
    await refresh();
  } catch (error) {
    console.error("Помилка при оновленні токена:", error);
    throw error;
  }
}

async function request<T>(url: string, method: RequestMethod = "GET", data: any = null): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  try {
    await wait(500);
    const response = await fetch(BASE_URL + url, options);

    if (!response.ok) {
      if (response.status === 401) {
        await handleRefresh();
        return request<T>(url, method, data);
      }

      if (response.status === 403) {
      }

      const errorMessage = await response.text();
      throw new Error(`Помилка мережі: ${response.status} - ${errorMessage}`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  } catch (error) {
    console.error("Виникла помилка при отриманні даних:", error);
    throw error;
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
