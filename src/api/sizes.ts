import { Item } from "../features/catalog";
import { client } from "../shared/utils/fetchClient";

export async function getSizes(): Promise<Item[]> {
  return client.get(`/sizes`);
}
