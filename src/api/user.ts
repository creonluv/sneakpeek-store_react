import { client } from "../shared/utils/fetchClient";
import { BaseUser, ChangePasswordRequest } from "../types/Profile";
import { ResetPasswordResponse, ResetPasswordInitiateData, ResetPasswordValidateOTPData, ResetPasswordCompleteData } from "../types/Auth";

export async function editUser(data: BaseUser, id: number) {
  return client.put<BaseUser>(`/users/${id}`, data);
}

export async function changePassword(data: ChangePasswordRequest) {
  return client.post<ChangePasswordRequest>("/users/password/change", data);
}

export async function resetPasswordInitiate(data: ResetPasswordInitiateData) {
  return client.post<ResetPasswordResponse>("/users/password/reset/initiate", data);
}

export async function resetPasswordValidateOTP(data: ResetPasswordValidateOTPData) {
  return client.post<ResetPasswordResponse>("/users/password/reset/validate-otp", data);
}

export async function resetPasswordComplete(data: ResetPasswordCompleteData) {
  return client.post<ResetPasswordResponse>("/users/password/reset/complete", data);
}
