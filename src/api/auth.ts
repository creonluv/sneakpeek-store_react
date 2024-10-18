import { client } from "../shared/utils/fetchClient";

import { AuthData, AuthResponse } from "../types/Auth";

export const register = (data: AuthData): Promise<AuthResponse> => {
  return client.post<AuthResponse>(`/auth/register`, data);
};

export const login = (data: AuthData): Promise<AuthResponse> => {
  return client.post<AuthResponse>(`/auth/login`, data);
};

export const logout = (): Promise<void> => {
  return client.post(`/auth/logout`, null);
};

export const refresh = (): Promise<AuthResponse> => {
  return client.post<AuthResponse>(`/auth/refresh`, null);
};
