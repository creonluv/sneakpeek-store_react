import { Item } from "../features/catalog";
import { client } from "../shared/utils/fetchClient";

export async function getGenders(): Promise<Item[]> {
  return client.get(`/genders`);
}
