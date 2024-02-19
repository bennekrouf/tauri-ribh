import { Store } from "tauri-plugin-store-api";
import { getIndicesByName } from "../modals/SourateConfiguration/getIndicesByName";

const store = new Store(".settings.json");

export const getBestIndex = async (selectedSourates: string[], storageKey: string) => {
  await store.load();

  // Use type assertion to tell TypeScript that you expect a string.
  let storedIndexStr = (await store.get(storageKey).catch(() => "2")) as string;

  // Since you now have asserted that storedIndexStr is a string,
  // you can safely use it in operations expecting a string.
  let storedIndexInt = parseInt(storedIndexStr, 10) > 1 ? parseInt(storedIndexStr, 10) : 2;

  const indices = getIndicesByName(selectedSourates);
  const bestIndex = indices.includes(storedIndexInt) ? storedIndexInt : indices[0];

  await store.set(storageKey, bestIndex.toString());
  await store.save();

  return bestIndex;
};
