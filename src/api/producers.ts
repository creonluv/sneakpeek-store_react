import { Item } from "../features/catalog";
import { client } from "../shared/global/utils/fetchClient";

export async function getProducers(): Promise<Item[]> {
  return client.get(`/producers`);
}
