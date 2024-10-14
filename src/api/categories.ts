import { Item } from "../features/catalog";
import { client } from "../shared/utils/fetchClient";
import { CareInstructions } from "../types/CareInstructions";

export async function getCategories(): Promise<Item[]> {
  return client.get(`/categories`);
}
export const getMaterialAndCareOfProduct = (
  id: string
): Promise<CareInstructions> => {
  return client.get(`/categories/materials?category_id=${id}`);
};
