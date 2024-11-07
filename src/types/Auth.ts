export interface AuthData {
  username: string;
  email?: string;
  password: string;
}

export interface AuthResponse {}

export enum ErrorType {
  INVALID_REGISTRATION_DATA = "INVALID_REGISTRATION_DATA",
  INVALID_LOGIN_DATA = "INVALID_LOGIN_DATA",
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
  REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
  NO_REFRESH_TOKEN = "NO_REFRESH_TOKEN",
}
