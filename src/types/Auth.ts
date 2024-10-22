export interface AuthData {
  username: string;
  email?: string;
  password: string;
}

export interface AuthResponse {}

export enum ErrorType {
  INVALID_DATA_REGISTER = "INVALID_DATA_REGISTER",
  INVALID_LOGIN_DATA = "INVALID_LOGIN_DATA",
  JWT_EXPIRED = "JWT_EXPIRED",
}
