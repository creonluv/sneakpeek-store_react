import { client } from "../shared/utils/fetchClient";
import { Profile, BaseProfile } from "../types/Profile";

export const getMyProfile = async (): Promise<Profile> => {
  return client.get<Profile>(`/users/profiles/my`);
};

export const editMyProfile = async (data: BaseProfile, id: number): Promise<Profile> => {
  return client.put<Profile>(`/users/profiles/${id}`, data);
};
