import { refresh } from "../../api/auth";
import { ErrorType } from "../../types/Auth";

const BASE_URL = "https://localhost:9091/api";

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

async function handleRefresh() {
  try {
    await refresh();
  } catch (error) {
    console.error("Помилка при оновленні токена:", error);
    throw error;
  }
}

async function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = {
    method,
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  try {
    await wait(500);
    const response = await fetch(BASE_URL + url, options);
    let error;
    const responseText = await response.text();

    if (!response.ok) {
      error = JSON.parse(responseText);
      console.log(error, error.error_type);

      if (
        response.status === 400 &&
        error?.error_type === ErrorType.INVALID_REGISTRATION_DATA
      ) {
        console.log("Invalid data during registration.");
      }

      if (
        response.status === 401 &&
        (error?.error_type === ErrorType.ACCESS_TOKEN_EXPIRED ||
          error?.error_type === "JWT_EXPIRED")
      ) {
        await handleRefresh();
        return request<T>(url, method, data);
      }

      if (
        response.status === 401 &&
        error?.error_type === ErrorType.INVALID_LOGIN_DATA
      ) {
        console.log("Invalid login data.");
      }

      if (
        response.status === 401 &&
        error?.error_type === ErrorType.USER_NOT_AUTHORIZED
      ) {
        window.history.pushState({}, '', '/login');
      }

      if (
        response.status === 403 &&
        error?.error_type === ErrorType.REFRESH_TOKEN_EXPIRED
      ) {
        window.history.pushState({}, '', '/login');
      }

      try {
        error = JSON.parse(responseText);
      } catch {
        error = { error_type: "UNKNOWN_ERROR", message: responseText };
      }

      throw new Error(`Помилка мережі: ${response.status} - ${error.message}`);
    }

    return responseText ? JSON.parse(responseText) : ({} as T);
  } catch (error) {
    console.error("Виникла помилка при отриманні даних:", error);
    throw error;
  }
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, "POST", data),
  patch: <T>(url: string, data: any) => request<T>(url, "PATCH", data),
  put: <T>(url: string, data: any) => request<T>(url, "PUT", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
