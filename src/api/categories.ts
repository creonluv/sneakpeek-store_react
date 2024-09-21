import { Item } from "../features/catalog";
import { client } from "../shared/global/utils/fetchClient";

export async function getCategories(): Promise<Item[]> {
  return client.get(`/categories`);
}
