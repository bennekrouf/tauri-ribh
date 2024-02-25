import { Store } from "tauri-plugin-store-api";
import { Logger } from 'mayo-logger';
import { useVerifiedUser } from "./useVerifiedUser";

export const removeFromStore = async (): Promise<void> => {
  const user = useVerifiedUser();
  try {
    const storageKey = `${user.email}-${user.appId}`;
    Logger.info(`Removing data from store with key: ${storageKey}`, null, { tag: 'removeFromStore' });

    const store = new Store(".settings.json");
    await store.load();

    await store.delete(storageKey);
    await store.save(); // Make sure to save the store after deleting the key
    Logger.info(`Data removed from store with key: ${storageKey}`, null, { tag: 'removeFromStore' });

  } catch (error) {
    Logger.error(`Error removing data from store: ${error}`, error, { tag: 'removeFromStore' });
    throw error;
  }
};
