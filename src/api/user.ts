import { client } from "../shared/utils/fetchClient";
import { BaseUser } from "../types/Profile";

export async function editUser(data: BaseUser, id: number) {
  return client.put<BaseUser>(`/users/${id}`, data);
}
