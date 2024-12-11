import { client } from "../shared/utils/fetchClient";
import { BaseUser, ChangePasswordRequest } from "../types/Profile";

export async function editUser(data: BaseUser, id: number) {
  return client.put<BaseUser>(`/users/${id}`, data);
}

export async function changePassword(data: ChangePasswordRequest) {
  return client.post<ChangePasswordRequest>(`/users/password/change`, data);
}
