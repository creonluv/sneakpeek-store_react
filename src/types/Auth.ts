export interface AuthData {
  username: string;
  email?: string;
  password: string;
}

export interface AuthResponse {}

export interface ResetPasswordInitiateData {
  email: string;
}

export interface ResetPasswordValidateOTPData {
  email: string;
  otp: number;
}

export interface ResetPasswordCompleteData {
  email: string;
  otp: number;
  new_password: string;
}

export interface ResetPasswordResponse {
  
}

export enum ErrorType {
  INVALID_REGISTRATION_DATA = "INVALID_REGISTRATION_DATA",
  INVALID_LOGIN_DATA = "INVALID_LOGIN_DATA",
  ACCESS_TOKEN_EXPIRED = "ACCESS_TOKEN_EXPIRED",
  REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
  USER_NOT_AUTHORIZED = "USER_NOT_AUTHORIZED",
}
